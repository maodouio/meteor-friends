// FRIENDS INDEX
// -------------------------------------------------------
Meteor.publish('friends', function() {
  return Friends.find();
});

// FRIEND SHOW
// -------------------------------------------------------
Meteor.publish('friend', function(id) {
  return Friends.find(id);
});
