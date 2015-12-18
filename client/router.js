// ***************************************************************
// ROUTES (Friends)
// ***************************************************************

let friendsController = RouteController.extend({
  onAfterAction: function () {
    //return ReactionCore.MetaData.refresh(this.route, this.params);
  },
  yieldTemplates: {
    layoutHeader: {
      to: "layoutHeader"
    },
    layoutFooter: {
      to: "layoutFooter"
    },
    dashboard: {
      to: "dashboard"
    }
  }
});

this.friendsController = friendsController;

Router.map(function() {
  this.route('friendsIndex', {
    controller: friendsController,
    template: 'friendsIndex',
    path: '/friends',
    waitOn: function () {
      return Meteor.subscribe('friends');
    },
    data: {
      followedFriends: function() {
        return Friends.find({status: true}, {sort: {createdAt: -1}});
      }
    }
  });

  this.route('friendShow', {
    controller: friendsController,
    template: 'friendShow',
    path: '/friends/:_id',
    waitOn: function () {
      return Meteor.subscribe('friend', this.params._id);
    },
    data: function () {
      return {
        isModal: false
      };
    }
  });

  this.route('friendNew', {
    controller: friendsController,
    template: 'friendNew',
    path: '/friendNew',
    waitOn: function () {
      return Meteor.subscribe('getUserList');
    },
    data: function () {
      return {
        users: Meteor.users.find()
      };
    }
  });
});
