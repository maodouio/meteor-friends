Meteor.methods({
  follow: function(followingId) {
    userId = Meteor.userId();
    result = Friends.findOne({userId: userId, followingId: followingId});
    if (result) {
      Friends.update(result._id, {$set:{status: true, updatedAt: new Date()}});
    } else {
      Friends.insert({
        userId: userId,
        followingId: followingId,
        createdAt: new Date(),
        status: true
      });
    }
  },
  unfollow: function(followingId) {
    userId = Meteor.userId();
    result = Friends.findOne({userId: userId, followingId: followingId});
    if (result) {
      Friends.update(result._id, {$set:{updatedAt: new Date(), status: false}});
    }
  },
  isfollowing: function(userId, followingId) {
    result = Friends.findOne({userId: userId, followingId: followingId});
    if (result) {
      return result.status;
    } else {
      return false;
    }
  }
});
