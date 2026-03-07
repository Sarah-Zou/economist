/**
 * matchmaker-logic.gs
 * Main routing, scoring, and markdown generation logic.
 */

const SHEET_NAME = "submissions";
const SHEET_COLUMNS = [
  "timestamp",
  "session_id",
  "email",
  "answers_json",
  "result_json",
  "utm_json",
  "user_agent",
  "referrer",
  "report_status",
  "report_id",
  "report_token",
  "report_draft_md",
  "product_url",
  "product_context",
  "report_final_html",
  "report_file_id",
  "report_url",
  "views",
  "last_error",
  "updated_at"
];

function doGet(e) {
  return json_(200, {
    ok: true,
    service: "pricing-model-matchmaker",
    message: "Web app is reachable. Use POST with action=score or action=draft_report."
  });
}

function doPost(e) {
  var payload = null;
  try {
    payload = parsePayload_(e);
    if (!payload) return json_(400, { error: "Invalid or missing JSON body" });
    if (!payload.action) return json_(400, { error: "Missing payload.action" });

    if (payload.action === "score") {
      var result = score_(payload);
      if (!result.need_followups) {
        try { logSubmission_(payload, result); } 
        catch (logErr) { result.debug = result.debug || {}; result.debug.logError = String(logErr); }
      }
      return json_(200, result);
    }

    if (payload.action === "draft_report") {
      if (!payload.email) return json_(400, { ok: false, error: "Missing email" });
      if (!payload.answers) return json_(400, { ok: false, error: "Missing answers" });

      var reportId = Utilities.getUuid();
      var reportToken = Utilities.getUuid();
      var baseUrl = ScriptApp.getService().getUrl();
      var reportUrl = baseUrl + "?rid=" + encodeURIComponent(reportId) + "&t=" + encodeURIComponent(reportToken);

      var reportResult = score_(payload);
      var productContext = (typeof getProductContext_ === "function")
        ? getProductContext_(payload.productUrl)
        : "";
      var reportMarkdown = generateDeterministicReportDraft_(payload, reportResult, productContext);
      if (typeof logReportDraftRequest_ === "function") {
        logReportDraftRequest_(payload, reportResult, reportMarkdown, productContext, reportId, reportToken, reportUrl);
      }
      
      return json_(200, { ok: true, report_url: reportUrl });
    }
    return json_(400, { error: "Unknown action: " + payload.action });
  } catch (err) {
    var errPayload = { error: String(err) };
    if (payload && payload.debug) errPayload.stack = (err && err.stack) ? String(err.stack) : "";
    return json_(500, errPayload);
  }
}

function parsePayload_(e) {
  var raw = (e && e.postData && e.postData.contents) ? String(e.postData.contents) : "";
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (_err) {
    return null;
  }
}

