const MY_EMAIL = "hello@sarahzou.com";

/**
 * PART 1: RECEIVE FROM WEBSITE
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = e.parameter;
  
  try {
    sheet.appendRow([
      new Date(),       // A: Timestamp
      data.name,        // B: Name
      data.email,       // C: Email
      data.company,     // D: Company / website
      data.message,     // E: Message
      "Pending"         // F: Status
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * PART 2: TRIGGERED BY WORKSPACE STUDIO
 */
function handleAutomatedChange(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  const statusColumn = 9; 
  
  const startRow = Math.max(1, lastRow - 5); // Scan last 5 rows for safety
  const range = sheet.getRange(startRow, 1, (lastRow - startRow + 1), 6);
  const values = range.getValues();

  for (let i = 0; i < values.length; i++) {
    const rowStatus = values[i][5]; // index 5 = Column F
    const currentRowIndex = startRow + i;

    if (rowStatus === "Clean") {
      processRow(currentRowIndex, sheet, values[i]);
    }
  }
}

/**
 * PART 3: THE LOGIC (FIXED VARIABLE MAPPING)
 */
function processRow(row, sheet, rowData) {
  const name    = rowData[1]; // B
  const email   = rowData[2]; // C
  const company = rowData[3]; // D
  const message = rowData[4]; // E
  
  const firstName = name ? name.split(' ')[0].trim() : "there";


  // EXTERNAL REPLY (To Prospect)
  const emailBody = `Hi ${firstName},

Thanks for reaching out — happy to help.

Before I recommend anything, I want to understand your context. If you’re open to it, book a 15-minute fit check here: https://calendly.com/sarahxzou/free-consult-15-min (no prep needed).

If you don’t see a good time, just reply with 2–3 time windows (and your time zone) and I’ll suggest options.

If you prefer email first, reply with:
- Your website link (or your product + target customer)
- Current pricing (or what you’re considering)
- What you’ve tried so far and/or What’s the goal right now (e.g., set initial price, improve conversion, reduce churn, plan a price increase)?

Either way, I’ll point you to the most practical next step.

— Sarah`;

  GmailApp.sendEmail(email, `Re: Your inquiry, ${firstName}`, emailBody, {
    from: MY_EMAIL,
    replyTo: MY_EMAIL
  });

  // Update status in Column F (6)
  sheet.getRange(row, 6).setValue("Replied");
}