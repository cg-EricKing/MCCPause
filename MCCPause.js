// Script to pause campaigns that have ended and remove any labels attached to them

// Need to find a way to check if the end date has passed today's date
    // Have the Today() method in a spreadsheet
    // Grab the end date from the campaign - put it in spreadsheet
    // If no end date = notify
    // Subtract end date from today - if < 0 pause campaign and remove any labels attached


// Main function
function main() {
    // Init spreadsheet
    var spreadsheet = SpreadsheetApp.openByUrl("");
    var sheet = spreadsheet.getSheets()[0];

    // Save End Date Spreadsheet Range
    var endDateSS = sheet.getRange(1,2);

    // Select Account
    var accountSelector = MccApp
        .accounts()
        .withCondition("LabelNames CONTAINS 'iHeart'")
        .withLimit(50);

    var accountIterator = accountSelector.get();

    while(accountIterator.hasNext()) {
        // Select Current Account MCC
        MccApp.select(account);

        // Select Campaign
            // Check if enabled
            // Grab End Date

        // Conditional check to see if the campaign is running or passed
            // Pause if passed
            // Remove labels
            // Else do nothing
    }

    

    





}