function json_(statusCode, obj) {
  var body = obj || {};
  if (body.status_code === undefined) body.status_code = statusCode;
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

function arrayOrEmpty_(value) {
  return Array.isArray(value) ? value : [];
}

function labelOrSelf_(mapObj, key) {
  if (!key) return "";
  if (!mapObj || typeof mapObj !== "object") return String(key);
  return mapObj[key] || String(key);
}

/**
 * Fallback scorer so this file can run standalone.
 * If your full scorer exists in another file, this local definition keeps web app stable.
 */
function score_(payload) {
  var answers = (payload && payload.answers) ? payload.answers : {};
  var notSureCount = 0;
  Object.keys(answers).forEach(function(k) {
    var v = answers[k];
    if (v === "NS" || v === "NOT_SURE" || v === "Not sure" || v === "not_sure" || v === "") notSureCount += 1;
  });

  var confidenceTier = (notSureCount <= 1) ? "High" : (notSureCount <= 3 ? "Medium" : "Low");
  var productType = answers.Q0 || "";
  var primaryModel = "SUB_TIERED";
  var headlineMetric = "WORKSPACE";

  if (productType === "A") { primaryModel = "USAGE"; headlineMetric = "API_CALLS"; }
  else if (productType === "B") { primaryModel = "SUB_TIERED"; headlineMetric = "WORKSPACE"; }
  else if (productType === "C") { primaryModel = "HYBRID"; headlineMetric = "EVENTS"; }
  else if (productType === "D") { primaryModel = "HYBRID"; headlineMetric = "RUNS"; }

  var wrapper = (payload && payload.wrapper) ? payload.wrapper : "FREE_TRIAL";
  if (["FREEMIUM", "FREE_TRIAL", "NONE"].indexOf(wrapper) === -1) wrapper = "FREE_TRIAL";

  var altModels = ["HYBRID", "USAGE", "SUB_TIERED", "SEAT", "CREDITS", "TXN", "OUTCOME"]
    .filter(function(m) { return m !== primaryModel; })
    .slice(0, 2);

  var whyMap = {
    SUB_TIERED: [
      "Recurring plans are easy to explain and budget.",
      "Tiered packaging lets you launch quickly while refining limits."
    ],
    USAGE: [
      "A usage-aligned model keeps price tied to consumption.",
      "It scales naturally as customer usage grows."
    ],
    HYBRID: [
      "A base fee improves predictability while overages protect margins.",
      "It balances steady revenue with variable usage."
    ],
    SEAT: [
      "Seat pricing is familiar and easy for B2B buyers.",
      "It fits products where value grows with team adoption."
    ],
    CREDITS: [
      "Credits support annual commit workflows for procurement.",
      "Drawdown gives flexibility while keeping spend bounded."
    ],
    TXN: [
      "Per-event pricing matches a concrete value moment.",
      "It is easier to justify with unit economics."
    ],
    OUTCOME: [
      "Outcome pricing aligns incentives around measurable results.",
      "It works best when attribution is clear and fast."
    ]
  };

  var watchMap = {
    SUB_TIERED: ["Flat plans can undercharge heavy users and hurt margin."],
    USAGE: ["Usage pricing can cause bill-shock if guardrails are weak."],
    HYBRID: ["Too many meters make billing hard to understand."],
    SEAT: ["Seat pricing can limit adoption if customers cap access."],
    CREDITS: ["Credits can confuse customers if conversion is unclear."],
    TXN: ["Edge-case counting disputes can erode trust."],
    OUTCOME: ["Attribution disagreements can delay or block payment."]
  };

  return {
    primary_model: primaryModel,
    secondary_model: altModels[0] || null,
    alt_models: altModels,
    metric_candidates: [headlineMetric, "WORKSPACE", "SEATS"].slice(0, 3),
    wrapper: wrapper,
    wrapper_notes: [],
    headline_metric: headlineMetric,
    secondary_meter: null,
    launch_now: primaryModel,
    evolve_later: "Iterate once you have usage + buyer data",
    why_this_fits: whyMap[primaryModel] || whyMap.SUB_TIERED,
    watch_outs: watchMap[primaryModel] || watchMap.SUB_TIERED,
    starter_packaging_suggestion: "Simple tiered plans with a clear limit tied to " + headlineMetric + ". Wrapper: " + wrapper + ".",
    implementation_notes: ["Set one clear limit and show usage in-product.", "Add alerts before overages."],
    measure_next_checklist: (confidenceTier === "High") ? [] : [
      "Track one clean usage counter per account.",
      "Validate who buys and deal-size expectations."
    ],
    confidence_tier: confidenceTier,
    confidence: {
      not_sure_count: notSureCount,
      confidence_score: 0 - notSureCount,
      tier: confidenceTier
    },
    need_followups: false,
    followup_question_ids: []
  };
}

/**
 * REWRITTEN: Deterministic markdown report draft using Template Literals
 */
function generateDeterministicReportDraft_(payload, result, productContext) {
  // Setup Variables
  const confidenceTier = result.confidence?.tier || result.confidence_tier || "Medium";
  const primaryKey = result.primary_model || "SUB_TIERED";
  const MODEL_LABELS_SAFE = (typeof REPORT_MODEL_LABELS_ !== "undefined") ? REPORT_MODEL_LABELS_ : {};
  const WRAPPER_LABELS_SAFE = (typeof REPORT_WRAPPER_LABELS_ !== "undefined") ? REPORT_WRAPPER_LABELS_ : {};
  const METRIC_LABELS_SAFE = (typeof REPORT_METRIC_LABELS_ !== "undefined") ? REPORT_METRIC_LABELS_ : {};
  const MODEL_PLAIN_SAFE = (typeof REPORT_PRIMARY_MODEL_PLAIN_ENGLISH_ !== "undefined") ? REPORT_PRIMARY_MODEL_PLAIN_ENGLISH_ : {};
  const METRIC_DEF_SAFE = (typeof REPORT_METRIC_DEFINITION_ !== "undefined") ? REPORT_METRIC_DEFINITION_ : {};
  const METRIC_WHY_SAFE = (typeof REPORT_METRIC_WHY_ !== "undefined") ? REPORT_METRIC_WHY_ : {};
  const WRAP_REASON_1_SAFE = (typeof REPORT_WRAPPER_REASON_ !== "undefined") ? REPORT_WRAPPER_REASON_ : {};
  const WRAP_REASON_2_SAFE = (typeof REPORT_WRAPPER_REASON_2_ !== "undefined") ? REPORT_WRAPPER_REASON_2_ : {};

  const primary = labelOrSelf_(MODEL_LABELS_SAFE, primaryKey);
  const secondaryKey = result.secondary_model;
  const secondary = secondaryKey ? labelOrSelf_(REPORT_MODEL_LABELS_, secondaryKey) : "";
  const wrapperKey = result.wrapper || "FREE_TRIAL";
  const wrapper = labelOrSelf_(WRAPPER_LABELS_SAFE, wrapperKey);
  const headlineKey = result.headline_metric || "WORKSPACE";
  const headlineMetric = labelOrSelf_(METRIC_LABELS_SAFE, headlineKey);
  const secondaryMeterKey = result.secondary_meter;
  const secondaryMeter = secondaryMeterKey ? labelOrSelf_(METRIC_LABELS_SAFE, secondaryMeterKey) : "";
  
  const launchNow = labelOrSelf_(MODEL_LABELS_SAFE, result.launch_now || primaryKey);
  const evolveLater = result.evolve_later || "Iterate once you have usage + buyer data";

  const why = arrayOrEmpty_(result.why_this_fits).slice(0, 3);
  const watch = arrayOrEmpty_(result.watch_outs).slice(0, 2);
  const impl = arrayOrEmpty_(result.implementation_notes).slice(0, 4);
  const measureNext = arrayOrEmpty_(result.measure_next_checklist).slice(0, 4);
  const wrapperNotes = arrayOrEmpty_(result.wrapper_notes).slice(0, 3);
  
  const primaryPlain = MODEL_PLAIN_SAFE[primaryKey] || "A pricing model that fits your current stage.";
  const metricDef = METRIC_DEF_SAFE[headlineKey] || "The unit you charge for; define it clearly.";
  const metricWhy = METRIC_WHY_SAFE[headlineKey] || "This metric tracks customer value and is easy to explain.";
  const wrapperReason1 = WRAP_REASON_1_SAFE[wrapperKey] || "It fits your go-to-market constraints.";
  const wrapperReason2 = WRAP_REASON_2_SAFE[wrapperKey] || "";
  
  // Format Arrays into Markdown bullet points
  const whyBullets = why.length ? why.map(w => `- ${w}`).join('\n') : "- Tends to fit when pricing can scale naturally.";
  const watchBullets = watch.length ? watch.map(w => `- ${w}`).join('\n') : "- Keep billing explanation simple.";
  const implBullets = impl.length ? impl.map(i => `- ${i}`).join('\n') : "- Add clear limits so bills feel predictable.";
  const wrapperNoteBullets = wrapperNotes.length ? `\nNotes / constraints:\n${wrapperNotes.map(n => `- ${n}`).join('\n')}` : "";
  
  // Return the Markdown String via Template Literal
  return `
# Pricing Model Matchmaker — Your Free Customized Report

This report is generated from your quiz answers and gives you a clear, practical starting point.
If you have any issues or feedback, email **hello@sarahzou.com**.

---

## 0) Executive snapshot

### Your recommended pricing setup
- **Best-fit model:** ${primary}
- **Headline value metric:** ${headlineMetric}
${secondaryMeter ? `- **Optional secondary meter:** ${secondaryMeter}` : ""}
- **Recommended wrapper:** ${wrapper}
- **Confidence:** ${confidenceTier}

### What to do next (3 steps)
1) **Ship a simple v1** using ${launchNow} (details below)
2) **Use the metric definition** in Section 3 so customers understand billing
3) **Add one predictability feature** (alerts / cap / allowance) from Section 5

> **Important boundary:** This report intentionally does **not** set exact starting prices or tier limits. Those depend on buyer willingness-to-pay. If you want that finalized quickly, see Section 8.

---

## 1) What this recommendation means

### Model explanation (what it is)
**${primary}** means:
${primaryPlain}

### Why this fits your situation (why)
${whyBullets}

### Watch-outs to avoid (what to watch)
${watchBullets}

---

## 2) Launch now → evolve later (your realistic path)

### Launch now (the simplest version to ship first)
**${launchNow}**
Why launch here:
- It's easier to explain and sell early.
- It reduces risk while you learn usage patterns.
- It gives you clean signals for iteration.

### Evolve later (once you have usage + buyer data)
**${evolveLater}**
When you should consider evolving:
- After you have 4–6 weeks of usage data **or** 10–20 paid customers.
- When you see one of these triggers: usage doubles, enterprise asks for commit, or expansion revenue becomes predictable.

---

## 3) Your headline value metric

### Metric definition (copy/paste)
You are billed based on **${headlineMetric}**.
**A "${headlineMetric}" means:**
${metricDef}

**Why this metric is a good match:**
${metricWhy}

---

## 4) Starter packaging you can ship

### Recommended starter shape
${result.starter_packaging_suggestion || `Simple tiered plans with a clear limit tied to ${headlineMetric}. Wrapper: ${wrapper}.`}

> Replace placeholders once you validate pricing and tier limits. Start simple.

**Plan 1 — Starter**
- Includes up to **[starter_allowance]** ${headlineMetric} / month
- Overage (if any): **[starter_overage]** per ${headlineMetric}

**Plan 2 — Pro**
- Includes up to **[pro_allowance]** ${headlineMetric} / month
- Overage (if any): **[pro_overage]** per ${headlineMetric}

**Plan 3 — Enterprise**
- Custom terms, invoicing, security, procurement-friendly options.

---

## 5) Wrapper recommendation (how people start)
### Recommended wrapper: **${wrapper}**
Why this wrapper fits:
- ${wrapperReason1}
${wrapperReason2 ? `- ${wrapperReason2}` : ""}${wrapperNoteBullets}

---

## 6) Implementation checklist (practical "do this" items)
Here are the most important implementation actions to avoid early pricing mistakes:
${implBullets}

---

## 7) Next steps (and how we can help)

**If you want to DIY (good path for many founders):**
- Ship the **Launch now** version.
- Revisit in 4–6 weeks with real usage + sales signals.

**If you want this finalized fast (In a 5-day Sprint):**
- Final model + final metric
- Tier limits + upgrade triggers
- Starting price points
- Pricing page copy ready to publish

**Book a free consult:** https://sarahzou.com/book
Questions or feedback? Email **hello@sarahzou.com**.
---
  `.trim();
}

function logSubmission_(payload, result) {
  var sheet = getSubmissionSheet_();
  appendSubmissionRow_(sheet, {
    timestamp: new Date(),
    session_id: payload && payload.sessionId ? payload.sessionId : "",
    email: payload && payload.email ? payload.email : "",
    answers_json: JSON.stringify((payload && payload.answers) || {}),
    result_json: JSON.stringify(result || {}),
    utm_json: JSON.stringify((payload && payload.utm) || {}),
    user_agent: payload && payload.meta && payload.meta.userAgent ? payload.meta.userAgent : "",
    referrer: payload && payload.meta && payload.meta.referrer ? payload.meta.referrer : "",
    report_status: "",
    updated_at: new Date()
  });
}

function logReportDraftRequest_(payload, result, reportMarkdown, productContext, reportId, reportToken, reportUrl) {
  var sheet = getSubmissionSheet_();
  appendSubmissionRow_(sheet, {
    timestamp: new Date(),
    session_id: payload && payload.sessionId ? payload.sessionId : "",
    email: payload && payload.email ? payload.email : "",
    answers_json: JSON.stringify((payload && payload.answers) || {}),
    result_json: JSON.stringify(result || {}),
    utm_json: JSON.stringify((payload && payload.utm) || {}),
    user_agent: payload && payload.meta && payload.meta.userAgent ? payload.meta.userAgent : "",
    referrer: payload && payload.meta && payload.meta.referrer ? payload.meta.referrer : "",
    report_status: "DRAFT_READY",
    report_id: reportId || "",
    report_token: reportToken || "",
    report_draft_md: reportMarkdown || "",
    product_url: payload && payload.productUrl ? payload.productUrl : "",
    product_context: productContext || "",
    report_url: reportUrl || "",
    views: 0,
    updated_at: new Date()
  });
}

function getSubmissionSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  ensureSubmissionHeader_(sheet);
  return sheet;
}

function ensureSubmissionHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_COLUMNS);
    return;
  }
  var currentWidth = sheet.getLastColumn();
  var currentHeader = sheet.getRange(1, 1, 1, currentWidth).getValues()[0];
  if ((currentHeader[0] || "") === SHEET_COLUMNS[0] && currentHeader.length >= SHEET_COLUMNS.length) return;
  // Keep existing data, but normalize/overwrite header row to expected columns.
  if (currentWidth < SHEET_COLUMNS.length) {
    sheet.insertColumnsAfter(currentWidth, SHEET_COLUMNS.length - currentWidth);
  }
  sheet.getRange(1, 1, 1, SHEET_COLUMNS.length).setValues([SHEET_COLUMNS]);
}

function getHeaderMap_(sheet) {
  ensureSubmissionHeader_(sheet);
  var width = Math.max(sheet.getLastColumn(), SHEET_COLUMNS.length);
  if (sheet.getLastColumn() < width) {
    sheet.insertColumnsAfter(sheet.getLastColumn(), width - sheet.getLastColumn());
  }
  var header = sheet.getRange(1, 1, 1, width).getValues()[0];
  var idx = {};
  for (var i = 0; i < width; i++) {
    var key = String(header[i] || "").trim();
    if (key) idx[key] = i + 1;
  }
  // Ensure all expected columns have an index.
  var changed = false;
  SHEET_COLUMNS.forEach(function(col, i) {
    if (!idx[col]) {
      idx[col] = i + 1;
      header[i] = col;
      changed = true;
    }
  });
  if (changed) {
    sheet.getRange(1, 1, 1, width).setValues([header]);
  }
  return { idx: idx, width: width };
}

