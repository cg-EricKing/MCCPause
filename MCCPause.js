// Script to pause campaigns that have ended and remove any labels attached to them

// Need to find a way to check if the end date has passed today's date
    // Grab the end date from the campaign - put it in spreadsheet
    // If no end date = notify

// Spreadsheet failsafe to show paused campaigns
  // Order by Account Name, Campaign Name, End Date, Paused(YES), Paused Date
  // Conditional is spreadsheet to compare paused date to the end date (paused should be after end date)

// Main function
function main() {
    // Init spreadsheet
    var spreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1NU90k25dxxyq9XeMtMxVMob6sDben4dQGZH563naeJo/edit?usp=sharing");
    var sheet = spreadsheet.getSheets()[0];

    // Select Account
    var accountSelector = MccApp
        .accounts()
        .withCondition("LabelNames CONTAINS 'iHeart-JUN18'")
        .withLimit(50);

    var accountIterator = accountSelector.get();

    while(accountIterator.hasNext()) {
      var account = accountIterator.next();
      var accountName = account.getName();
      // Select Current Account MCC
        MccApp.select(account);

      // Select Campaign
      // Check if enabled
      var campaignSelector = AdWordsApp
        .campaigns()
        .withCondition("Status = ENABLED");

      var campaignIterator = campaignSelector.get();
      while(campaignIterator.hasNext()) {
        var campaign = campaignIterator.next();
        var campaignName = campaign.getName();
        // Get Today's Date
        var today = new Date();
        var todayDate = Utilities.formatDate(today, "EDT",'MM-dd-yyyy');
        // Grab End Date
        var dateObjMonth = campaign.getEndDate().month -1;
        var dateObjDay = campaign.getEndDate().day + 1;
        var dateObjYear = campaign.getEndDate().year;
        var endDate = new Date(dateObjYear, dateObjMonth, dateObjDay);
        var endDateString = Utilities.formatDate(endDate, "EDT", 'MM-dd-yyyy');
        var paused = true;
        Logger.log("Account Name: " + accountName + " Campaign Name: " + campaignName + " " + "End Date: " + endDateString);
        Logger.log("Today - " + todayDate);
        // Conditional check to see if the campaign is running or passed
        if(endDate < today) {
          // Pause if passed
          campaign.pause();
          // Remove labels
          Logger.log("Date has passed - campaign paused");
          // Add to spreadsheet
          sheet.appendRow([
            accountName,
            campaignName,
            endDateString,
            paused,
            todayDate
          ]);
        } else {
          // Else do nothing
          paused = false;
          Logger.log("Campaign still running - don't pause")
        }
      }
    }
}

