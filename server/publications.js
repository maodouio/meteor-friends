// FRIENDS INDEX
// -------------------------------------------------------
Meteor.publish('friends', function() {
  return Friends.find();
});

// FRIEND SHOW
// -------------------------------------------------------
Meteor.publish('friend', function(id) {
  check(id, String);
  return Friends.find(id);
});
