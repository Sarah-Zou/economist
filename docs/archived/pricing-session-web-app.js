/**
 * Google Apps Script: 90-Minute Pricing Strategy Session Web App
 *
 * This script is designed to receive standard HTML form POSTs from
 * `/consulting/entry-offer/form` and write leads into a Google Sheet,
 * send internal notifications, send a confirmation email, and then
 * redirect the browser to a thank-you page.
 *
 * If you get 405 Not Allowed:
 * - Often the form is posting to your own site because NEXT_PUBLIC_PRICING_SESSION_FORM_URL
 *   was not set at build time. Set it in .env.local and restart (and rebuild for production).
 * - In Apps Script, use getRequestParams_(e) in normalizeParams_ so POST body (form fields)
 *   is read from e.postData.contents; see getRequestParams_ below.
 *
 * Field names expected from the form:
 * - name                (required)
 * - email               (required)
 * - product_summary     (required)
 * - decision_type       (required)
 * - target_customer     (optional)
 * - current_pricing     (optional)
 * - uncertainty         (optional)
 * - website_url         (optional)
 * - deadline            (optional)
 * - offer               (hidden; optional, defaults to CONFIG.OFFER_CODE)
 * - source_page         (hidden; optional, defaults to CONFIG.FORM_PATH)
 * - page_title          (hidden; optional)
 * - utm_source          (hidden; optional)
 * - utm_medium          (hidden; optional)
 * - utm_campaign        (hidden; optional)
 * - utm_content         (hidden; optional)
 * - utm_term            (hidden; optional)
 * - redirect_url        (hidden; optional; absolute or relative)
 */

const CONFIG = {
  // REQUIRED: Paste the ID of the Google Sheet this script should write to.
  // Example Spreadsheet URL:
  //   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
  SPREADSHEET_ID: 'PASTE_YOUR_SPREADSHEET_ID_HERE',

  SHEET_NAME: 'pricing_session_leads',
  NOTIFY_EMAIL: 'hello@sarahzou.com',

  // Base site URL used for normalizing relative redirect URLs
  SITE_URL: 'https://sarahzou.com',

  // Path of the form page on the site (used as default source_page)
  FORM_PATH: '/consulting/entry-offer/form',

  // Default thank-you URL if redirect_url is missing or invalid
  THANK_YOU_URL: 'https://sarahzou.com/thanks/entry-offer',

  // Default offer code if not explicitly passed
  OFFER_CODE: 'pricing_strategy_session_90',
};

/**
 * Health check:
 * Open the deployed /exec URL directly in the browser.
 * If deployment is correct, you should see this message.
 */
function doGet(e) {
  return ContentService
    .createTextOutput('pricing session web app is live')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Form handler
 * Receives standard HTML <form method="POST" action="..."> submissions.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const p = normalizeParams_(e);
    validateRequired_(p);

    const sheet = getSheet_();
    ensureHeaderRow_(sheet);

    sheet.appendRow([
      new Date(),
      p.name,
      p.email,
      p.product_summary,
      p.target_customer,
      p.current_pricing,
      p.decision_type,
      p.uncertainty,
      p.website_url,
      p.deadline,
      p.offer,
      p.source_page,
      p.page_title,
      p.utm_source,
      p.utm_medium,
      p.utm_campaign,
      p.utm_content,
      p.utm_term,
      'NEW',
      ''
    ]);

    // Send notification to you
    sendInternalNotification_(p);

    // Send confirmation to lead
    sendLeadConfirmation_(p);

    // Redirect to thank-you page
    return HtmlService.createHtmlOutput(buildRedirectHtml_(p.redirect_url));
  } catch (err) {
    console.error('doPost error:', err);

    // Return visible error text during debugging
    return ContentService
      .createTextOutput('ERROR: ' + (err && err.message ? err.message : String(err)))
      .setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  if (!CONFIG.SPREADSHEET_ID || CONFIG.SPREADSHEET_ID === 'PASTE_YOUR_SPREADSHEET_ID_HERE') {
    throw new Error('CONFIG.SPREADSHEET_ID is not set.');
  }

  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  return sheet;
}

function ensureHeaderRow_(sheet) {
  const headers = [[
    'timestamp',
    'name',
    'email',
    'product_summary',
    'target_customer',
    'current_pricing',
    'decision_type',
    'uncertainty',
    'website_url',
    'deadline',
    'offer',
    'source_page',
    'page_title',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'status',
    'notes'
  ]];

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers[0].length).setValues(headers);
    sheet.setFrozenRows(1);
    return;
  }

  const current = sheet.getRange(1, 1, 1, headers[0].length).getValues()[0];
  const currentJoined = current.map(String).join('|');
  const headerJoined = headers[0].join('|');

  if (currentJoined !== headerJoined) {
    // Only write headers if row 1 is blank
    const isBlank = current.every(v => String(v).trim() === '');
    if (isBlank) {
      sheet.getRange(1, 1, 1, headers[0].length).setValues(headers);
      sheet.setFrozenRows(1);
    }
  }
}

