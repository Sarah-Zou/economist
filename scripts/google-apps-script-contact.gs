const MY_EMAIL = "hello@sarahzou.com";

/**
 * Contact form — google-apps-script-contact.gs
 * Endpoint: NEXT_PUBLIC_GOOGLE_WEB_APP_URL
 *
 * Column layout:
 *  A  Timestamp
 *  B  Name
 *  C  Email
 *  D  Company / website
 *  E  Message
 *  F  Status   ← set to "Clean" to trigger the auto-reply below
 */

// ─────────────────────────────────────────────────────────────
// PART 1: RECEIVE FROM WEBSITE
// ─────────────────────────────────────────────────────────────
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data  = e.parameter;

  try {
    sheet.appendRow([
      new Date(),           // A: Timestamp
      data.name    || "",   // B: Name
      data.email   || "",   // C: Email
      data.company || "",   // D: Company / website
      data.message || "",   // E: Message
      "Pending",            // F: Status
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─────────────────────────────────────────────────────────────
// PART 2: TRIGGERED BY WORKSPACE STUDIO (on sheet edit)
// Attach this as an onChange or onEdit trigger.
// Mark a row's Status column (F) as "Clean" to fire a reply.
// ─────────────────────────────────────────────────────────────
function handleAutomatedChange(e) {
  const sheet   = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  const startRow = Math.max(2, lastRow - 5); // scan last 5 rows; skip header row 1
  const range    = sheet.getRange(startRow, 1, (lastRow - startRow + 1), 6);
  const values   = range.getValues();

  for (let i = 0; i < values.length; i++) {
    if (values[i][5] === "Clean") {           // Column F
      processRow(startRow + i, sheet, values[i]);
    }
  }
}

// ─────────────────────────────────────────────────────────────
// PART 3: SEND REPLY
// ─────────────────────────────────────────────────────────────
function processRow(row, sheet, rowData) {
  const name  = rowData[1] || "";   // B
  const email = rowData[2] || "";   // C

  const firstName = name ? name.split(" ")[0].trim() : "there";

  const body = `Hi ${firstName},

Thanks for reaching out — happy to help.

Before I recommend anything, I want to understand your context. If you're open to it, book a 15-minute fit check here: https://calendly.com/sarahxzou/free-consult-15-min (no prep needed).

If you don't see a good time, just reply with 2–3 time windows (and your time zone) and I'll suggest options.

If you prefer email first, reply with:
- Your website link (or your product + target customer)
- Current pricing (or what you're considering)
- What you've tried so far and/or what the goal is right now (e.g., set initial price, improve conversion, reduce churn, plan a price increase)

Either way, I'll point you to the most practical next step.

— Sarah`;

  GmailApp.sendEmail(email, `Re: Your inquiry, ${firstName}`, body, {
    from: MY_EMAIL,
    replyTo: MY_EMAIL,
  });

  sheet.getRange(row, 6).setValue("Replied");
}
