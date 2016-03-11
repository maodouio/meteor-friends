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

Meteor.publish('myFriends', function () {
    return Friends.find({userId: this.userId});
});

Meteor.publish('authors', function (articleId) {
  check(articleId, Match.OptionalOrNull(String));
  let article = Articles.findOne(articleId);
  let selector = {};

  if (article) {
    selector = {
      "_id": article.authorId
    };
  }

  return Meteor.users.find(selector, {
    fields: {
      _id: 1,
      username: 1,
      emails: 1,
      profile: 1
    }
  });
});
