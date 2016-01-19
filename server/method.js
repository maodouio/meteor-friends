Meteor.methods({
    follow: function (followingId) {
        check(followingId, String);
        let userId = Meteor.userId();
        let result = Friends.findOne({userId: userId, followingId: followingId});
        if (result) {
            Friends.update(result._id, {$set: {status: true, updatedAt: new Date()}});
        } else {
            Friends.insert({
                userId: userId,
                followingId: followingId,
                followingUsername: Meteor.users.findOne(followingId).username,
                createdAt: new Date(),
                status: true
            });
        }
        ReactionCore.Collections.Accounts.update(followingId, {$inc: {followersNumber: 1}});
    },
    unfollow: function (followingId) {
        check(followingId, String);
        let userId = Meteor.userId();
        let result = Friends.findOne({userId: userId, followingId: followingId});
        if (result) {
            Friends.update(result._id, {$set: {updatedAt: new Date(), status: false}});
            ReactionCore.Collections.Accounts.update({_id: followingId, followersNumber: {$gt: 0}}, {$inc: {followersNumber: -1}});
        }
    },
    isfollowing: function (userId, followingId) {
        check(userId, String);
        check(followingId, String);
        let result = Friends.findOne({userId: userId, followingId: followingId});
        if (result) {
            return result.status;
        } else {
            return false;
        }
    }
});
