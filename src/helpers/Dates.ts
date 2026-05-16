const currentDate = new Date(
  new Date().getTime() - new Date().getTimezoneOffset() * 60000
)
  .toISOString()
  .split("T")[0];

// Get yesterday's date
const yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
const yesterdayStr = yesterdayDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD

// Get the date for seven days ago
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
const sevenDaysAgoStr = sevenDaysAgo.toISOString().split("T")[0]; // Format: YYYY-MM-DD

// Get the date for thirty days ago
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split("T")[0]; // Format: YYYY-MM-DD


// Exporting the formatted dates
export {
  currentDate,
  yesterdayStr,
  sevenDaysAgo,
  thirtyDaysAgo,
  sevenDaysAgoStr,
  thirtyDaysAgoStr,
};