/**
 * REWRITTEN: Uses ScriptLock to prevent data collision when multiple forms are submitted simultaneously.
 */
function appendSubmissionRow_(sheet, rowObj) {
  var lock = LockService.getScriptLock();
  lock.waitLock(5000); // Wait up to 5 seconds for other requests to finish writing
  
  try {
    var cols = getHeaderMap_(sheet);
    var width = cols.width;
    var row = new Array(width);
    for (var i = 0; i < width; i++) row[i] = "";
    
    (SHEET_COLUMNS || []).forEach(function(colName) {
      var c = cols.idx[colName];
      if (!c) return;
      var val = rowObj[colName];
      row[c - 1] = (val !== undefined ? val : "");
    });
    
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

/**
 * REWRITTEN: Lock implemented for View Counts using ScriptLock instead of DocumentLock for consistency.
 */
function incrementReportViews_(sheet, rowIndex) {
  if (rowIndex < 2) return;

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(2000)) return;
  
  try {
    var cols = getHeaderMap_(sheet);
    var col = cols.idx.views;
    if (!col) return;
    var cell = sheet.getRange(rowIndex, col);
    var n = parseInt(cell.getValue(), 10);
    if (isNaN(n)) n = 0;
    cell.setValue(n + 1);
  } finally {
    lock.releaseLock();
  }
}

// ... (Keep getSubmissionSheet_, updateSubmissionRow_, logReportDraftRequest_, getProductContext_, logReportView_, storeHtmlToDriveIfTooLarge_, normalizeAndValidateHttpUrl_, etc. exactly as they were)