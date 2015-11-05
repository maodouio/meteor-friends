// Outputs e.g. 12 days ago or 2 hours ago
UI.registerHelper('showTimeAgo', function(date) {
  return !date ? "" : moment(date).fromNow();
});

// Outputs August 30th 2014, 5:33:46 pm
UI.registerHelper('showPrettyTimestamp', function(date) {
  return !date ? "" : moment(date).format("MMMM Do YYYY, h:mm:ss a")
});
