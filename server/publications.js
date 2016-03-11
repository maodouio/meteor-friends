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

Meteor.publish("friendsUsers", function () {
    let selector = {};
    let users = [this.userId];
    let friends = Friends.find({
        userId: this.userId,
        status: true
    }).fetch();

    if (friends.length) {
        _.each(friends, function (friend) {
            users.push(friend.followingId);
        });
        selector = {
            "_id": {
                $in: users
            }
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

Meteor.publish('myFriends', function () {
    return Friends.find({
      userId: this.userId,
      status: true
    });
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