/**
 * Get all request parameters: query string (e.parameter) + POST body.
 * For HTML form POST, the body is application/x-www-form-urlencoded and may not
 * be in e.parameter; parsing postData.contents avoids 405/missing-param issues.
 */
function getRequestParams_(e) {
  const fromQuery = (e && e.parameter) ? e.parameter : {};
  if (!e || !e.postData || !e.postData.contents) {
    return fromQuery;
  }
  const raw = e.postData.contents.toString();
  const fromBody = {};
  raw.split('&').forEach(function (pair) {
    const i = pair.indexOf('=');
    if (i === -1) return;
    const key = decodeURIComponent(pair.slice(0, i).replace(/\+/g, ' '));
    const val = decodeURIComponent(pair.slice(i + 1).replace(/\+/g, ' '));
    fromBody[key] = val;
  });
  return Object.assign({}, fromQuery, fromBody);
}

function normalizeParams_(e) {
  const raw = getRequestParams_(e);

  return {
    name: clean_(raw.name),
    email: clean_(raw.email),
    product_summary: clean_(raw.product_summary),
    target_customer: clean_(raw.target_customer),
    current_pricing: clean_(raw.current_pricing),
    decision_type: clean_(raw.decision_type),
    uncertainty: clean_(raw.uncertainty),
    website_url: clean_(raw.website_url),
    deadline: clean_(raw.deadline),

    offer: clean_(raw.offer) || CONFIG.OFFER_CODE,
    source_page: clean_(raw.source_page) || CONFIG.FORM_PATH,
    page_title: clean_(raw.page_title) || '90-Minute Pricing Strategy Session',

    utm_source: clean_(raw.utm_source),
    utm_medium: clean_(raw.utm_medium),
    utm_campaign: clean_(raw.utm_campaign),
    utm_content: clean_(raw.utm_content),
    utm_term: clean_(raw.utm_term),

    redirect_url: normalizeRedirectUrl_(raw.redirect_url)
  };
}

function validateRequired_(p) {
  const missing = [];

  if (!p.name) missing.push('name');
  if (!p.email) missing.push('email');
  if (!p.product_summary) missing.push('product_summary');
  if (!p.decision_type) missing.push('decision_type');

  if (missing.length) {
    throw new Error('Missing required fields: ' + missing.join(', '));
  }

  if (!/@/.test(p.email)) {
    throw new Error('Invalid email address.');
  }
}

function normalizeRedirectUrl_(value) {
  const v = clean_(value);

  if (!v) return CONFIG.THANK_YOU_URL;
  if (/^https?:\/\//i.test(v)) return v;

  // Treat as a relative path
  return CONFIG.SITE_URL + (v.startsWith('/') ? v : '/' + v);
}

function clean_(value) {
  return (value || '').toString().trim();
}

function sendInternalNotification_(p) {
  const subject = 'New request: 90-Minute Pricing Strategy Session';

  const body =
    'A new request was submitted.\n\n' +
    'Name: ' + p.name + '\n' +
    'Email: ' + p.email + '\n' +
    'Product summary: ' + p.product_summary + '\n' +
    'Target customer: ' + p.target_customer + '\n' +
    'Current pricing: ' + p.current_pricing + '\n' +
    'Decision type: ' + p.decision_type + '\n' +
    'Uncertainty: ' + p.uncertainty + '\n' +
    'Website: ' + p.website_url + '\n' +
    'Deadline: ' + p.deadline + '\n' +
    'Offer: ' + p.offer + '\n' +
    'Source page: ' + p.source_page + '\n' +
    'UTMs: ' + [p.utm_source, p.utm_medium, p.utm_campaign, p.utm_content, p.utm_term].join(' | ');

  MailApp.sendEmail({
    to: CONFIG.NOTIFY_EMAIL,
    subject: subject,
    body: body,
    replyTo: p.email,
    name: 'Sarah Zou Website'
  });
}

function sendLeadConfirmation_(p) {
  if (!p.email) return;

  MailApp.sendEmail({
    to: p.email,
    subject: 'We received your request',
    body:
      'Thanks for requesting the 90-Minute Pricing Strategy Session. ' +
      'I received your request and will review it before replying with next steps.',
    htmlBody:
      '<p>Thanks for requesting the <strong>90-Minute Pricing Strategy Session</strong>.</p>' +
      '<p>I received your request and will review it before replying with next steps.</p>' +
      '<p>Best,<br>Sarah Zou</p>',
    replyTo: CONFIG.NOTIFY_EMAIL,
    name: 'Sarah Zou'
  });
}

function buildRedirectHtml_(url) {
  const safeUrl = String(url);

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="refresh" content="0; url=${safeUrl}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Redirecting…</title>
      </head>
      <body>
        <p>Redirecting… If nothing happens, <a href="${safeUrl}">continue here</a>.</p>
        <script>
          try {
            window.top.location.replace(${JSON.stringify(safeUrl)});
          } catch (e) {
            window.location.href = ${JSON.stringify(safeUrl)};
          }
        </script>
      </body>
    </html>
  `;
}

