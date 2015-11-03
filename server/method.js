Meteor.methods({
  follow: function(userId, followingId) {
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
  unfollow: function(userId, followingId) {
    result = Friends.findOne({userId: userId, followingId: followingId});
    if (result) {
      Friends.update(result._id, {$set:{updatedAt: new Date(), status: false}});
    }
  },
  isfollow: function(userId, followingId) {
    result = Friends.findOne({userId: userId, followingId: followingId});
    if (result) {
      return true;
    } else {
      return false;
    }
  }
});
