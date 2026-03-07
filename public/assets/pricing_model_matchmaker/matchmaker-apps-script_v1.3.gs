/**
 * Pricing Model Matchmaker — Apps Script (revised)
 * - Accepts POST text/plain body containing JSON
 * - Returns recommendation (snake_case keys for compatibility)
 * - Optionally logs to a Google Sheet tab: "submissions"
 */

const SHEET_NAME = "submissions";

const REPORT_VIEWS_SHEET_NAME = "report_views";
const REPORTS_FOLDER_NAME = "PMM Reports (generated)";
const MAX_SHEET_CELL_CHARS = 45000; // keep under Google Sheets ~50k per cell
const MAX_PRODUCT_CONTEXT_CHARS = 5000;
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

const MODELS = ["SUB_TIERED", "SEAT", "USAGE", "HYBRID", "CREDITS", "TXN", "OUTCOME"];
const METRICS = [
  "SEATS", "ACTIVE_SEATS", "WORKSPACE",
  "API_CALLS", "TOKENS", "COMPUTE", "AGENT_ACTIONS",
  "EVENTS", "RECORDS", "STORAGE_GB", "QUERIES",
  "RUNS", "DOCS", "TASKS_TICKETS",
  "TXN_UNITS", "TAKE_RATE",
  "OUTCOME_$", "OUTCOME_TIME"
];

/**
 * Full-page HTML template for the hosted report. Article content from report_final_html is injected into {{ARTICLE_HTML}}.
 */
var REPORT_PAGE_TEMPLATE_ = [
  "<!doctype html>",
  "<html>",
  "<head>",
  "  <meta charset=\"utf-8\" />",
  "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />",
  "  <meta name=\"robots\" content=\"noindex,nofollow\" />",
  "  <title>Your Pricing Model Matchmaker report</title>",
  "  <style>",
  "    :root{",
  "      --bg:#f9f6f7; --card:#fff; --text:#1f2933; --muted:#546271;",
  "      --border:#e6e3e6; --accent:#ff5722;",
  "    }",
  "    body{margin:0;background:var(--bg);color:var(--text);",
  "      font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;",
  "      line-height:1.65;font-size:16px;}",
  "    .page{max-width:820px;margin:32px auto;padding:0 18px 48px;}",
  "    .card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px 22px;margin-top:18px;}",
  "    .hero{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:22px;margin-top:0;}",
  "    h1{margin:0 0 10px;font-size:28px;line-height:1.25;}",
  "    h2{margin:0 0 12px;font-size:18px;}",
  "    p{margin:10px 0;}",
  "    ul,ol{margin:10px 0;padding-left:18px;}",
  "    a{color:var(--accent);text-decoration:none;} a:hover{text-decoration:underline;}",
  "    .muted{color:var(--muted);font-size:14px;}",
  "    .cta{border-left:4px solid var(--accent);background:rgba(255,87,34,.06);}",
  "    @page { margin: 0.75in; }",
  "    @media print{",
  "      body{background:#fff;}",
  "      .page{max-width:none;margin:0;padding:0;}",
  "      .no-print{display:none !important;}",
  "      .card,.hero{break-inside:avoid; page-break-inside:avoid;}",
  "      h2,h3{break-after:avoid; page-break-after:avoid;}",
  "      a{color:#000;text-decoration:underline;}",
  "    }",
  "  </style>",
  "</head>",
  "<body>",
  "  <div class=\"page\">",
  "    {{ARTICLE_HTML}}",
  "  </div>",
  "</body>",
  "</html>"
].join("\n");

/**
 * Serves the report page when rid and t (token) are present.
 * If report_final_html exists → show it; else → "Report is being generated, check back soon".
 */
