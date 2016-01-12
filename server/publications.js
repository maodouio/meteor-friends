// FRIENDS INDEX
// -------------------------------------------------------
Meteor.publish('friends', function () {
    return Friends.find({userId: this.userId});
});

// FRIEND SHOW
// -------------------------------------------------------
Meteor.publish('friend', function (id) {
    check(id, String);
    return Friends.find({followingId: id});
});

Meteor.publish('authors', function () {
    return Meteor.users.find({}, {fields: {_id: 1, /*services: 1,*/ username: 1, emails: 1}});
});
