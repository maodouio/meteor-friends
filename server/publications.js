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

Meteor.publish('friends/user', function (userId) {
  check(userId, Match.OptionalOrNull(String));

  return Meteor.users.find({
    _id: userId
  }, {
    fields: {
      _id: 1,
      username: 1,
      emails: 1,
      profile: 1
    }
  });
});

Meteor.publish('friends/userImage', function (userId) {
  check(userId, Match.OptionalOrNull(String));

  return Images.find({
      "metadata.ownerId": userId,
      limit: 1
  });
});

Meteor.publish("friends/users", function () {
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

Meteor.publish("friends/accounts", function () {
  let selector = {};
  let accounts = [];
  let Accounts = ReactionCore.Collections.Accounts;
  let friends = Friends.find({
    userId: this.userId,
    status: true
  }).fetch();

  if (friends.length) {
    _.each(friends, function (friend) {
      accounts.push(friend.followingId);
    });
    selector = {
      "_id": {
        $in: accounts
      }
    };
  }

  return Accounts.find(selector, {
    fields: {
      _id: 1,
      username: 1,
      emails: 1,
      profile: 1
    }
  });
});