function doGet(e) {
  ensurePolishedReportTrigger_();

  try {
    processPolishedReports_();
  } catch (mailErr) {
    // Non-blocking: do not fail page serving if mail processing fails.
  }

  var rid = (e && e.parameter && e.parameter.rid) ? String(e.parameter.rid).trim() : "";
  var t = (e && e.parameter && e.parameter.t) ? String(e.parameter.t).trim() : "";
  if (!rid || !t) {
    return HtmlService.createHtmlOutput(
      "<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='robots' content='noindex,nofollow'><title>Report</title></head><body><p>Missing report ID or token.</p></body></html>"
    ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  var sheet = getSubmissionSheet_();
  var cols = getHeaderMap_(sheet);
  var rowIndex = findRowByReportId_(sheet, rid);
  if (rowIndex <= 0) {
    return HtmlService.createHtmlOutput(
      "<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='robots' content='noindex,nofollow'><title>Report not found</title></head><body><p>Report not found.</p></body></html>"
    ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  var tokenCol = cols.idx.report_token;
  var storedToken = tokenCol ? sheet.getRange(rowIndex, tokenCol).getValue() : "";
  if (String(storedToken || "").trim() !== t) {
    return HtmlService.createHtmlOutput(
      "<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='robots' content='noindex,nofollow'><title>Invalid link</title></head><body><p>Invalid or expired report link.</p></body></html>"
    ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  // Track views (safe under concurrency)
  incrementReportViews_(sheet, rowIndex);
  logReportView_(rid, t);

  var statusCol = cols.idx.report_status;
  var status = statusCol ? String(sheet.getRange(rowIndex, statusCol).getValue() || "").trim() : "";

  var htmlStr = "";
  var htmlCol = cols.idx.report_final_html;
  if (htmlCol) htmlStr = String(sheet.getRange(rowIndex, htmlCol).getValue() || "").trim();

  // If the HTML is stored in Drive (for >50k reports), load it.
  if (!htmlStr) {
    var fileCol = cols.idx.report_file_id;
    var fileId = fileCol ? String(sheet.getRange(rowIndex, fileCol).getValue() || "").trim() : "";
    if (fileId) htmlStr = String(loadHtmlFromDrive_(fileId) || "").trim();
  }

  var hostReady = (status === "POLISHED" || status === "SENT");
  if (hostReady && htmlStr) {
    htmlStr = prepareReportHtmlForServing_(htmlStr);
    return HtmlService.createHtmlOutput(htmlStr).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  var pendingHtml = [
    "<!DOCTYPE html>",
    "<html><head><meta charset='utf-8'><meta name='robots' content='noindex,nofollow'><meta name='viewport' content='width=device-width,initial-scale=1'>",
    "<title>Report in progress</title>",
    "<style>body{font-family:system-ui,sans-serif;max-width:36em;margin:2em auto;padding:0 1em;}</style>",
    "</head><body>",
    "<h1>Report is being generated</h1>",
    "<p>Check back soon. We'll email you when it's ready, or refresh this page later.</p>",
    "</body></html>"
  ].join("");
  return HtmlService.createHtmlOutput(pendingHtml).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  ensurePolishedReportTrigger_();

  try {
    processPolishedReports_();
  } catch (mailErr) {
    // Non-blocking: do not fail API requests if mail processing fails.
  }

  var payload = parsePayload_(e);

  if (!payload) {
    return json_(400, { error: "Invalid or missing JSON body" });
  }
  if (!payload.action) {
    return json_(400, { error: "Missing payload.action" });
  }

  try {
    if (payload.action === "score") {
      var result = score_(payload);

      // Log to sheet only when returning final recommendation (not when asking for follow-up answers)
      if (!result.need_followups) {
        try {
          logSubmission_(payload, result);
        } catch (logErr) {
          result.debug = result.debug || {};
          result.debug.logError = String(logErr);
        }
      }

      return json_(200, result);
    }

    if (payload.action === "draft_report") {
      if (!payload.email) {
        return json_(400, { ok: false, error: "Missing email" });
      }
      if (!payload.answers) {
        return json_(400, { ok: false, error: "Missing answers" });
      }

      var reportId = Utilities.getUuid();
      var reportToken = Utilities.getUuid();
      var baseUrl = ScriptApp.getService().getUrl();
      var reportUrl = baseUrl + "?rid=" + encodeURIComponent(reportId) + "&t=" + encodeURIComponent(reportToken);

      var reportResult = score_(payload);
      var rawProductUrl = getPayloadProductUrl_(payload);
      var productContext = getProductContext_(rawProductUrl);
      var reportMarkdown = generateDeterministicReportDraft_(payload, reportResult, productContext);
      logReportDraftRequest_(payload, reportResult, reportMarkdown, productContext, reportId, reportToken, reportUrl);
      return json_(200, { ok: true, report_url: reportUrl });
    }

    return json_(400, { error: "Unknown action: " + payload.action });
  } catch (err) {
    if (payload && payload.action === "draft_report") {
      try {
        logReportDraftError_(payload, String(err));
      } catch (ignoreLogErr) {
        // do not mask original error payload
      }
    }
    var errPayload = { error: String(err) };
    if (payload && payload.debug) {
      errPayload.stack = (err && err.stack) ? String(err.stack) : "";
    }
    return json_(500, errPayload);
  }
}

function parsePayload_(e) {
  var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : "";
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function json_(statusCode, obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function score_(payload) {
  var answers = payload.answers || {};
  var modelScore = initMap_(MODELS, 0);
  var metricScore = initMap_(METRICS, 0);

  var notSureCount = computeNotSureCount_(answers);
  var confidenceScore = 0 - notSureCount;
  var confidenceTier =
    confidenceScore >= -1 ? "High" :
    confidenceScore >= -3 ? "Medium" : "Low";

  applyBaseScoring_(answers, modelScore, metricScore);
  applyConditionalScoring_(answers, modelScore);
  applyPathScoring_(answers, modelScore, metricScore);

  var wrapperObj = selectWrapper_(answers, notSureCount, payload.wrapper);

  // Draft model selection for sanity checks (which may mutate modelScore)
  var selectModelResult = selectModels_(answers, modelScore, confidenceTier);
  var primaryModel = selectModelResult.primaryModel;
  var secondaryModel = selectModelResult.secondaryModel;
  var rankedModels = selectModelResult.rankedModels;

  var notes = [];
  applySanityChecks_(answers, {
    modelScore: modelScore,
    metricScore: metricScore,
    primaryModel: primaryModel,
    secondaryModel: secondaryModel,
    headlineMetric: null,
    confidenceTier: confidenceTier,
    notes: notes
  });

  // Final model selection after sanity checks; then metrics once
  selectModelResult = selectModels_(answers, modelScore, confidenceTier);
  primaryModel = selectModelResult.primaryModel;
  secondaryModel = selectModelResult.secondaryModel;
  rankedModels = selectModelResult.rankedModels;

  var selectMetricResult = selectMetrics_(answers, primaryModel, secondaryModel, metricScore);
  var headlineMetric = selectMetricResult.headlineMetric;
  var secondaryMeter = selectMetricResult.secondaryMeter;
  var rankedMetrics = selectMetricResult.rankedMetrics;

  // Deterministic alternatives + metric candidates for normal response
  var altModels = (rankedModels || [])
    .map(function(x) { return x.key; })
    .filter(function(k) { return k && k !== primaryModel; })
    .slice(0, 2);

  var metricCandidates = (rankedMetrics || [])
    .map(function(x) { return x.key; })
    .filter(function(k) { return k; })
    .slice(0, 3);

  var launchEvolve = selectLaunchEvolve_(answers, confidenceTier, rankedModels);

  var whyThisFits = WHY_FITS_[primaryModel] ? WHY_FITS_[primaryModel].slice(0, 3) : [];
  var watchOuts = WATCH_OUTS_[primaryModel] ? WATCH_OUTS_[primaryModel].slice(0, 2) : [];

  var implementationNotes = buildImplementationNotes_(answers, primaryModel, secondaryModel, headlineMetric, notes, wrapperObj);
  var starterPackagingSuggestion = buildStarterPackagingSuggestion_(primaryModel, secondaryModel, headlineMetric, secondaryMeter, wrapperObj);

  var measureNextChecklist =
    (confidenceTier === "Medium" || confidenceTier === "Low")
      ? MEASURE_NEXT_.slice(0, 4)
      : [];

  var needFollowups = computeNeedFollowups_(answers, confidenceTier, rankedModels);

  var result = {
    primary_model: primaryModel,
    secondary_model: secondaryModel || null,
    alt_models: altModels,
    metric_candidates: metricCandidates,

    wrapper: wrapperObj.wrapper,
    wrapper_notes: wrapperObj.notes,
    headline_metric: headlineMetric,
    secondary_meter: secondaryMeter || null,
    launch_now: launchEvolve.launch_now,
    evolve_later: launchEvolve.evolve_later,
    why_this_fits: whyThisFits,
    watch_outs: watchOuts,
    starter_packaging_suggestion: starterPackagingSuggestion,
    implementation_notes: implementationNotes,
    measure_next_checklist: measureNextChecklist,
    confidence_tier: confidenceTier,
    confidence: {
      not_sure_count: notSureCount,
      confidence_score: confidenceScore,
      tier: confidenceTier
    },
    need_followups: needFollowups.length > 0,
    followup_question_ids: needFollowups
  };

  if (payload.debug === true) {
    result.debug = {
      model_score: modelScore,
      metric_score: metricScore,
      ranked_models: rankedModels,
      ranked_metrics: rankedMetrics
    };
  }

  return result;
}

function initMap_(keys, initialValue) {
  var m = {};
  keys.forEach(function(k) { m[k] = initialValue; });
  return m;
}

function add_(map, key, delta) {
  if (delta === 0 || delta === null || delta === undefined) return;
  if (map[key] === undefined) map[key] = 0;
  map[key] += delta;
}

function computeNotSureCount_(answers) {
  var NS = ["NS", "NOT_SURE", "Not sure", "not_sure", ""];
  var count = 0;
  Object.keys(answers || {}).forEach(function(q) {
    var v = answers[q];
    if (v === null || v === undefined) return;
    if (NS.indexOf(String(v)) !== -1) count += 1;
  });
  return count;
}

function applyBaseScoring_(answers, modelScore, metricScore) {
  var P0 = answers.P0;
  if (P0 === "A") { add_(modelScore,"SUB_TIERED",2); add_(modelScore,"USAGE",1); add_(modelScore,"HYBRID",1); add_(modelScore,"OUTCOME",-4); add_(modelScore,"CREDITS",-1); }
  else if (P0 === "B") { add_(modelScore,"SUB_TIERED",1); add_(modelScore,"HYBRID",1); }
  else if (P0 === "C") { add_(modelScore,"HYBRID",1); add_(modelScore,"CREDITS",1); add_(modelScore,"SUB_TIERED",1); }
  else if (P0 === "D") { add_(modelScore,"CREDITS",2); add_(modelScore,"HYBRID",1); add_(modelScore,"SUB_TIERED",1); }

  var P1 = answers.P1;
  if (P1 === "A") { add_(modelScore,"SUB_TIERED",2); add_(modelScore,"USAGE",1); add_(modelScore,"CREDITS",-2); add_(modelScore,"SEAT",-1); }
  else if (P1 === "B") { add_(modelScore,"USAGE",2); add_(modelScore,"SUB_TIERED",1); add_(modelScore,"SEAT",1); }
  else if (P1 === "C") { add_(modelScore,"SUB_TIERED",2); add_(modelScore,"HYBRID",1); }
  else if (P1 === "D") { add_(modelScore,"CREDITS",3); add_(modelScore,"HYBRID",2); add_(modelScore,"SUB_TIERED",1); }
  else if (P1 === "E") { add_(modelScore,"HYBRID",1); }

  var P4 = answers.P4;
  if (P4 === "A") { add_(modelScore,"HYBRID",4); add_(modelScore,"USAGE",3); add_(modelScore,"CREDITS",2); add_(modelScore,"SUB_TIERED",-1); }
  else if (P4 === "B") { add_(modelScore,"HYBRID",3); add_(modelScore,"USAGE",2); }
  else if (P4 === "C") { add_(modelScore,"SUB_TIERED",2); add_(modelScore,"SEAT",1); }
  else if (P4 === "D") { add_(modelScore,"HYBRID",2); }

  var Q0 = answers.Q0;
  if (Q0 === "A") { add_(modelScore,"USAGE",1); add_(modelScore,"HYBRID",1); }
  else if (Q0 === "B") { add_(modelScore,"SUB_TIERED",1); add_(modelScore,"SEAT",1); }
  else if (Q0 === "C") { add_(modelScore,"HYBRID",1); add_(modelScore,"CREDITS",1); }
  else if (Q0 === "D") { add_(modelScore,"HYBRID",1); add_(modelScore,"TXN",1); }

  var P3 = answers.P3;
  if (P3 === "C") { add_(modelScore,"SUB_TIERED",1); add_(modelScore,"HYBRID",1); add_(modelScore,"CREDITS",1); }

  var P5 = answers.P5;
  if (P5 === "A") { add_(modelScore,"SEAT",3); add_(metricScore,"SEATS",2); add_(metricScore,"ACTIVE_SEATS",1); }
  else if (P5 === "B") { add_(modelScore,"USAGE",3); add_(modelScore,"HYBRID",2); add_(metricScore,"API_CALLS",1); add_(metricScore,"TOKENS",1); add_(metricScore,"EVENTS",1); add_(metricScore,"RUNS",1); }
  else if (P5 === "C") { add_(modelScore,"SUB_TIERED",2); add_(metricScore,"WORKSPACE",2); }
  else if (P5 === "D") { add_(modelScore,"OUTCOME",2); add_(modelScore,"HYBRID",2); add_(metricScore,"OUTCOME_$",1); add_(metricScore,"OUTCOME_TIME",1); }
  else if (P5 === "E") { add_(modelScore,"HYBRID",1); }

  var P6 = answers.P6;
  if (P6 === "A") { add_(modelScore,"USAGE",1); add_(modelScore,"HYBRID",1); }
  else if (P6 === "B") { add_(modelScore,"HYBRID",1); }
  else if (P6 === "C") { add_(modelScore,"SUB_TIERED",3); add_(modelScore,"SEAT",1); }
  else if (P6 === "D") { add_(modelScore,"SUB_TIERED",1); add_(modelScore,"HYBRID",1); }
}

function applyConditionalScoring_(answers, modelScore) {
  var P7 = answers.P7;
  if (P7 === "SEATS") add_(modelScore,"SEAT",1);
  if (P7 === "TIERS") add_(modelScore,"SUB_TIERED",1);
  if (P7 === "USAGE") add_(modelScore,"USAGE",1);
  if (P7 === "CREDITS") add_(modelScore,"CREDITS",1);
  if (P7 === "TXN") add_(modelScore,"TXN",1);

  var F3 = answers.F3;
  if (F3 === "A") { add_(modelScore,"CREDITS",2); add_(modelScore,"HYBRID",1); }
  else if (F3 === "B") { add_(modelScore,"HYBRID",1); }
  else if (F3 === "C") { add_(modelScore,"USAGE",1); add_(modelScore,"SUB_TIERED",1); }
  else if (F3 === "D") { add_(modelScore,"HYBRID",1); }

  var F4 = answers.F4;
  if (F4 === "A") { add_(modelScore,"HYBRID",2); add_(modelScore,"CREDITS",1); }
  else if (F4 === "B") { add_(modelScore,"USAGE",2); add_(modelScore,"HYBRID",2); }
  else if (F4 === "C") { add_(modelScore,"SUB_TIERED",2); }
  else if (F4 === "D") { add_(modelScore,"HYBRID",1); }
}

function applyPathScoring_(answers, modelScore, metricScore) {
  var Q0 = answers.Q0;

  if (Q0 === "A") {
    var A1 = answers.A1;
    if (A1 === "A") add_(modelScore,"USAGE",2);
    else if (A1 === "B") add_(modelScore,"HYBRID",2);
    else if (A1 === "C") { add_(modelScore,"CREDITS",2); add_(modelScore,"HYBRID",2); }
    else if (A1 === "D") add_(modelScore,"HYBRID",1);

    var A2 = answers.A2;
    if (A2 === "API_CALLS") add_(metricScore,"API_CALLS",5);
    else if (A2 === "TOKENS") add_(metricScore,"TOKENS",5);
    else if (A2 === "COMPUTE") add_(metricScore,"COMPUTE",5);
    else if (A2 === "EVENTS") add_(metricScore,"EVENTS",5);
    else if (!A2 || A2 === "NS") { add_(metricScore,"API_CALLS",2); add_(metricScore,"EVENTS",2); }

    var A3 = answers.A3;
    if (A3 === "A") { add_(modelScore,"HYBRID",2); add_(modelScore,"SUB_TIERED",1); }
    else if (A3 === "B") add_(modelScore,"USAGE",2);
    else if (A3 === "C") { add_(modelScore,"CREDITS",3); add_(modelScore,"HYBRID",1); }
    else if (A3 === "D") add_(modelScore,"HYBRID",1);
  }

  if (Q0 === "B") {
    var B1 = answers.B1;
    if (B1 === "YES") add_(modelScore,"SEAT",4);
    else if (B1 === "SOMETIMES") { add_(modelScore,"SEAT",2); add_(modelScore,"SUB_TIERED",2); }
    else if (B1 === "NO") add_(modelScore,"SUB_TIERED",3);
    else if (B1 === "NS") { add_(modelScore,"SUB_TIERED",1); add_(modelScore,"SEAT",1); }

    var B2 = answers.B2;
    if (B2 === "YES") add_(modelScore,"SEAT",3);
    else if (B2 === "SOMEWHAT") { add_(modelScore,"SUB_TIERED",2); add_(modelScore,"SEAT",1); }
    else if (B2 === "NO") { add_(modelScore,"SUB_TIERED",2); add_(modelScore,"HYBRID",1); }
    else if (B2 === "NS") add_(modelScore,"SUB_TIERED",1);

    var B5 = answers.B5;
    if (B5 === "SEATS") add_(metricScore,"SEATS",5);
    else if (B5 === "ACTIVE_SEATS") add_(metricScore,"ACTIVE_SEATS",5);
    else if (B5 === "WORKSPACE") add_(metricScore,"WORKSPACE",5);
    else if (!B5 || B5 === "NS") { add_(metricScore,"WORKSPACE",4); add_(metricScore,"SEATS",1); }
  }

  if (Q0 === "C") {
    var C1 = answers.C1;
    if (C1 === "INGEST") add_(metricScore,"EVENTS",5);
    else if (C1 === "STORE") add_(metricScore,"STORAGE_GB",5);
    else if (C1 === "QUERY") { add_(metricScore,"QUERIES",5); add_(metricScore,"COMPUTE",2); }
    else { add_(metricScore,"EVENTS",2); add_(metricScore,"STORAGE_GB",2); add_(metricScore,"QUERIES",2); }

    var C2 = answers.C2;
    if (C2 === "STORAGE") { add_(modelScore,"HYBRID",3); add_(modelScore,"USAGE",2); }
    else if (C2 === "COMPUTE") { add_(modelScore,"HYBRID",3); add_(modelScore,"USAGE",2); }
    else if (C2 === "BOTH") { add_(modelScore,"HYBRID",4); add_(modelScore,"CREDITS",2); }
    else if (C2 === "FIXED") add_(modelScore,"SUB_TIERED",2);
    else if (C2 === "NS") add_(modelScore,"HYBRID",2);

    var C4 = answers.C4;
    if (C4 === "EVENTS") add_(metricScore,"EVENTS",5);
    else if (C4 === "STORAGE_GB") add_(metricScore,"STORAGE_GB",5);
    else if (C4 === "QUERIES") add_(metricScore,"QUERIES",5);
    else { add_(metricScore,"EVENTS",2); add_(metricScore,"QUERIES",2); }
  }

  if (Q0 === "D") {
    var D1 = answers.D1;
    if (D1 === "RUNS") add_(metricScore,"RUNS",5);
    else if (D1 === "DOCS") add_(metricScore,"DOCS",5);
    else if (D1 === "TASKS_TICKETS") add_(metricScore,"TASKS_TICKETS",5);
    else { add_(metricScore,"RUNS",2); add_(metricScore,"DOCS",2); }

    var D2 = answers.D2;
    if (D2 === "YES") { add_(modelScore,"SEAT",-3); add_(modelScore,"HYBRID",3); add_(modelScore,"TXN",2); add_(modelScore,"USAGE",2); }
    else if (D2 === "SOMETIMES") { add_(modelScore,"SEAT",-1); add_(modelScore,"HYBRID",2); }
    else if (D2 === "NO") add_(modelScore,"SEAT",1);
    else add_(modelScore,"HYBRID",1);

    var D3 = answers.D3;
    if (D3 === "YES") add_(modelScore,"OUTCOME",5);
    else if (D3 === "PARTLY") { add_(modelScore,"OUTCOME",2); add_(modelScore,"HYBRID",2); }
    else if (D3 === "NO") { add_(modelScore,"TXN",3); add_(modelScore,"HYBRID",2); }
    else add_(modelScore,"HYBRID",2);

    var D3b = answers.D3b;
    if (D3b === "WEEKS") add_(modelScore,"OUTCOME",2);
    else if (D3b === "MONTHS") { add_(modelScore,"OUTCOME",-4); add_(modelScore,"HYBRID",1); }
    else { add_(modelScore,"OUTCOME",-2); add_(modelScore,"HYBRID",1); }
  }
}

/**
 * Wrapper: use payload.wrapper when provided by frontend; else infer from W1, W2, P3, P4 (no F1).
 */
function selectWrapper_(answers, notSureCount, payloadWrapper) {
  var notes = [];
  var validWrappers = ["FREEMIUM", "FREE_TRIAL", "NONE"];
  if (payloadWrapper && validWrappers.indexOf(payloadWrapper) !== -1) {
    var w = payloadWrapper;
    if (answers.P4 === "A" && w === "FREEMIUM") {
      w = "FREE_TRIAL";
      notes.push("Freemium can be risky with high variable costs; defaulting to a free trial unless you add strict caps/credits/hard stops.");
    }
    return { wrapper: w, notes: notes };
  }

  var P3 = answers.P3;
  var P4 = answers.P4;
  var W1 = answers.W1;
  var W2 = answers.W2;

  if (notSureCount >= 4 && P3 !== "C") {
    return { wrapper: "FREE_TRIAL", notes: notes };
  }
  if (P3 === "C") {
    return { wrapper: "NONE", notes: notes };
  }
  if (W1 === "C") {
    return { wrapper: "FREE_TRIAL", notes: notes };
  }

  var freemiumEligible = (P3 === "A" && (W1 === "A" || W1 === "B") && W2 === "A");
  if (freemiumEligible) {
    if (P4 === "A" && W1 !== "B") {
      notes.push("High variable cost requires strict freemium caps; wrapper is downgraded to Free trial unless caps are very tight.");
      return { wrapper: "FREE_TRIAL", notes: notes };
    }
    return { wrapper: "FREEMIUM", notes: notes };
  }

  return { wrapper: "FREE_TRIAL", notes: notes };
}

function selectModels_(answers, modelScore, confidenceTier) {
  if (!(answers.D3 === "YES" && answers.D3b === "WEEKS")) {
    modelScore.OUTCOME -= 999;
  }

  var ranked = rankMap_(modelScore);
  var primary = ranked[0].key;
  var runner = ranked[1] ? ranked[1].key : null;

  if (answers.P4 === "A" && primary === "SUB_TIERED") {
    var hybridScore = modelScore.HYBRID;
    var primaryScore = modelScore.SUB_TIERED;
    if (primaryScore - hybridScore <= 2) {
      primary = "HYBRID";
      ranked = rankMap_(modelScore);
      runner = ranked[1] ? ranked[1].key : null;
    }
  }

  if (answers.D2 === "YES" && primary === "SEAT") {
    modelScore.SEAT -= 3;
    ranked = rankMap_(modelScore);
    primary = ranked[0].key;
    runner = ranked[1] ? ranked[1].key : null;
  }

  var secondary = null;
  if (runner) {
    var gap = ranked[0].val - ranked[1].val;
    var complement = isComplementPair_(primary, runner);
    if (gap <= 2 || complement) secondary = runner;
  }

  if (confidenceTier === "Low" && primary === "OUTCOME") {
    modelScore.OUTCOME -= 10;
    ranked = rankMap_(modelScore);
    primary = ranked[0].key;
    runner = ranked[1] ? ranked[1].key : null;
    secondary = runner;
  }

  return { primaryModel: primary, secondaryModel: secondary, rankedModels: ranked };
}

function isComplementPair_(a, b) {
  var pairs = ["USAGE|HYBRID", "HYBRID|USAGE", "HYBRID|CREDITS", "CREDITS|HYBRID", "TXN|HYBRID", "HYBRID|TXN"];
  return pairs.indexOf(a + "|" + b) !== -1;
}

function rankMap_(m) {
  return Object.keys(m)
    .map(function(k) { return { key: k, val: m[k] }; })
    .sort(function(x, y) { return y.val - x.val; });
}

function selectMetrics_(answers, primaryModel, secondaryModel, metricScore) {
  var allowed = new Set(METRICS);
  if (primaryModel === "SEAT") keepOnly_(allowed, ["SEATS","ACTIVE_SEATS","WORKSPACE"]);
  if (primaryModel === "SUB_TIERED") keepOnly_(allowed, ["WORKSPACE","SEATS"]);
  if (primaryModel === "TXN") keepOnly_(allowed, ["TXN_UNITS","TAKE_RATE"]);
  if (primaryModel === "OUTCOME") keepOnly_(allowed, ["OUTCOME_$","OUTCOME_TIME"]);

  var ranked = rankMap_(filterMap_(metricScore, allowed));
  var headline = ranked[0] ? ranked[0].key : null;

  var secondary = null;
  if ((primaryModel === "HYBRID" || primaryModel === "CREDITS") && ranked.length >= 2) {
    var gap = ranked[0].val - ranked[1].val;
    if (gap <= 2) secondary = ranked[1].key;
  }

  if (primaryModel === "OUTCOME") {
    var ok = (answers.D3 === "YES" && answers.D3b === "WEEKS");
    if (!ok) {
      return { headlineMetric: "OUTCOME_$", secondaryMeter: null, rankedMetrics: ranked };
    }
  }

  return { headlineMetric: headline || "WORKSPACE", secondaryMeter: secondary, rankedMetrics: ranked };
}

function keepOnly_(set, allowList) {
  var allowed = new Set(allowList);
  Array.from(set).forEach(function(x) { if (!allowed.has(x)) set.delete(x); });
}

function filterMap_(m, allowedSet) {
  var out = {};
  Object.keys(m).forEach(function(k) { if (allowedSet.has(k)) out[k] = m[k]; });
  return out;
}

function applySanityChecks_(answers, ctx) {
  var predictabilityWeak =
    (answers.A1 === "B" || answers.A1 === "C" || answers.A1 === "D") ||
    (answers.F4 === "A");

  if (predictabilityWeak) {
    ctx.notes.push("Add alerts + a cap option + an included allowance/bundle to prevent bill shock.");
    if (ctx.primaryModel === "USAGE") {
      var gap = ctx.modelScore.USAGE - ctx.modelScore.HYBRID;
      if (gap <= 1) ctx.modelScore.HYBRID += 1;
    }
  }

  var measurableWeak = (answers.P6 === "C" || answers.P6 === "D");
  if (measurableWeak) {
    ctx.modelScore.TXN -= 1;
    ctx.modelScore.OUTCOME -= 3;
  }
}

function selectLaunchEvolve_(answers, confidenceTier, rankedModels) {
  var P0 = answers.P0;
  var primary = rankedModels[0] ? rankedModels[0].key : "SUB_TIERED";
  var second = rankedModels[1] ? rankedModels[1].key : null;

  var launchNow = primary;
  var evolveLater = evolvePath_(primary);

  if (P0 === "A" || confidenceTier === "Low") {
    var top2 = [primary, second].filter(Boolean);
    launchNow = pickSimplest_(top2, answers);
    evolveLater = evolvePath_(launchNow);
  }

  return { launch_now: launchNow, evolve_later: evolveLater };
}

function pickSimplest_(models, answers) {
  if (answers.P0 === "A" && answers.P4 !== "A") {
    if (models.indexOf("SUB_TIERED") !== -1) return "SUB_TIERED";
  }
  var preference = ["SUB_TIERED", "USAGE", "HYBRID", "SEAT", "CREDITS", "TXN", "OUTCOME"];
  for (var i = 0; i < preference.length; i++) {
    if (models.indexOf(preference[i]) !== -1) return preference[i];
  }
  return models[0] || "SUB_TIERED";
}

function evolvePath_(model) {
  if (model === "USAGE") return "HYBRID → CREDITS";
  if (model === "HYBRID") return "CREDITS (annual commit/true-up)";
  if (model === "SEAT") return "ACTIVE_SEATS or WORKSPACE (if seat tax risk)";
  if (model === "TXN") return "OUTCOME (only if verifiable + within weeks)";
  if (model === "SUB_TIERED") return "HYBRID (add overages/allowances when costs/usage demand it)";
  return "Iterate once you have usage + buyer data";
}

var WHY_FITS_ = {
  "USAGE": ["Aligns price to consumption; easy entry and expansion with customer growth."],
  "HYBRID": ["Budgetable while protecting margins; best when there's baseline platform value + variable usage/cost."],
  "CREDITS": ["Procurement-friendly annual commits with flexible consumption; reduces bill shock."],
  "SEAT": ["Natural when access/identity/permissions drive value and collaboration is core."],
  "SUB_TIERED": ["Best when you can fence features/limits across segments and create clear upgrade paths."],
  "TXN": ["Best when discrete business events map to value and are easy to count."],
  "OUTCOME": ["Best when KPI is verifiable, attributable, controllable, and fast enough to measure."]
};

var WATCH_OUTS_ = {
  "USAGE": ["Bill shock; forecasting; requires instrumentation."],
  "HYBRID": ["Complexity creep; pick one primary growth lever and keep the meter simple."],
  "CREDITS": ["Credit-to-unit confusion; needs clear drawdown + true-up."],
  "SEAT": ["Can discourage invites; breaks for automation that reduces headcount."],
  "SUB_TIERED": ["Leakage across tiers; needs enforceable fences and honest plan differences."],
  "TXN": ["Unit value variance; may need tiers/minimums."],
  "OUTCOME": ["Disputes; long time-to-outcome; volatile results."]
};

var MEASURE_NEXT_ = [
  "Track one clean usage counter (calls/events/runs/docs) and show it in-product.",
  "Track a cost proxy per account (tokens/compute/storage).",
  "Identify who buys (card vs procurement) and typical deal size.",
  "Define the upgrade trigger (what causes the jump to a higher tier/plan)."
];

function buildImplementationNotes_(answers, primaryModel, secondaryModel, headlineMetric, notes, wrapperObj) {
  var out = [];
  (wrapperObj.notes || []).forEach(function(n) { out.push(n); });
  var spiky = (answers.A1 === "B" || answers.A1 === "C" || answers.A1 === "D");
  var billShockFear = (answers.F4 === "A");
  if (["USAGE","HYBRID","TXN"].indexOf(primaryModel) !== -1 && (spiky || billShockFear)) {
    out.push("Alerts + cap option (bill shock / spiky usage).");
    out.push("Included allowance/bundle (reduce meter anxiety).");
  }
  if (answers.F3 === "A" && (primaryModel === "CREDITS" || secondaryModel === "CREDITS")) {
    out.push("Annual commit/credits + clear drawdown + true-up language.");
  }
  if (headlineMetric === "ACTIVE_SEATS") {
    out.push("Define 'active seat' clearly (e.g., weekly active) to avoid disputes.");
  }
  if (["USAGE","HYBRID","TXN","OUTCOME"].indexOf(primaryModel) !== -1) {
    out.push("Metering checklist: counter per account, auditability, and in-product usage visibility.");
  }
  notes.forEach(function(n) { out.push(n); });
  return unique_(out).slice(0, 4);
}

function buildStarterPackagingSuggestion_(primaryModel, secondaryModel, headlineMetric, secondaryMeter, wrapperObj) {
  var w = wrapperObj.wrapper;
  if (primaryModel === "SUB_TIERED") return "3 plans (Starter/Pro/Enterprise) with one clear limit tied to " + headlineMetric + ". Wrapper: " + w + ".";
  if (primaryModel === "SEAT") return "Price per " + headlineMetric + " with an Enterprise plan for procurement. Wrapper: " + w + ".";
  if (primaryModel === "USAGE") return "Pay-as-you-go on " + headlineMetric + ", plus volume discounts at higher tiers. Wrapper: " + w + ".";
  if (primaryModel === "HYBRID") {
    var second = secondaryMeter ? " + secondary meter " + secondaryMeter : "";
    return "Base platform fee + included allowance of " + headlineMetric + second + ", then overage. Wrapper: " + w + ".";
  }
  if (primaryModel === "CREDITS") return "Annual commit credits that draw down with " + headlineMetric + "; true-up if exceeded. Wrapper: " + w + ".";
  if (primaryModel === "TXN") return "Per-transaction pricing on " + headlineMetric + " with minimums/tiers if needed. Wrapper: " + w + ".";
  if (primaryModel === "OUTCOME") return "Base fee + outcome fee on " + headlineMetric + "; define verification window. Wrapper: " + w + ".";
  return "Simple tiered plans with a clear limit tied to " + headlineMetric + ". Wrapper: " + w + ".";
}

function unique_(arr) {
  var seen = {};
  var out = [];
  (arr || []).forEach(function(x) {
    var s = String(x || "").trim();
    if (!s) return;
    if (!seen[s]) { seen[s] = true; out.push(s); }
  });
  return out;
}

function computeNeedFollowups_(answers, confidenceTier, rankedModels) {
  var need = [];
  if (!answers.P7) {
    var top = rankedModels[0], second = rankedModels[1];
    var withinOne = top && second ? (top.val - second.val <= 1) : false;
    if (confidenceTier !== "High" || withinOne) need.push("P7");
  }
  if (!answers.F3) {
    var enterprise = (answers.P1 === "D");
    var top2 = rankedModels.slice(0, 2).map(function(x) { return x.key; });
    if (enterprise || top2.indexOf("HYBRID") !== -1 || top2.indexOf("CREDITS") !== -1) need.push("F3");
  }
  if (!answers.F4 && confidenceTier !== "High") {
    need.push("F4");
  }
  return need;
}

function logSubmission_(payload, result) {
  var sheet = getSubmissionSheet_();
  var ts = new Date();
  var sessionId = payload.sessionId || "";
  var email = payload.email || "";
  var answersJson = JSON.stringify(payload.answers || {});
  var resultJson = JSON.stringify(result || {});
  var utmJson = JSON.stringify(payload.utm || {});
  var ua = (payload.meta && payload.meta.userAgent) ? payload.meta.userAgent : "";
  var ref = (payload.meta && payload.meta.referrer) ? payload.meta.referrer : "";
  appendSubmissionRow_(sheet, {
    timestamp: ts,
    session_id: sessionId,
    email: email,
    answers_json: answersJson,
    result_json: resultJson,
    utm_json: utmJson,
    user_agent: ua,
    referrer: ref,
    report_status: "",
    report_id: "",
    report_token: "",
    report_draft_md: "",
    product_url: "",
    product_context: "",
    report_final_html: "",
    report_url: "",
    views: 0,
    last_error: "",
    updated_at: ts
  });
}

var REPORT_MODEL_LABELS_ = {
  SUB_TIERED: "Subscription with tiers/plans",
  SEAT: "Seat-based subscription",
  USAGE: "Usage-based",
  HYBRID: "Hybrid (base + usage)",
  CREDITS: "Credits / commit-to-consume",
  TXN: "Transaction-based",
  OUTCOME: "Outcome-based"
};

var REPORT_WRAPPER_LABELS_ = {
  FREEMIUM: "Freemium",
  FREE_TRIAL: "Free trial",
  NONE: "No free entry (paid-only)"
};

var REPORT_METRIC_LABELS_ = {
  SEATS: "Seats",
  ACTIVE_SEATS: "Active seats",
  WORKSPACE: "Workspace / org",
  API_CALLS: "API calls",
  TOKENS: "Tokens",
  COMPUTE: "Compute time",
  AGENT_ACTIONS: "Agent actions",
  EVENTS: "Events",
  RECORDS: "Records",
  STORAGE_GB: "Storage (GB)",
  QUERIES: "Queries",
  RUNS: "Runs/workflows",
  DOCS: "Documents processed",
  TASKS_TICKETS: "Tasks/tickets completed",
  TXN_UNITS: "Transaction units",
  TAKE_RATE: "Take rate",
  OUTCOME_$: "Outcome value ($)",
  OUTCOME_TIME: "Outcome time saved"
};

var REPORT_PRIMARY_MODEL_PLAIN_ENGLISH_ = {
  SUB_TIERED: "You offer fixed plans (e.g. Starter / Pro / Enterprise) with different limits and features. Customers choose a tier and pay a set price; upgrades happen when they need more.",
  SEAT: "You charge per user or per seat (named or active). Value scales with team size; buyers expect per-seat pricing for collaboration tools.",
  USAGE: "You charge based on how much customers use (calls, events, storage, etc.). Bills vary with consumption; good when cost and value scale with usage.",
  HYBRID: "You combine a base fee (platform or seat) with usage-based overage or allowances. Customers get predictability plus flexibility when they grow.",
  CREDITS: "Customers commit to a credit pool (e.g. annually) that draws down with use; true-up or rollover optional. Fits procurement and variable usage.",
  TXN: "You charge per discrete transaction or event (e.g. per API call, per document, per run). Value maps to countable business events.",
  OUTCOME: "You tie part of the fee to a result (e.g. revenue share, time saved, conversion). Fits when the outcome is verifiable and attributable."
};

var REPORT_METRIC_DEFINITION_ = {
  SEATS: "A named seat is one user account (login) that has access. Count distinct users or licensed seats, depending on how you grant access.",
  ACTIVE_SEATS: "An active seat is a user who used the product in a defined window (e.g. last 30 days). Often used to align price with actual usage of seats.",
  WORKSPACE: "A workspace (or org) is one team or company instance. You bill per workspace; may include a cap on seats or usage inside it.",
  API_CALLS: "One request to your API (e.g. one HTTP call to an endpoint). Count successful or billable calls per account per period.",
  TOKENS: "Units of AI consumption (input + output tokens). Common for LLM APIs; customers understand token-based billing.",
  COMPUTE: "Time or units of compute (e.g. GPU minutes, job minutes). Good when cost is driven by processing rather than simple request count.",
  EVENTS: "One event ingested or processed (e.g. one log line, one user action). Fits data pipelines and event-driven products.",
  RECORDS: "One record stored or processed (e.g. one row, one document). Use when value scales with data volume.",
  STORAGE_GB: "Gigabytes of data stored per account. Simple for data-heavy products.",
  QUERIES: "One query or search executed. Fits when the main cost is read/query load.",
  RUNS: "One workflow run, job, or execution. Fits automation and pipeline products.",
  DOCS: "One document processed (e.g. parsed, summarized). Fits document AI and processing.",
  AGENT_ACTIONS: "One action taken by an agent or automation (e.g. one task completed, one step run). Fits agent and workflow products.",
  TASKS_TICKETS: "One task or ticket completed (e.g. by an agent). Fits task-based and support automation.",
  TXN_UNITS: "One billable transaction (e.g. payment, listing, lead). Use when value is per discrete business event.",
  TAKE_RATE: "A percentage of transaction value (e.g. revenue share). Fits marketplaces and platforms.",
  OUTCOME_$: "Dollar value of an outcome you help achieve (e.g. revenue attributed, savings). Requires clear attribution and verification.",
  OUTCOME_TIME: "Time saved or similar outcome (e.g. hours saved). Good when the customer values time and you can measure it."
};

var REPORT_METRIC_WHY_ = {
  SEATS: "Pricing per seat is easy to explain and matches how teams buy. It scales with team size and is familiar to buyers.",
  ACTIVE_SEATS: "Active-seat pricing aligns cost with who actually uses the product, which can feel fairer than charging for unused seats.",
  WORKSPACE: "Workspace pricing is simple and fits products where one team or org is the natural unit of sale.",
  API_CALLS: "API calls are easy to count and align price with developer usage. Customers can estimate from integration scope.",
  TOKENS: "Token-based billing matches AI cost and is standard in the market. Customers understand it for LLM and AI features.",
  COMPUTE: "Compute-based billing matches your cost and is fair when usage intensity (not just request count) drives value.",
  EVENTS: "Event-based billing fits data and pipeline products where value scales with volume ingested or processed.",
  RECORDS: "Record-based billing is intuitive when value is tied to data volume. Easy to explain and measure.",
  STORAGE_GB: "Storage is easy to measure and explain. Fits when storage is a primary cost and value driver.",
  QUERIES: "Query-based billing fits when read load or search usage drives cost and value.",
  RUNS: "Run-based billing fits automation and workflow products. One run = one execution; easy to count.",
  DOCS: "Document-based billing fits when the unit of value is documents processed (e.g. parsing, summarization).",
  AGENT_ACTIONS: "Agent-action billing fits when value is tied to discrete actions or tasks the agent completes.",
  TASKS_TICKETS: "Task-based billing fits when value is tied to discrete tasks completed (e.g. by an agent).",
  TXN_UNITS: "Transaction-based billing fits when value maps to discrete business events (payments, leads, etc.).",
  TAKE_RATE: "Take rate aligns your revenue with customer success and is common in marketplaces.",
  OUTCOME_$: "Outcome-based pricing aligns your fee with measurable business results when attribution is clear.",
  OUTCOME_TIME: "Time-saved pricing fits when the customer’s main benefit is time or efficiency and you can measure it."
};

var REPORT_WRAPPER_REASON_ = {
  FREE_TRIAL: "A time-limited trial lets users experience full value before paying, without the margin risk of a permanent free tier.",
  FREEMIUM: "A permanent free tier with clear limits drives adoption; upgrade when users hit limits or need more.",
  NONE: "Going paid-only fits when sales-led or when the product is highly customized; no free tier to support."
};

var REPORT_ALT_WHEN_ = {
  SUB_TIERED: ["Customers expect predictable plans and clear tiers.", "You're not ready to meter usage yet."],
  SEAT: ["Value scales with more users.", "Buyer expects per-user pricing."],
  USAGE: ["Value tracks clear consumption.", "Variable costs scale with usage."],
  HYBRID: ["You need budgetability plus overage protection.", "Both platform and usage drive value."],
  CREDITS: ["Annual commit is common.", "Procurement prefers drawdown budgets."],
  TXN: ["Value maps to discrete events.", "Transaction counting is simple and trusted."],
  OUTCOME: ["Outcomes are fast to verify.", "Attribution is clear and uncontested."]
};

/** One-line subtitle for executive snapshot: what this model is in one sentence. */
var REPORT_MODEL_SUBTITLE_ = {
  SUB_TIERED: "Fixed plans with limits; customers pick a tier and pay a set price.",
  SEAT: "You charge per user or seat; value scales with team size.",
  USAGE: "You charge based on how much customers use; bills vary with consumption.",
  HYBRID: "Base fee plus usage overage or allowances; predictability and flexibility.",
  CREDITS: "Customers commit to a credit pool that draws down with use; true-up optional.",
  TXN: "You charge per discrete transaction or event; value maps to countable events.",
  OUTCOME: "Part of the fee ties to a result (e.g. revenue share, time saved)."
};

/** One-line subtitle for headline metric: what you're counting. */
var REPORT_METRIC_SUBTITLE_ = {
  SEATS: "One user account (login) that has access.",
  ACTIVE_SEATS: "One user who used the product in a defined window (e.g. last 30 days).",
  WORKSPACE: "One team or company instance; may include a cap on seats or usage.",
  API_CALLS: "One request to your API per account per period.",
  TOKENS: "Units of AI consumption (input + output tokens).",
  COMPUTE: "Time or units of compute (e.g. GPU minutes, job minutes).",
  EVENTS: "One event ingested or processed (e.g. one log line, one user action).",
  RECORDS: "One record stored or processed (e.g. one row, one document).",
  STORAGE_GB: "Gigabytes of data stored per account.",
  QUERIES: "One query or search executed.",
  RUNS: "One workflow run, job, or execution.",
  DOCS: "One document processed (e.g. parsed, summarized).",
  AGENT_ACTIONS: "One action taken by an agent or automation.",
  TASKS_TICKETS: "One task or ticket completed.",
  TXN_UNITS: "One billable transaction (e.g. payment, listing, lead).",
  TAKE_RATE: "A percentage of transaction value (e.g. revenue share).",
  OUTCOME_$: "Dollar value of an outcome you help achieve.",
  OUTCOME_TIME: "Time saved or similar outcome (e.g. hours saved)."
};

/** One-line subtitle for wrapper: what \"how people start\" means. */
var REPORT_WRAPPER_SUBTITLE_ = {
  FREE_TRIAL: "Users try the full product for a limited time before paying.",
  FREEMIUM: "A permanent free tier with hard limits; upgrade when they need more.",
  NONE: "Paid-only; often when sales-led or highly customized."
};

/** What confidence is based on and what to do when it's not High. */
var REPORT_CONFIDENCE_EXPLANATION_ = {
  High: "Based on your answers, the recommendation is clear. You can proceed with the suggested model and metric.",
  Medium: "Based on your answers, the fit is good but not certain. Validate with 2–3 target customers before locking pricing.",
  Low: "You had several \"Not sure\" answers or the scoring was close. We recommend the simplest option above; validate with real usage and buyer feedback before committing."
};

/** Why we recommend shipping this model first (launch now). */
var REPORT_LAUNCH_WHY_ = {
  SUB_TIERED: "Easiest to explain and sell before you have usage data; reduces risk while you learn.",
  SEAT: "Familiar to buyers and easy to implement; you can add usage or active-seat later.",
  USAGE: "Aligns price to consumption from day one; start simple and add tiers or caps as you learn.",
  HYBRID: "Gives predictability (base) plus flexibility (usage); good when both matter.",
  CREDITS: "Fits when procurement expects annual commit; start with a clear drawdown definition.",
  TXN: "Simple when each event is easy to count; add minimums or tiers if needed.",
  OUTCOME: "Only when the outcome is verifiable and fast; otherwise start with a base + usage or tier."
};

/** Short \"what this means\" for the evolve-later path. */
var REPORT_EVOLVE_WHAT_ = {
  "HYBRID → CREDITS": "Add a base fee and usage overage first, then move to annual credits with drawdown and true-up.",
  "CREDITS (annual commit/true-up)": "Move from hybrid to a committed credit pool with clear drawdown and optional true-up.",
  "ACTIVE_SEATS or WORKSPACE (if seat tax risk)": "Shift from named seats to active seats or per-workspace if usage or automation changes how seats are used.",
  "OUTCOME (only if verifiable + within weeks)": "Consider outcome-based pricing only when you can verify results quickly and attribution is clear.",
  "HYBRID (add overages/allowances when costs/usage demand it)": "Add usage-based overage or allowances on top of your tiers when cost or demand justifies it.",
  "Iterate once you have usage + buyer data": "Use the launch-now model to gather data, then refine model and metric with real signals."
};

/** Copy-paste sentence for pricing page (customer-facing). */
var REPORT_METRIC_COPY_PASTE_ = {
  SEATS: "You are billed per seat; one seat is one user account with access.",
  ACTIVE_SEATS: "You are billed per active seat; an active seat is a user who used the product in the last 30 days.",
  WORKSPACE: "You are billed per workspace; one workspace is one team or company instance.",
  API_CALLS: "You are billed per API call; one call is one request to our API.",
  TOKENS: "You are billed per token (input + output); we count AI consumption per request.",
  COMPUTE: "You are billed per unit of compute time (e.g. GPU minutes or job minutes).",
  EVENTS: "You are billed per event ingested or processed.",
  RECORDS: "You are billed per record stored or processed.",
  STORAGE_GB: "You are billed per gigabyte of data stored.",
  QUERIES: "You are billed per query or search executed.",
  RUNS: "You are billed per run (one workflow or job execution).",
  DOCS: "You are billed per document processed.",
  AGENT_ACTIONS: "You are billed per agent action (e.g. one task completed).",
  TASKS_TICKETS: "You are billed per task or ticket completed.",
  TXN_UNITS: "You are billed per transaction (e.g. per payment, per listing).",
  TAKE_RATE: "You pay a percentage of transaction value (revenue share).",
  OUTCOME_$: "Part of the fee is tied to the dollar value of the outcome achieved.",
  OUTCOME_TIME: "Part of the fee is tied to time saved or similar outcome."
};

/** When to avoid this metric (one sentence). */
var REPORT_METRIC_WHEN_TO_AVOID_ = {
  SEATS: "Avoid if you can't clearly define who counts as a seat or if usage varies a lot per seat.",
  ACTIVE_SEATS: "Avoid if you can't measure activity consistently or if the definition would be disputed.",
  WORKSPACE: "Avoid if workspaces are fuzzy (e.g. many teams per org) or hard to count.",
  API_CALLS: "Avoid if calls vary wildly in cost or value; consider compute or tokens instead.",
  TOKENS: "Avoid if token cost is negligible or you don't have per-request metering.",
  COMPUTE: "Avoid if compute isn't a major cost or is hard to attribute per customer.",
  EVENTS: "Avoid if event volume is unpredictable or you can't count it per account.",
  RECORDS: "Avoid if record size or value varies too much to make billing fair.",
  STORAGE_GB: "Avoid if storage is a small part of cost or value.",
  QUERIES: "Avoid if query cost or value is hard to define per customer.",
  RUNS: "Avoid if run duration or cost varies too much without a simple cap.",
  DOCS: "Avoid if document size or complexity makes per-doc pricing unfair.",
  AGENT_ACTIONS: "Avoid if action complexity varies too much to price per action.",
  TASKS_TICKETS: "Avoid if task scope is inconsistent.",
  TXN_UNITS: "Avoid if transaction value varies too much; consider tiers or minimums.",
  TAKE_RATE: "Avoid if attribution or verification of transaction value is unclear.",
  OUTCOME_$: "Avoid if the outcome is slow to verify or attribution is disputed.",
  OUTCOME_TIME: "Avoid if time saved is hard to measure or attribute."
};

/**
 * Plain-English Reference (v1.0) — model "What it means" bullets for report readability.
 */
var PLAIN_ENGLISH_MODEL_WHAT_ = {
  SUB_TIERED: [
    "You sell 2–4 plans (e.g., Starter/Pro/Business) for a recurring fee. Customers pay for ongoing access and upgrade when they need more capability, scale, or risk controls.",
    "The \"meter\" is mostly your **plan choice** (features + limits), not a constantly running usage bill."
  ],
  SEAT: [
    "Customers pay a recurring amount based on how many people have access (\"seats\"). It's the most familiar B2B SaaS pattern and maps neatly to headcount.",
    "Some companies bill **active seats** (only people who used the product recently) to reduce \"shelfware\" frustration."
  ],
  USAGE: [
    "Customers pay based on consumption of a measurable unit (API calls, tokens, GB, runs). When they use more and get more value, they pay more.",
    "This shifts risk toward you: if they don't use it, they don't pay much."
  ],
  HYBRID: [
    "Customers pay a predictable **base fee** (platform/access) that includes some usage, then pay **overages** when they exceed the included amount.",
    "It aims to balance predictability (base) with upside and cost pass-through (usage)."
  ],
  CREDITS: [
    "Customers pre-purchase a bucket of credits (often annually). As they use the product, credits \"burn down.\"",
    "It's a way to keep usage flexibility while giving the vendor cash flow and the buyer budget certainty."
  ],
  TXN: [
    "Customers pay per **countable business event** (a \"turnstile\"): booking confirmed, payment captured, document submitted, ticket resolved.",
    "It's usually a subset of usage-based pricing, but feels fairer because you charge when something concrete happens."
  ],
  OUTCOME: [
    "You charge based on verified business results (e.g., dollars saved, revenue generated, uptime achieved) rather than inputs or raw usage.",
    "Typically this is a **hybrid contract**: a base fee + a variable \"gainshare\" tied to measured outcomes."
  ]
};

/** Plain-English "Why this fits" per model. */
var PLAIN_ENGLISH_MODEL_WHY_FITS_ = {
  SUB_TIERED: [
    "Based on your answers, customers will rely on your product on an ongoing basis — so a predictable recurring plan feels natural (and easy to budget).",
    "You indicated your value is mainly about **capability + workflow**, not one perfect \"thing to count.\" Tiers communicate that value clearly without over-metering.",
    "You're early enough that the \"ideal\" usage meter may still be evolving. Tiered plans let you ship a clean pricing story now and refine as you learn."
  ],
  SEAT: [
    "Your answers suggest value grows as more teammates participate (collaboration, adoption, internal rollout). Seats track that growth directly.",
    "You surfaced needs like access control, permissions, or accountability. Seat pricing maps cleanly to \"who gets access\" and is easy to manage.",
    "You implied that metering every action could slow adoption. Seat pricing removes the \"taxi-meter\" feeling so people use the product freely."
  ],
  USAGE: [
    "Your inputs point to a **clear, countable unit** customers can understand and verify — which makes pay-for-what-you-use feel fair.",
    "You want customers to start small and scale as they succeed. Usage pricing grows automatically with adoption without renegotiation.",
    "Your costs likely rise with usage (tokens/compute/storage/SMS). A usage meter protects margin and keeps pricing aligned with cost."
  ],
  HYBRID: [
    "Your answers suggest you need **predictable revenue** *and* you have meaningful variable costs. A base fee covers the platform value; overages pass through the variable part.",
    "You described usage that can spike or be seasonal. Hybrid reduces the \"overpay in slow months\" problem while still capturing upside when usage grows.",
    "You expect big differences between light and heavy customers. Overages prevent cross-subsidy and make pricing feel proportional to value."
  ],
  CREDITS: [
    "Your answers signal a buyer who cares about **budget control** (procurement/annual planning). Credits turn usage into a pre-approved spend envelope.",
    "You indicated usage is variable and hard to forecast month-to-month. A credit bucket reduces invoice surprises while keeping flexibility.",
    "You want usage-style alignment without constantly negotiating. Credits let customers commit once and then scale consumption smoothly."
  ],
  TXN: [
    "Your product produces a **discrete, auditable value moment** (a completed event). Charging per transaction feels intuitive and fair.",
    "Your answers imply customers can reason in unit economics (\"we can pay $X per ___\"). That makes adoption and internal justification easier.",
    "You want low entry friction. Transaction pricing ties payment to value delivered, which reduces the risk for new customers."
  ],
  OUTCOME: [
    "Your answers suggest success can be measured with a concrete business KPI (not just product usage). That's the foundation for outcome pricing.",
    "You indicated the result is attributable enough to your product (and you control key drivers) to avoid constant attribution debates.",
    "Buyers in your motion likely want ROI confidence and aligned incentives. Outcome-linked pricing makes the value story persuasive."
  ]
};

/** Plain-English "Watch-outs" per model. */
var PLAIN_ENGLISH_MODEL_WATCH_OUTS_ = {
  SUB_TIERED: [
    "If usage/costs vary wildly across customers, flat plans can create **cross-subsidy** (small customers fund whales) and margin surprises.",
    "If customers only use you occasionally, subscription can feel like **\"paying for idle time\"** → churn.",
    "If \"Starter\" is too generous, upgrades stall."
  ],
  SEAT: [
    "**Seat-tax trap:** customers restrict access to control cost, which reduces adoption and value.",
    "For automation/AI products, seat pricing can shrink as the product succeeds (fewer humans needed).",
    "Seat value can be uneven (one power user vs many light users) → pricing friction."
  ],
  USAGE: [
    "**Taxi-meter effect:** customers feel punished for using the product and throttle usage.",
    "**Bill shock:** unpredictable invoices create distrust and churn.",
    "Wrong metric → disputes, gaming, and \"this bill feels arbitrary.\""
  ],
  HYBRID: [
    "Too many meters (seats + storage + API calls) creates billing confusion.",
    "If overages are a large share of revenue, customers feel nickel-and-dimed.",
    "If included usage is too small, customers hit overages immediately → churn."
  ],
  CREDITS: [
    "Credits can be confusing if \"1 credit\" doesn't map cleanly to something customers recognize.",
    "If the conversion rate from credits to value isn't transparent, customers worry they're wasting money.",
    "Accounting/revenue recognition and contract terms can add complexity."
  ],
  TXN: [
    "Edge cases create disputes (retries, duplicates, refunds, fraud) unless counting rules are explicit.",
    "If the event is too far from value (e.g., charging per click when they care about revenue), trust erodes.",
    "Some customers still want predictability; per-event spend can spike."
  ],
  OUTCOME: [
    "Attribution fights: customers claim something else caused the improvement.",
    "Control problem: customer execution is required for success, so you carry risk you can't manage.",
    "Cash-flow volatility if pricing is fully variable."
  ]
};

/** Plain-English "Guardrails" per model. */
var PLAIN_ENGLISH_MODEL_GUARDRAILS_ = {
  SUB_TIERED: [
    "Start with **3 tiers (or 2 + Enterprise)** and make the middle tier the default.",
    "Gate tiers by **outcome/complexity/risk** (e.g., security, compliance, scale), not random features.",
    "Design 1–2 **clear upgrade triggers** (limits people naturally hit as they succeed)."
  ],
  SEAT: [
    "Consider **active-seat billing** (charge only for seats that were used recently, with a clear definition) to avoid shelfware fights.",
    "Define roles (Admin / Full / Light/Guest) if many users are occasional participants.",
    "Offer annual commits + true-ups for mid-market/enterprise if budgeting predictability is key."
  ],
  USAGE: [
    "Add **allowances/bundles**, clear rate cards, and in-product **forecasting**.",
    "Implement \"circuit breakers\": alerts at 50/80/100% and optional caps.",
    "Publish counting rules (retries/refunds/duplicates) and provide an auditable \"what counted\" log."
  ],
  HYBRID: [
    "Use **one primary value metric** and bundle the rest.",
    "Set included allowance around the p25–p50 baseline usage so most customers feel \"covered.\"",
    "Aim for base revenue to cover ~60–80% of expected spend per customer (stability), leaving the rest for usage upside."
  ],
  CREDITS: [
    "Define a simple exchange rate (e.g., 1 credit = 1,000 tokens / 1 run / 1 transaction) and show burn-down in the product.",
    "Offer clear options: pay-as-you-go **or** credits (mixed model), especially early.",
    "Set policies for expiration, rollovers, refunds, and what happens when credits run out."
  ],
  TXN: [
    "Publish exact counting rules and provide an auditable event log (\"what counted\").",
    "Add volume tiers/discounts for large customers to avoid sticker shock.",
    "Consider a base/minimum or credits option for budget-sensitive procurement teams."
  ],
  OUTCOME: [
    "Define the unit of success (binary where possible), baseline, time window, and true-up process.",
    "Build the \"attribution gate\" (logging + auditability) before scaling this model.",
    "Start with base fee + outcome upside, plus caps/floors and payout timing (monthly/quarterly)."
  ]
};

/** Plain-English "Switch to X if…" per model (when to consider another model). */
var PLAIN_ENGLISH_MODEL_SWITCH_TO_ = {
  SUB_TIERED: [
    "**Hybrid (base fee + overages)** if variable costs scale with usage (tokens/compute/SMS/storage) or usage variance is 10×+.",
    "**Usage-based (pay-as-you-go)** or **Transaction-based (per event)** if you can point to a simple, auditable \"value counter\" customers already understand.",
    "**Seat-based** if value scales mainly with the number of people collaborating and access/permissions are central."
  ],
  SEAT: [
    "**Workspace / account pricing** if value is tied to shared data/workflows more than individual logins.",
    "**USAGE** or **Hybrid (base fee + overages)** if value scales with volume processed (tokens, events, runs) more than headcount.",
    "**Tiered subscription** if metering is hard today and you need a simple, capability-based tier ladder."
  ],
  USAGE: [
    "**Hybrid (base fee + overages)** if customers (or investors/FP&A) need more predictability, or your revenue becomes too volatile.",
    "**Credits / drawdown** if enterprise buyers want annual PO/commit while keeping flexible consumption.",
    "**Transaction-based (per event)** if your value moment is a discrete business event (booking confirmed, payment captured)."
  ],
  HYBRID: [
    "**Usage-based (pay-as-you-go)** if baseline value is low and the base fee becomes the main adoption blocker.",
    "**Credits / drawdown** if customers demand annual commits/prepay (procurement) or want hard spend control.",
    "**Seat-based** if the real driver is team adoption and usage is too noisy to explain."
  ],
  CREDITS: [
    "**Usage-based (pay-as-you-go)** if you're mostly self-serve and buyers prefer monthly variability over upfront commits.",
    "**Hybrid (base fee + overages)** if you need a stable platform fee plus flexible consumption.",
    "**Tiered subscription** if your buyers are overwhelmed by credits and you need a simpler story."
  ],
  TXN: [
    "**Usage-based (pay-as-you-go)** if consumption is more continuous (GB, minutes, compute) than discrete.",
    "**Hybrid (base fee + overages)** if customers want a predictable base plus per-transaction overages.",
    "**Outcome-based** if you can reliably price on a verified business result (not just the event)."
  ],
  OUTCOME: [
    "**Hybrid (base fee + overages)** if outcomes are promising but measurement/attribution is not yet airtight.",
    "**Usage-based (pay-as-you-go)** or **Transaction-based (per event)** if you need a simpler, auditable proxy while you collect outcome data.",
    "**Tiered subscription** or **Seat-based** if outcomes are too long-cycle or too noisy to bill inside a normal billing period."
  ]
};

/** Plain-English wrapper "What it means" / "Why this fits" / "Watch-outs" / "Guardrails" / "Switch to X". */
var PLAIN_ENGLISH_WRAPPER_WHAT_ = {
  FREEMIUM: [
    "A free tier that users can stay on forever, with paid tiers for more value (features, limits, controls). It's designed to be an acquisition engine."
  ],
  FREE_TRIAL: [
    "Users get time-limited access (e.g., 7–14–30 days) and typically can try the full product. After the trial, they must pay to continue."
  ],
  NONE: [
    "No free tier and no trial by default. Customers pay to start (often after a demo/pilot), and you may offer a contractual pilot instead."
  ]
};
var PLAIN_ENGLISH_WRAPPER_WHY_FITS_ = {
  FREEMIUM: [
    "Your answers suggest users can reach value quickly and your cost to serve a free user is manageable — making free access a sustainable acquisition lever.",
    "Growth likely depends on broad adoption, sharing, or inviting teammates. A free tier removes friction from those loops.",
    "You have a believable \"why pay\" path as usage scales or customers need controls. That makes freemium convert, not just attract."
  ],
  FREE_TRIAL: [
    "Your answers imply prospects need to experience the product before committing — but an indefinite free tier would be too costly or risky for you.",
    "You can likely deliver an \"aha moment\" within a short window (days/weeks). That makes a time-boxed trial credible.",
    "You want a cleaner conversion path than freemium while still reducing first-purchase friction."
  ],
  NONE: [
    "Your answers point to higher-touch selling (security/compliance, complex onboarding, or expensive compute). Open free access would create downside without real signal.",
    "Time-to-value appears longer than a typical self-serve trial window. A demo or paid pilot is a better risk-managed entry.",
    "Your target buyers likely expect procurement and defined success criteria. A paid-first motion filters for serious prospects and protects your team's time."
  ]
};
var PLAIN_ENGLISH_WRAPPER_WATCH_OUTS_ = {
  FREEMIUM: [
    "\"Santa Claus\" free tier: too generous → no upgrades.",
    "Free users create real costs (support/compute) and crush unit economics.",
    "You accidentally paywall the viral action and kill the growth loop."
  ],
  FREE_TRIAL: [
    "Trials that don't reach an \"aha moment\" → low conversion.",
    "Long setup/onboarding means the trial expires before value is realized.",
    "Sales teams treat trials as unqualified leads and don't activate them."
  ],
  NONE: [
    "Higher friction reduces self-serve conversion and slows early learning.",
    "Without a risk-reversal, prospects may hesitate (\"will this work?\")."
  ]
};
var PLAIN_ENGLISH_WRAPPER_GUARDRAILS_ = {
  FREEMIUM: [
    "Treat free as a marketing expense; design one primary upgrade reason (\"why pay?\").",
    "Keep the viral action free; fence on scale/controls (limits, governance, compliance).",
    "Make upgrades one-click and transparent."
  ],
  FREE_TRIAL: [
    "Design the trial around 1–2 activation goals (the shortest path to meaningful value).",
    "Add in-product guidance, templates, and a clear \"next step\" CTA before the trial ends.",
    "For higher ACVs, offer a guided pilot instead of a pure self-serve trial."
  ],
  NONE: [
    "Offer a low-risk entry: paid pilot, milestone-based rollout, or limited-scope starter plan.",
    "Make the value story concrete (ROI, case studies, clear success criteria).",
    "Keep the pricing model simple enough to explain in one breath."
  ]
};
var PLAIN_ENGLISH_WRAPPER_SWITCH_TO_ = {
  FREEMIUM: [
    "**Free trial** if you don't have viral loops or free users are expensive to serve.",
    "**No free tier / no self-serve trial** if your motion is sales-led with long onboarding and enterprise requirements."
  ],
  FREE_TRIAL: [
    "**Freemium** if collaboration/virality is your growth engine and free users reliably bring more users.",
    "**No free tier / no self-serve trial** if you're consistently selling via demos/onboarding and buyers expect procurement anyway."
  ],
  NONE: [
    "**Free trial** if you're trying to move downmarket/PLG and you can demonstrate value fast.",
    "**Outcome-based** (often as a hybrid: base fee + performance upside) if buyers demand performance guarantees and outcomes are measurable."
  ]
};

/** Plain-English 1–2 line explanation per metric (Pricing Metrics / Value Meters). */
var PLAIN_ENGLISH_METRIC_ = {
  SEATS: "Total paid user licenses (people who can log in). Best when value scales with team adoption and permissions.",
  ACTIVE_SEATS: "Seats that meet a clear activity threshold (e.g., used in last 30 days). Reduces \"paying for unused seats\" fights.",
  WORKSPACE: "Per account/org/workspace (shared environment). Good when value comes from shared data/workflows more than individual users.",
  API_CALLS: "Count of API requests. Good when customers understand \"requests\" and usage maps to value and cost.",
  TOKENS: "LLM input + output tokens consumed. Good when cost/value scales with model usage and you can show token dashboards.",
  COMPUTE: "Compute time/units (GPU-seconds, CPU minutes). Good when infrastructure cost is the dominant driver.",
  AGENT_ACTIONS: "Count of agent-completed actions (tasks executed, steps completed). Good when the product \"does work\" on behalf of users.",
  EVENTS: "Events/logs/messages ingested. Good when ingest volume is the main scaling driver.",
  RECORDS: "Rows/objects processed or stored. Good when value and cost scale with dataset size.",
  STORAGE_GB: "GB stored (often average over the month). Good when retention/storage is the core value driver.",
  QUERIES: "Queries executed (or query units). Good when value is about analysis/compute and customers can predict query volume.",
  RUNS: "Workflow/automation runs executed. Good when customers pay for work completed by the system.",
  DOCS: "Documents processed/generated (pages, files, forms). Good for document AI and back-office automation.",
  TASKS_TICKETS: "Tasks/tickets processed or resolved. Strong when a \"ticket resolved\" is a clear, auditable value moment.",
  TXN_UNITS: "Discrete transactions (payments, bookings, deliveries, verifications). Works when the event is cleanly countable.",
  TAKE_RATE: "% of dollars processed / GMV / revenue influenced. Best for marketplaces or payment-like flows where your value scales with volume.",
  "OUTCOME_$": "Dollars saved or earned (verified incremental value). Best when attribution is strong and both sides agree on the math.",
  OUTCOME_TIME: "Time saved / uptime gained / cycle time reduced (verified). Best when the time metric is objective and linked to real economics."
};

/** Human-readable labels for follow-up question IDs (Section 9). */
var FOLLOWUP_PLAIN_ENGLISH_ = {
  P7: "Which pricing model are you leaning toward? (helps narrow the recommendation)",
  F3: "How does your team prefer to buy — annual commit vs. pay-as-you-go?",
  F4: "How predictable is your usage or cost today?"
};

/**
 * Deterministic markdown report draft — strictly follows:
 * public/assets/pricing_model_matchmaker/deterministic_report_draft.md
 */
function generateDeterministicReportDraft_(payload, result, productContext) {
  var REPORT_MODEL_LABELS = (typeof REPORT_MODEL_LABELS_ !== "undefined" && REPORT_MODEL_LABELS_) ? REPORT_MODEL_LABELS_ : {};
  var REPORT_WRAPPER_LABELS = (typeof REPORT_WRAPPER_LABELS_ !== "undefined" && REPORT_WRAPPER_LABELS_) ? REPORT_WRAPPER_LABELS_ : {};
  var REPORT_METRIC_LABELS = (typeof REPORT_METRIC_LABELS_ !== "undefined" && REPORT_METRIC_LABELS_) ? REPORT_METRIC_LABELS_ : {};
  var REPORT_PRIMARY_MODEL_PLAIN_ENGLISH = (typeof REPORT_PRIMARY_MODEL_PLAIN_ENGLISH_ !== "undefined" && REPORT_PRIMARY_MODEL_PLAIN_ENGLISH_) ? REPORT_PRIMARY_MODEL_PLAIN_ENGLISH_ : {};
  var REPORT_METRIC_DEFINITION = (typeof REPORT_METRIC_DEFINITION_ !== "undefined" && REPORT_METRIC_DEFINITION_) ? REPORT_METRIC_DEFINITION_ : {};
  var REPORT_METRIC_WHY = (typeof REPORT_METRIC_WHY_ !== "undefined" && REPORT_METRIC_WHY_) ? REPORT_METRIC_WHY_ : {};
  var REPORT_WRAPPER_REASON = (typeof REPORT_WRAPPER_REASON_ !== "undefined" && REPORT_WRAPPER_REASON_) ? REPORT_WRAPPER_REASON_ : {};
  var REPORT_ALT_WHEN = (typeof REPORT_ALT_WHEN_ !== "undefined" && REPORT_ALT_WHEN_) ? REPORT_ALT_WHEN_ : {};

  var confidenceTier = (result.confidence && result.confidence.tier) ? result.confidence.tier : (result.confidence_tier || "Medium");
  var primaryKey = result.primary_model || "SUB_TIERED";
  var primary = labelOrSelf_(REPORT_MODEL_LABELS, primaryKey);
  var secondaryKey = result.secondary_model;
  var secondary = secondaryKey ? labelOrSelf_(REPORT_MODEL_LABELS, secondaryKey) : "";
  var wrapperKey = result.wrapper || "FREE_TRIAL";
  var wrapper = labelOrSelf_(REPORT_WRAPPER_LABELS, wrapperKey);
  var headlineKey = result.headline_metric || "WORKSPACE";
  var headlineMetric = labelOrSelf_(REPORT_METRIC_LABELS, headlineKey);
  var secondaryMeterKey = result.secondary_meter;
  var secondaryMeter = secondaryMeterKey ? labelOrSelf_(REPORT_METRIC_LABELS, secondaryMeterKey) : "";
  var launchNow = labelOrSelf_(REPORT_MODEL_LABELS, result.launch_now || primaryKey);
  var evolveLater = result.evolve_later || "Iterate once you have usage + buyer data";

  var why = arrayOrEmpty_(result.why_this_fits).slice(0, 3);
  var watch = arrayOrEmpty_(result.watch_outs).slice(0, 2);
  var impl = arrayOrEmpty_(result.implementation_notes).slice(0, 4);
  var metricCandidateKeys = arrayOrEmpty_(result.metric_candidates).slice(0, 3);
  var metricCandidates = metricCandidateKeys.map(function(m) { return labelOrSelf_(REPORT_METRIC_LABELS, m); });
  var altModelKeys = arrayOrEmpty_(result.alt_models).slice(0, 2);
  var altModels = altModelKeys.map(function(m) { return labelOrSelf_(REPORT_MODEL_LABELS, m); });
  var wrapperNotes = arrayOrEmpty_(result.wrapper_notes).slice(0, 3);
  var measureNext = arrayOrEmpty_(result.measure_next_checklist).slice(0, 4);
  var needFollowups = arrayOrEmpty_(result.followup_question_ids);

  var primaryPlain = REPORT_PRIMARY_MODEL_PLAIN_ENGLISH[primaryKey] || "A pricing model that fits your current stage and value delivery.";
  var metricDef = REPORT_METRIC_DEFINITION[headlineKey] || "The unit you charge for; define it clearly so customers can predict their bill.";
  var metricWhy = REPORT_METRIC_WHY[headlineKey] || "This metric tracks customer value and is easy to explain and measure.";
  var wrapperReason1 = REPORT_WRAPPER_REASON[wrapperKey] || "It fits your go-to-market and margin constraints.";
  var wrapperReason2 = wrapperNotes[0] || "";

  var alt0When = REPORT_ALT_WHEN[altModelKeys[0]] || ["It fits their situation better.", "Their usage pattern suits it."];
  var alt1When = REPORT_ALT_WHEN[altModelKeys[1]] || ["It fits their situation better.", "Their usage pattern suits it."];
  var alt0Why = WHY_FITS_[altModelKeys[0]] ? WHY_FITS_[altModelKeys[0]][0] : "It can better match value to price in some cases.";
  var alt1Why = WHY_FITS_[altModelKeys[1]] ? WHY_FITS_[altModelKeys[1]][0] : "It can better match value to price in some cases.";

  var metric0Line = metricCandidates[0] ? (metricCandidates[0] + " — " + (REPORT_METRIC_DEFINITION[metricCandidateKeys[0]] || "Top candidate for your scenario.")) : headlineMetric + " — primary recommendation.";
  var metric1Line = metricCandidates[1] ? (metricCandidates[1] + " — " + (REPORT_METRIC_DEFINITION[metricCandidateKeys[1]] || "Strong alternative.")) : (secondaryMeter || "Secondary option.");
  var metric2Line = metricCandidates[2] ? (metricCandidates[2] + " — " + (REPORT_METRIC_DEFINITION[metricCandidateKeys[2]] || "Worth considering.")) : "Another metric to validate with usage.";
  var metric0Why = REPORT_METRIC_WHY[metricCandidateKeys[0]] || REPORT_METRIC_WHY[headlineKey] || metricWhy;
  var metric1Why = REPORT_METRIC_WHY[metricCandidateKeys[1]] || metricWhy;
  var metric2Why = REPORT_METRIC_WHY[metricCandidateKeys[2]] || metricWhy;

  var L = [];
  L.push("# Pricing Model Matchmaker — Your Free Customized Report");
  L.push("");
  L.push("This report is generated from your quiz answers and gives you a clear, practical starting point.");
  L.push("");
  L.push("If you have any issues or feedback, email [hello@sarahzou.com](mailto:hello@sarahzou.com).");
  L.push("");
  L.push("---");
  L.push("");
  L.push("## 0) Executive snapshot");
  L.push("");
  L.push("### Your recommended pricing setup");
  L.push("");
  L.push("- **Best-fit model:** " + primary);
  L.push("- **Headline value metric:** " + headlineMetric);
  if (secondaryMeter) {
    L.push("- **Optional secondary meter:** " + secondaryMeter);
    L.push("");
  }
  L.push("- **Recommended wrapper:** " + wrapper);
  L.push("- **Confidence:** " + confidenceTier);
  L.push("");
  L.push("### What to do next (3 steps)");
  L.push("");
  L.push("1) **Ship a simple v1** using " + launchNow + " (details below)");
  L.push("");
  L.push("2) **Use the metric definition** in Section 3 so customers understand billing");
  L.push("");
  L.push("3) **Add one predictability feature** (alerts / cap / allowance) from Section 4");
  L.push("");
  L.push("> **Important boundary (so you don't overfit too early):**");
  L.push("> This report intentionally does **not** set exact starting prices or tier limits. Those depend on buyer willingness-to-pay and your sales motion. If you want that finalized quickly, see Section 9.");
  L.push("");
  L.push("---");
  L.push("");
  L.push("## 1) What this recommendation means");
  L.push("");
  L.push("### Model explanation (what it is)");
  L.push("");
  L.push("**" + primary + "** means:");
  L.push("");
  L.push(primaryPlain);
  L.push("");
  L.push("*(If you're generating from a knowledge base: insert a 2–3 sentence \"definition\" block here.)*");
  L.push("");
  L.push("### Why this fits your situation (why)");
  L.push("");
  if (why.length > 0) {
    for (var i = 0; i < why.length; i++) L.push("- " + why[i]);
  } else {
    L.push("- This model tends to fit when pricing can scale with customer value without creating surprise bills.");
  }
  L.push("");
  L.push("### Watch-outs to avoid (what to watch)");
  L.push("");
  if (watch.length > 0) {
    for (var w = 0; w < watch.length; w++) L.push("- " + watch[w]);
  } else {
    L.push("- Keep the billing explanation simple and avoid confusing customers with too many meters.");
  }
  L.push("");
  L.push("---");
  L.push("");
  L.push("## 2) Launch now → evolve later (your realistic path)");
  L.push("");
  L.push("### Launch now (the simplest version to ship first)");
  L.push("");
  L.push("**" + launchNow + "**");
  L.push("");
  L.push("Why launch here:");
  L.push("");
  L.push("- It's easier to explain and sell early.");
  L.push("- It reduces risk while you learn usage patterns.");
  L.push("- It gives you clean signals for iteration.");
  L.push("");
  L.push("### Evolve later (once you have usage + buyer data)");
  L.push("");
  L.push("**" + evolveLater + "**");
  L.push("");
  L.push("When you should consider evolving:");
  L.push("");
  L.push("- After you have 4–6 weeks of usage data **or** 10–20 paid customers");
  L.push("- When you see one of these triggers: usage doubles, enterprise asks for commit, or expansion revenue becomes predictable");
  L.push("");
  L.push("---");
  L.push("");
  L.push("## 3) Your headline value metric (what it is + how to explain it)");
  L.push("");
  L.push("### Metric definition (copy/paste)");
  L.push("");
  L.push("You are billed based on **" + headlineMetric + "**.");
  L.push("");
  L.push("**A \"" + headlineMetric + "\" means:**");
  L.push("");
  L.push(metricDef);
  L.push("");
  L.push("**Why this metric is a good match (in one paragraph):**");
  L.push("");
  L.push(metricWhy);
  L.push("");
  L.push("### How to keep this metric \"fair\" (simple rules)");
  L.push("");
  L.push("Use these simple principles to reduce billing anxiety:");
  L.push("");
  L.push("- **Make it predictable:** customers should be able to estimate usage before buying.");
  L.push("- **Make it measurable:** you can count it consistently per account.");
  L.push("- **Make it visible:** show usage in-product (or in invoices) so it's not a surprise.");
  L.push("");
  L.push("---");
  L.push("");
  L.push("## 4) Wrapper recommendation (how people start)");
  L.push("");
  L.push("### Recommended wrapper: **" + wrapper + "**");
  L.push("");
  L.push("What this means:");
  L.push("");
  L.push("- **FREE_TRIAL:** people try the full product for a limited time");
  L.push("- **FREEMIUM:** a permanent free tier with hard limits");
  L.push("- **NONE:** you go paid-only (often when sales-led or very customized)");
  L.push("");
  L.push("Why this wrapper fits (1–2 points):");
  L.push("");
  L.push("- " + wrapperReason1);
  if (wrapperReason2) L.push("- " + wrapperReason2);
  L.push("");
  if (wrapperNotes.length > 0) {
    L.push("Notes / constraints:");
    L.push("");
    for (var n = 0; n < wrapperNotes.length; n++) L.push("- " + wrapperNotes[n]);
    L.push("");
  }
  L.push("---");
  L.push("");
  L.push("## 5) Two alternatives (when to switch — and why)");
  L.push("");
  L.push("Even if " + primary + " is the best default, these two options are close contenders.");
  L.push("");
  if (altModels.length >= 2) {
    L.push("### Alternative 1: **" + altModels[0] + "**");
    L.push("");
    L.push("**Pick this instead if:**");
    L.push("");
    L.push("- " + (alt0When[0] || "Value scales differently than assumed."));
    L.push("- " + (alt0When[1] || "Buyer expects this model."));
    L.push("");
    L.push("**Why it can be better in that case:**");
    L.push("");
    L.push(alt0Why);
    L.push("");
    L.push("### Alternative 2: **" + altModels[1] + "**");
    L.push("");
    L.push("**Pick this instead if:**");
    L.push("");
    L.push("- " + (alt1When[0] || "Value scales differently than assumed."));
    L.push("- " + (alt1When[1] || "Buyer expects this model."));
    L.push("");
    L.push("**Why it can be better in that case:**");
    L.push("");
    L.push(alt1Why);
  } else {
    L.push("### Alternative(s)");
    L.push("");
    if (secondary) L.push("- **Alternative model:** " + secondary);
    L.push("- Conditions to switch: when usage patterns or buyer expectations point to a different model (e.g. more usage-based or more commit-based).");
  }
  L.push("");
  L.push("---");
  L.push("");
  L.push("## 6) Other metric candidates (top 3)");
  L.push("");
  L.push("These are the top metric candidates the scorer considered for your scenario.");
  L.push("");
  if (metricCandidates.length >= 3) {
    L.push("1) **" + metricCandidates[0] + "** — " + metric0Line);
    L.push("");
    L.push("   Why it might fit: " + metric0Why);
    L.push("");
    L.push("2) **" + metricCandidates[1] + "** — " + metric1Line);
    L.push("");
    L.push("   Why it might fit: " + metric1Why);
    L.push("");
    L.push("3) **" + metricCandidates[2] + "** — " + metric2Line);
    L.push("");
    L.push("   Why it might fit: " + metric2Why);
  } else {
    L.push("1) **" + headlineMetric + "** — " + metric0Line);
    L.push("2) **" + (secondaryMeter || "Secondary meter") + "** — " + metric1Line);
    L.push("3) **Other metric** — " + metric2Line);
  }
  L.push("");
  L.push("**How to pick the winner (simple rule):**");
  L.push("");
  L.push("Choose the metric that is easiest for customers to **predict**, easiest for you to **measure**, and most closely tracks **customer value**.");
  L.push("");
  L.push("---");
  L.push("");
  L.push("## 7) Implementation checklist (practical \"do this\" items)");
  L.push("");
  L.push("Here are the most important implementation actions to avoid early pricing mistakes.");
  L.push("");
  if (impl.length > 0) {
    for (var k = 0; k < impl.length; k++) L.push("- " + impl[k]);
  } else {
    L.push("- Add an included allowance or clear limits so bills feel predictable.");
    L.push("- Show usage in-product or on invoices so customers aren't surprised.");
    L.push("- Keep one primary growth lever; don't stack too many meters.");
  }
  L.push("");
  L.push("---");
  L.push("");
  L.push("## 8) If confidence isn't High: what to validate next");
  L.push("");
  L.push("**Confidence:** " + confidenceTier);
  L.push("");
  if (measureNext.length > 0) {
    L.push("To make this recommendation even more precise, validate these next:");
    L.push("");
    for (var q = 0; q < measureNext.length; q++) L.push("- " + measureNext[q]);
  }
  if (needFollowups.length > 0) {
    L.push("");
    L.push("### Follow-up questions (quick wins)");
    L.push("");
    L.push("Answering these will sharpen your recommendation:");
    L.push("");
    for (var f = 0; f < needFollowups.length; f++) L.push("- " + (needFollowups[f] || ""));
  }
  L.push("");
  L.push("---");
  L.push("");
  L.push("## 9) Next steps (and how we can help)");
  L.push("");
  L.push("### If you want to DIY (good path for many founders)");
  L.push("");
  L.push("- Ship the **Launch now** version");
  L.push("- Use the pricing-page copy blocks above");
  L.push("- Revisit in 4–6 weeks with real usage + sales signals");
  L.push("");
  L.push("### If you want this finalized fast (recommended when you're selling now)");
  L.push("");
  L.push("In a 5-day Sprint, we help you finalize:");
  L.push("");
  L.push("- **Final model + final metric**");
  L.push("- **Tier limits (allowances) + upgrade triggers**");
  L.push("- **Starting price points (with reasoning)**");
  L.push("- **Pricing page copy ready to publish**");
  L.push("- **Rollout plan (how to introduce pricing without backlash)**");
  L.push("");
  L.push("**Book a free consult:** https://sarahzou.com/book");
  L.push("");
  L.push("**Pricing Sprint details:** https://sarahzou.com/consulting/services/pricing-monetization-sprint");
  L.push("");
  L.push("Questions or feedback? Email [hello@sarahzou.com](mailto:hello@sarahzou.com).");
  L.push("");
  L.push("---");

  return L.join("\n");
}

/**
 * Public wrapper so you can attach a time-driven trigger if desired.
 * Processes rows where report_status is POLISHED:
 * - Sends report email
 * - Sets report_status to SENT
 * - Updates updated_at
 */
function processPolishedReports() {
  processPolishedReports_();
}

/**
 * One-time bootstrap helper.
 * Run manually once if needed; safe to call repeatedly.
 */
function installPolishedReportTrigger() {
  ensurePolishedReportTrigger_();
}

/**
 * Ensure a clock trigger exists so POLISHED rows are processed
 * even when no web app request arrives.
 */
function ensurePolishedReportTrigger_() {
  var handler = "processPolishedReports";
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var t = triggers[i];
    if (t.getHandlerFunction && t.getHandlerFunction() === handler) {
      return;
    }
  }
  ScriptApp.newTrigger(handler).timeBased().everyMinutes(5).create();
}

function processPolishedReports_() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;

  try {
    var sheet = getSubmissionSheet_();
    var cols = getHeaderMap_(sheet);

    var lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    var width = cols.width;
    var values = sheet.getRange(2, 1, lastRow - 1, width).getValues();

    var statusIdx = cols.idx.report_status - 1;
    var emailIdx = cols.idx.email - 1;
    var reportUrlIdx = cols.idx.report_url - 1;
    var reportHtmlIdx = cols.idx.report_final_html ? (cols.idx.report_final_html - 1) : -1;
    var reportFileIdx = cols.idx.report_file_id ? (cols.idx.report_file_id - 1) : -1;
    var lastErrorIdx = cols.idx.last_error ? (cols.idx.last_error - 1) : -1;

    for (var i = 0; i < values.length; i++) {
      var rowIndex = i + 2;
      var status = String(values[i][statusIdx] || "").trim();
      if (status !== "POLISHED") continue;

      var email = String(values[i][emailIdx] || "").trim();
      var reportUrl = String(values[i][reportUrlIdx] || "").trim();
      var reportHtml = (reportHtmlIdx >= 0) ? String(values[i][reportHtmlIdx] || "").trim() : "";
      var reportFileId = (reportFileIdx >= 0) ? String(values[i][reportFileIdx] || "").trim() : "";

      if (!email || !reportUrl) continue;
      if (!reportHtml && !reportFileId) {
        updateSubmissionRow_(sheet, rowIndex, {
          last_error: "POLISHED but report content is missing (report_final_html/report_file_id).",
          updated_at: new Date()
        });
        continue;
      }

      try {
        sendReportReadyEmail_(email, reportUrl);
        updateSubmissionRow_(sheet, rowIndex, {
          report_status: "SENT",
          updated_at: new Date(),
          last_error: ""
        });
      } catch (sendErr) {
        updateSubmissionRow_(sheet, rowIndex, {
          last_error: "Email send failed: " + String(sendErr),
          updated_at: new Date()
        });
      }
    }
  } finally {
    lock.releaseLock();
  }
}

function sendReportReadyEmail_(email, reportUrl) {
  var subject = "Your Pricing Model Matchmaker report";
  var htmlBody = [
    "<div style='font-family:Arial,sans-serif;line-height:1.6;color:#111;'>",
    "<p>Your Pricing Model Matchmaker report is ready.</p>",
    "<p><a href='" + escapeHtmlAttr_(reportUrl) + "' style='color:#0b57d0;'>Open your report</a></p>",
    "<p>Want help implementing? <a href='https://sarahzou.com/book' style='color:#0b57d0;'>Book a consult</a>.</p>",
    "</div>"
  ].join("");

  GmailApp.sendEmail(email, subject, "Your report is ready: " + reportUrl, {
    htmlBody: htmlBody
  });
}

function escapeHtmlAttr_(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getProductContext_(productUrl) {
  var out = { url: "", domain: "", title: "", description: "" };
  if (!productUrl) return out;

  var url = normalizeAndValidateHttpUrl_(String(productUrl));
  if (!url) return out;

  out.url = url;
  out.domain = extractDomain_(url);

  try {
    var response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });

    var html = String(response.getContentText() || "");
    // Cap size so prompts + cells don’t blow up
    if (html.length > 200000) html = html.slice(0, 200000);

    var title = stripHtml_(firstMatch_(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
    if (!title) {
      title = stripHtml_(extractMetaContent_(html, [
        "og:title",
        "twitter:title",
        "title"
      ]));
    }
    if (!title) {
      title = stripHtml_(firstMatch_(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
    }

    var description = stripHtml_(extractMetaContent_(html, [
      "description",
      "og:description",
      "twitter:description"
    ]));
    if (!description) {
      description = stripHtml_(firstMatch_(html, /<p[^>]*>([\s\S]*?)<\/p>/i));
    }

    out.title = title.slice(0, 200);
    out.description = description.slice(0, 500);
  } catch (err) {
    // optional enrichment; ignore fetch errors
  }
  return out;
}

function logReportDraftRequest_(payload, result, reportMarkdown, productContext, reportId, reportToken, reportUrl) {
  var sheet = getSubmissionSheet_();
  var ts = new Date();
  var sessionId = payload.sessionId || "";
  var email = payload.email || "";
  var payloadProductUrl = getPayloadProductUrl_(payload);
  var productUrl = (productContext && productContext.url) ? productContext.url : payloadProductUrl;
  var productDomain = (productContext && productContext.domain)
    ? productContext.domain
    : extractDomainLoose_(productUrl);
  var productContextJson = productUrl ? JSON.stringify({
    domain: productDomain || "",
    title: (productContext && productContext.title) ? productContext.title : "",
    description: (productContext && productContext.description) ? productContext.description : ""
  }) : "";

  var existingRow = findRowBySessionId_(sheet, sessionId);
  if (existingRow <= 0 && email) {
    // Fallback when session_id is missing or changed across requests.
    existingRow = findLatestRowByEmail_(sheet, email);
  }
  if (existingRow > 0) {
    updateSubmissionRow_(sheet, existingRow, {
      email: email,
      report_status: "PENDING_POLISH",
      report_id: reportId || "",
      report_token: reportToken || "",
      report_draft_md: reportMarkdown || "",
      product_url: productUrl,
      product_context: productContextJson,
      report_url: reportUrl || "",
      views: 0,
      updated_at: ts
    });
    return;
  }

  var answersJson = JSON.stringify(payload.answers || {});
  var resultJson = JSON.stringify(result || {});
  var utmJson = JSON.stringify(payload.utm || {});
  var ua = (payload.meta && payload.meta.userAgent) ? payload.meta.userAgent : "";
  var ref = (payload.meta && payload.meta.referrer) ? payload.meta.referrer : "";

  appendSubmissionRow_(sheet, {
    timestamp: ts,
    session_id: sessionId,
    email: email,
    answers_json: answersJson,
    result_json: resultJson,
    utm_json: utmJson,
    user_agent: ua,
    referrer: ref,
    report_status: "PENDING_POLISH",
    report_id: reportId || "",
    report_token: reportToken || "",
    report_draft_md: reportMarkdown || "",
    product_url: productUrl,
    product_context: productContextJson,
    report_final_html: "",
    report_url: reportUrl || "",
    views: 0,
    last_error: "",
    updated_at: ts
  });
}

function getSubmissionSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  ensureSheetColumns_(sheet, SHEET_COLUMNS);
  return sheet;
}

function appendSubmissionRow_(sheet, rowObj) {
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
}

/**
 * Ensures the sheet has all columns listed in `desiredColumns`.
 * Adds missing columns to the end (non-destructive).
 */
function ensureSheetColumns_(sheet, desiredColumns) {
  desiredColumns = desiredColumns || [];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(desiredColumns);
    return;
  }

  var lastCol = Math.max(sheet.getLastColumn(), desiredColumns.length);
  var header = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function(x) { return String(x || "").trim(); });

  var existing = {};
  for (var i = 0; i < header.length; i++) {
    if (header[i]) existing[header[i]] = true;
  }

  // Append missing headers
  desiredColumns.forEach(function(colName) {
    if (!existing[colName]) {
      sheet.insertColumnAfter(sheet.getLastColumn());
      sheet.getRange(1, sheet.getLastColumn()).setValue(colName);
      existing[colName] = true;
    }
  });
}

/**
 * Returns a column index map based on the header row.
 * { idx: {colName: 1-based index}, width: lastColumn }
 */
function getHeaderMap_(sheet) {
  var width = sheet.getLastColumn();
  if (width < 1) width = 1;
  var header = sheet.getRange(1, 1, 1, width).getValues()[0];

  var idx = {};
  for (var i = 0; i < header.length; i++) {
    var name = String(header[i] || "").trim();
    if (name) idx[name] = i + 1;
  }
  return { idx: idx, width: width };
}

function getOrCreateSheet_(name, headerRow) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0 && headerRow && headerRow.length) {
    sheet.appendRow(headerRow);
  }
  return sheet;
}

/**
 * Append-only view log (optional, but useful for auditing).
 * Note: Apps Script doGet does not expose request headers, so UA/referrer may be blank.
 */
function logReportView_(reportId, reportToken) {
  try {
    var sheet = getOrCreateSheet_(REPORT_VIEWS_SHEET_NAME, ["viewed_at", "report_id", "report_token"]);
    sheet.appendRow([new Date(), String(reportId || ""), String(reportToken || "")]);
  } catch (e) {
    // View logging should never break report serving.
  }
}

/**
 * Prepares stored HTML for serving: sanitizes article, cleans Google redirect URLs, injects into template, adds CSP.
 */
function prepareReportHtmlForServing_(html) {
  var article = String(html || "");
  article = sanitizeReportHtml_(article);
  article = cleanGoogleRedirectUrlsInHtml_(article);
  var full = (REPORT_PAGE_TEMPLATE_ || "").replace("{{ARTICLE_HTML}}", article);
  full = ensureCspNoScript_(full);
  return full;
}

/**
 * Returns the real URL when given a Google redirect URL; otherwise returns the original.
 */
function cleanUrl_(url) {
  if (!url) return url;
  var s = String(url).trim();
  if (s.indexOf("https://www.google.com/url?q=") === 0) {
    var rest = s.split("https://www.google.com/url?q=")[1];
    if (rest) {
      var real = rest.split("&")[0];
      try {
        return decodeURIComponent(real);
      } catch (e) {
        return url;
      }
    }
  }
  return url;
}

/**
 * Replaces all Google redirect URLs in HTML with their cleaned (real) URLs.
 */
function cleanGoogleRedirectUrlsInHtml_(html) {
  var out = String(html || "");
  var re = /https:\/\/www\.google\.com\/url\?q=[^&\s"'<>]+(?:&[^"'\s<>]*)?/g;
  out = out.replace(re, function(match) {
    return cleanUrl_(match);
  });
  return out;
}

function sanitizeReportHtml_(html) {
  var out = String(html || "");

  // Remove <script> blocks
  out = out.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

  // Remove inline event handlers: onclick=, onload=, etc.
  out = out.replace(/\son\w+\s*=\s*(['"])[\s\S]*?\1/gi, "");

  // Neutralize javascript: URLs in href/src
  out = out.replace(/\b(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, "$1=$2#$2");

  return out;
}

function ensureRobotsNoIndex_(html) {
  var out = String(html || "");
  if (/name\s*=\s*['"]robots['"]/i.test(out)) return out;

  if (/<head[^>]*>/i.test(out)) {
    return out.replace(/<head[^>]*>/i, function(m) {
      return m + '<meta name="robots" content="noindex,nofollow">';
    });
  }

  // If it’s a fragment, wrap it.
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"></head><body>' + out + '</body></html>';
}

function ensureCspNoScript_(html) {
  var out = String(html || "");
  if (/content-security-policy/i.test(out)) return out;

  var meta = '<meta http-equiv="Content-Security-Policy" content="default-src \'self\' https: data:; img-src https: data:; style-src \'unsafe-inline\' https:; font-src https: data:; script-src \'none\';">';
  if (/<head[^>]*>/i.test(out)) {
    return out.replace(/<head[^>]*>/i, function(m) { return m + meta; });
  }
  return out;
}

/**
 * If HTML is too large for a Google Sheet cell, store it in Drive and return {html:"", fileId:"..."}.
 * Use this if/when you accept polished HTML back into Apps Script (e.g. via webhook).
 */
function storeHtmlToDriveIfTooLarge_(html, reportId) {
  var s = String(html || "");
  if (s.length <= MAX_SHEET_CELL_CHARS) return { html: s, fileId: "" };

  var folder = getOrCreateFolder_(REPORTS_FOLDER_NAME);
  var name = "pmm-report-" + String(reportId || Utilities.getUuid()) + ".html";
  var file = folder.createFile(name, s, MimeType.HTML);
  return { html: "", fileId: file.getId() };
}

function loadHtmlFromDrive_(fileId) {
  try {
    if (!fileId) return "";
    return DriveApp.getFileById(String(fileId)).getBlob().getDataAsString("UTF-8");
  } catch (e) {
    return "";
  }
}

function getOrCreateFolder_(name) {
  var it = DriveApp.getFoldersByName(name);
  if (it.hasNext()) return it.next();
  return DriveApp.createFolder(name);
}

/**
 * Allows only http/https URLs and blocks obvious private/localhost hosts.
 */
function normalizeAndValidateHttpUrl_(urlStr) {
  if (!urlStr) return "";
  var s = String(urlStr).trim();
  if (!s) return "";
  if (s.length > 2048) return "";

  // Accept user-entered hostnames like "example.com" / "www.example.com"
  // by assuming https when scheme is missing.
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) {
    s = "https://" + s;
  }

  try {
    var u = new URL(s);
    var proto = (u.protocol || "").toLowerCase();
    if (proto !== "http:" && proto !== "https:") return "";

    var host = (u.hostname || "").toLowerCase();
    if (!host) return "";

    // Block localhost and common private ranges (best-effort; DNS resolution not available)
    if (host === "localhost" || host.endsWith(".local")) return "";
    if (isPrivateIpHost_(host)) return "";

    return u.toString();
  } catch (e) {
    return "";
  }
}

function isPrivateIpHost_(host) {
  // If hostname is an IPv4 literal, block private ranges.
  var m = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!m) return false;
  var a = parseInt(m[1], 10), b = parseInt(m[2], 10);
  if ([a,b].some(function(x){ return isNaN(x) || x < 0 || x > 255; })) return true;

  // 10.0.0.0/8
  if (a === 10) return true;
  // 127.0.0.0/8
  if (a === 127) return true;
  // 169.254.0.0/16
  if (a === 169 && b === 254) return true;
  // 172.16.0.0/12
  if (a === 172 && b >= 16 && b <= 31) return true;
  // 192.168.0.0/16
  if (a === 192 && b === 168) return true;

  return false;
}

function getPayloadProductUrl_(payload) {
  if (!payload) return "";
  var candidates = [
    payload.productUrl,
    payload.product_url,
    payload.productURL
  ];
  for (var i = 0; i < candidates.length; i++) {
    var v = candidates[i];
    if (v === null || v === undefined) continue;
    var s = String(v).trim();
    if (s) return s;
  }
  return "";
}

function extractDomainLoose_(url) {
  var s = String(url || "").trim();
  if (!s) return "";

  var normalized = s;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(normalized)) {
    normalized = "https://" + normalized;
  }

  var domain = extractDomain_(normalized);
  if (domain) return domain;

  var hostMatch = normalized.match(/^(?:https?:\/\/)?([^\/?#:]+)/i);
  return hostMatch && hostMatch[1] ? String(hostMatch[1]).toLowerCase() : "";
}


/**
 * Returns 1-based row index of the last row where session_id matches, or 0 if not found.
 */
function findRowBySessionId_(sheet, sessionId) {
  if (!sessionId) return 0;
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  var cols = getHeaderMap_(sheet);
  var col = cols.idx.session_id;
  if (!col) return 0;

  var numRows = lastRow - 1;
  var data = sheet.getRange(2, col, numRows, 1).getValues();
  for (var r = data.length - 1; r >= 0; r--) {
    if (String(data[r][0] || "").trim() === String(sessionId).trim()) return r + 2;
  }
  return 0;
}

/**
 * Returns 1-based row index of the most recent row where email matches, or 0 if not found.
 */
function findLatestRowByEmail_(sheet, email) {
  if (!email) return 0;
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  var cols = getHeaderMap_(sheet);
  var col = cols.idx.email;
  if (!col) return 0;

  var target = String(email).trim().toLowerCase();
  if (!target) return 0;

  var numRows = lastRow - 1;
  var data = sheet.getRange(2, col, numRows, 1).getValues();
  for (var r = data.length - 1; r >= 0; r--) {
    var rowEmail = String(data[r][0] || "").trim().toLowerCase();
    if (rowEmail && rowEmail === target) return r + 2;
  }
  return 0;
}

/**
 * Returns 1-based row index of the first row where report_id matches, or 0 if not found.
 */
function findRowByReportId_(sheet, reportId) {
  if (!reportId) return 0;
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  var cols = getHeaderMap_(sheet);
  var col = cols.idx.report_id;
  if (!col) return 0;

  var numRows = lastRow - 1;
  var data = sheet.getRange(2, col, numRows, 1).getValues();
  for (var r = 0; r < data.length; r++) {
    if (String(data[r][0] || "").trim() === String(reportId).trim()) return r + 2;
  }
  return 0;
}

/**
 * Increments the views count for the given 1-based row index.
 */
function incrementReportViews_(sheet, rowIndex) {
  if (rowIndex < 2) return;

  var lock = LockService.getDocumentLock();
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

/**
 * Updates specific columns of an existing row. rowIndex is 1-based; updates is { colName: value }.
 */
function updateSubmissionRow_(sheet, rowIndex, updates) {
  if (rowIndex < 2) return;
  if (!updates || Object.keys(updates).length === 0) return;

  var cols = getHeaderMap_(sheet);
  var width = cols.width;

  var rowRange = sheet.getRange(rowIndex, 1, 1, width);
  var row = rowRange.getValues()[0];

  Object.keys(updates).forEach(function(colName) {
    var col = cols.idx[colName];
    if (!col) return;
    var val = updates[colName];
    if (val === undefined) return;
    row[col - 1] = val;
  });

  rowRange.setValues([row]);
}

function logReportDraftError_(payload, errorText) {
  var sheet = getSubmissionSheet_();
  var ts = new Date();
  var sessionId = payload.sessionId || "";
  var email = payload.email || "";
  var existingRow = findRowBySessionId_(sheet, sessionId);
  if (existingRow <= 0 && email) {
    existingRow = findLatestRowByEmail_(sheet, email);
  }
  if (existingRow > 0) {
    updateSubmissionRow_(sheet, existingRow, {
      email: email,
      report_status: "ERROR",
      last_error: errorText || "Unknown draft report error",
      updated_at: ts
    });
    return;
  }
  appendSubmissionRow_(sheet, {
    timestamp: ts,
    session_id: sessionId,
    email: payload.email || "",
    answers_json: JSON.stringify(payload.answers || {}),
    result_json: "",
    utm_json: JSON.stringify(payload.utm || {}),
    user_agent: (payload.meta && payload.meta.userAgent) ? payload.meta.userAgent : "",
    referrer: (payload.meta && payload.meta.referrer) ? payload.meta.referrer : "",
    report_status: "ERROR",
    report_id: "",
    report_token: "",
    report_draft_md: "",
    product_url: getPayloadProductUrl_(payload),
    product_context: "",
    report_final_html: "",
    report_url: "",
    views: 0,
    last_error: errorText || "Unknown draft report error",
    updated_at: ts
  });
}

function arrayOrEmpty_(value) {
  return Array.isArray(value) ? value : [];
}

function labelOrSelf_(map, value) {
  if (!value) return "";
  return map[value] || String(value);
}

function extractDomain_(url) {
  var m = String(url).match(/^https?:\/\/([^\/?#]+)/i);
  return m && m[1] ? m[1].toLowerCase() : "";
}

function firstMatch_(text, regex) {
  if (!text) return "";
  var m = text.match(regex);
  return m && m[1] ? m[1] : "";
}

function extractMetaContent_(html, keys) {
  var src = String(html || "");
  var keyList = Array.isArray(keys) ? keys : [];
  if (!src || keyList.length === 0) return "";

  for (var i = 0; i < keyList.length; i++) {
    var key = escapeRegExp_(String(keyList[i] || "").trim());
    if (!key) continue;

    // <meta name="x" content="..."> (or property/itemprop)
    var r1 = new RegExp("<meta[^>]*(?:name|property|itemprop)\\s*=\\s*['\"]" + key + "['\"][^>]*content\\s*=\\s*['\"]([\\s\\S]*?)['\"][^>]*>", "i");
    var m1 = src.match(r1);
    if (m1 && m1[1]) return m1[1];

    // <meta content="..." name="x">
    var r2 = new RegExp("<meta[^>]*content\\s*=\\s*['\"]([\\s\\S]*?)['\"][^>]*(?:name|property|itemprop)\\s*=\\s*['\"]" + key + "['\"][^>]*>", "i");
    var m2 = src.match(r2);
    if (m2 && m2[1]) return m2[1];
  }
  return "";
}

function escapeRegExp_(s) {
  return String(s || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripHtml_(text) {
  var s = String(text || "");
  s = s.replace(/<[^>]*>/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  if (s.length > 500) return s.slice(0, 500) + "...";
  return s;
}
