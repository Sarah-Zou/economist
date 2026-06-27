/**
 * Diagnostic Note form — google-apps-script-entry-offer.gs
 * Endpoint: NEXT_PUBLIC_PRICING_SESSION_FORM_URL
 *
 * Column layout:
 *  A  Timestamp
 *  B  Name
 *  C  Email
 *  D  Company / website
 *  E  Pricing page URL
 *  F  Message (what they're working through)
 *  G  Stage
 *  H  Category
 *  I  Newsletter opt-in   ("yes" | "")
 *  J  Status              NEW → Replied
 *  K  Notes
 */

const CONFIG = {
  SHEET_NAME:   'diagnostic_note_requests',
  FROM_EMAIL:   'hello@sarahzou.com',
  FROM_NAME:    'Sarah Zou',
  NOTIFY_EMAIL: 'sarah@sarahzou.com',
};

// ─────────────────────────────────────────────────────────────
// RECEIVE FROM WEBSITE
// ─────────────────────────────────────────────────────────────
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const p = normalizeParams_(e);
    validateRequired_(p);

    const sheet = getSheet_();
    ensureHeaderRow_(sheet);

    sheet.appendRow([
      new Date(),           // A
      p.name,               // B
      p.email,              // C
      p.company,            // D
      p.pricing_url,        // E
      p.message,            // F
      p.stage,              // G
      p.category,           // H
      p.newsletter_opt_in,  // I
      'NEW',                // J: Status
      '',                   // K: Notes
    ]);

    sendInternalNotification_(p);
    sendConfirmation_(p);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('doPost error: ' + err);
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput('diagnostic note web app is live')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ─────────────────────────────────────────────────────────────
// SHEET HELPERS
// ─────────────────────────────────────────────────────────────
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }
  return sheet;
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 11).setValues([[
      'timestamp', 'name', 'email', 'company', 'pricing_url',
      'message', 'stage', 'category', 'newsletter_opt_in', 'status', 'notes',
    ]]);
    sheet.setFrozenRows(1);
  }
}

// ─────────────────────────────────────────────────────────────
// PARAM PARSING
// ─────────────────────────────────────────────────────────────
function normalizeParams_(e) {
  // Merge query-string and POST body so HTML form posts work correctly.
  const fromQuery = (e && e.parameter) ? e.parameter : {};
  let fromBody = {};

  if (e && e.postData && e.postData.contents) {
    const raw = e.postData.contents.toString();
    raw.split('&').forEach(function (pair) {
      const i = pair.indexOf('=');
      if (i === -1) return;
      const key = decodeURIComponent(pair.slice(0, i).replace(/\+/g, ' '));
      const val = decodeURIComponent(pair.slice(i + 1).replace(/\+/g, ' '));
      fromBody[key] = val;
    });
  }

  const raw = Object.assign({}, fromQuery, fromBody);

  return {
    name:              clean_(raw.name),
    email:             clean_(raw.email),
    company:           clean_(raw.company),
    pricing_url:       clean_(raw.pricing_url),
    message:           clean_(raw.message),
    stage:             clean_(raw.stage),
    category:          clean_(raw.category),
    newsletter_opt_in: clean_(raw.newsletter_opt_in),
  };
}

function validateRequired_(p) {
  const missing = [];
  if (!p.name)    missing.push('name');
  if (!p.email)   missing.push('email');
  if (!p.company) missing.push('company');
  if (!p.message) missing.push('message');
  if (missing.length) throw new Error('Missing required fields: ' + missing.join(', '));
  if (!/@/.test(p.email)) throw new Error('Invalid email address.');
}

function clean_(value) {
  return (value || '').toString().trim();
}

// ─────────────────────────────────────────────────────────────
// EMAILS
// ─────────────────────────────────────────────────────────────

// Internal notification to Sarah — fires immediately on every submission.
function sendInternalNotification_(p) {
  const lines = [
    'New diagnostic note request.',
    '',
    'Name:         ' + p.name,
    'Email:        ' + p.email,
    'Company:      ' + p.company,
    'Pricing page: ' + (p.pricing_url || '(not provided)'),
    'Stage:        ' + (p.stage    || '(not provided)'),
    'Category:     ' + (p.category || '(not provided)'),
    'Newsletter:   ' + (p.newsletter_opt_in === 'yes' ? 'Yes' : 'No'),
    '',
    'What they are working through:',
    p.message,
  ];

  GmailApp.sendEmail(
    CONFIG.NOTIFY_EMAIL,
    'New diagnostic note request — ' + p.name,
    lines.join('\n'),
    { from: CONFIG.FROM_EMAIL, name: CONFIG.FROM_NAME, replyTo: CONFIG.FROM_EMAIL }
  );
}

// Confirmation to the submitter — fires immediately on every submission.
function sendConfirmation_(p) {
  const firstName = p.name ? p.name.split(' ')[0].trim() : 'there';
  const companyLine = p.company ? ' (' + p.company + ')' : '';

  const body = `Hi ${firstName},

Thanks for the request${companyLine} — I'll review your pricing and send a one-page note within 1–2 business days.

Here's what I'll cover:
- The specific gap I see in your pricing or packaging
- A pattern from comparable infrastructure companies
- One concrete thing you can do this week

If your pricing page is publicly available, I'll reference it directly — otherwise I'll work from what you've shared.

I'll be in touch shortly.

— Sarah`;

  GmailApp.sendEmail(
    p.email,
    'Re: Free pricing diagnostic note — ' + firstName,
    body,
    { from: CONFIG.FROM_EMAIL, name: CONFIG.FROM_NAME, replyTo: CONFIG.FROM_EMAIL }
  );
}
