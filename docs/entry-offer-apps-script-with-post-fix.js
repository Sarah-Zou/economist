/**
 * Paste this entire file into your Google Apps Script project (replace all),
 * then save and redeploy: Deploy > Manage deployments > ⋮ > Edit > New version.
 *
 * Fix: getRequestParams_() reads the POST body so form submissions work (avoids 405 / missing params).
 */

const CONFIG = {
  SHEET_NAME: 'pricing_session_leads',
  FROM_EMAIL: 'hello@sarahzou.com',
  NOTIFY_EMAIL: 'sarah@sarahzou.com',
  FORM_PATH: '/consulting/entry-offer/form',
  THANK_YOU_URL: 'https://sarahzou.com/thanks/entry-offer',
  OFFER_CODE: 'pricing_strategy_session_90',
  PAGE_TITLE: '90-Minute Pricing Strategy Session'
};

function doGet(e) {
  return ContentService
    .createTextOutput('pricing session web app is live')
    .setMimeType(ContentService.MimeType.TEXT);
}

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

    sendInternalNotification_(p);
    sendLeadConfirmation_(p);

    return HtmlService.createHtmlOutput(buildRedirectHtml_(p.redirect_url));
  } catch (err) {
    console.error('doPost error: ' + err);

    return ContentService
      .createTextOutput('ERROR: ' + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
  }
}

/**
 * Merges query string (e.parameter) and POST body (e.postData.contents).
 * Required for HTML form POST so form fields are read correctly.
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
    name: firstNonEmpty_(raw.name, raw.full_name, raw.fullName),
    email: firstNonEmpty_(raw.email, raw.work_email, raw.workEmail, raw.business_email),
    product_summary: firstNonEmpty_(raw.product_summary, raw.product, raw.product_description),
    target_customer: firstNonEmpty_(raw.target_customer, raw.customer, raw.customer_type),
    current_pricing: firstNonEmpty_(raw.current_pricing, raw.pricing, raw.current_price),
    decision_type: firstNonEmpty_(raw.decision_type, raw.decision),
    uncertainty: firstNonEmpty_(raw.uncertainty, raw.current_uncertainty),
    website_url: firstNonEmpty_(raw.website_url, raw.website, raw.pricing_page, raw.link),
    deadline: firstNonEmpty_(raw.deadline, raw.timeline, raw.investor_deadline, raw.launch_deadline),

    offer: clean_(raw.offer) || CONFIG.OFFER_CODE,
    source_page: clean_(raw.source_page) || CONFIG.FORM_PATH,
    page_title: clean_(raw.page_title) || CONFIG.PAGE_TITLE,

    utm_source: clean_(raw.utm_source),
    utm_medium: clean_(raw.utm_medium),
    utm_campaign: clean_(raw.utm_campaign),
    utm_content: clean_(raw.utm_content),
    utm_term: clean_(raw.utm_term),

    redirect_url: clean_(raw.redirect_url) || CONFIG.THANK_YOU_URL
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

function firstNonEmpty_() {
  for (var i = 0; i < arguments.length; i++) {
    const v = clean_(arguments[i]);
    if (v) return v;
  }
  return '';
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

  GmailApp.sendEmail(
    CONFIG.NOTIFY_EMAIL,
    subject,
    body,
    {
      from: CONFIG.FROM_EMAIL,
      name: 'Sarah Zou',
      replyTo: CONFIG.FROM_EMAIL
    }
  );
}

function sendLeadConfirmation_(p) {
  if (!p.email) return;

  GmailApp.sendEmail(
    p.email,
    'We received your request',
    'Thanks for requesting the 90-Minute Pricing Strategy Session. I received your request and will review it before replying with next steps.',
    {
      from: CONFIG.FROM_EMAIL,
      name: 'Sarah Zou',
      replyTo: CONFIG.FROM_EMAIL,
      htmlBody:
        '<p>Thanks for requesting the <strong>90-Minute Pricing Strategy Session</strong>.</p>' +
        '<p>I received your request and will review it before replying with next steps.</p>' +
        '<p>Best,<br>Sarah Zou</p>'
    }
  );
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
          window.top.location.replace(${JSON.stringify(safeUrl)});
        </script>
      </body>
    </html>
  `;
}

function checkSenderAliases() {
  Logger.log(GmailApp.getAliases());
}
