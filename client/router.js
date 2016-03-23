// ***************************************************************
// ROUTES (Friends)
// ***************************************************************

let friendsController = RouteController.extend({
  onBeforeAction: function() {
    let user = Meteor.user();
    if (user && user.username) {
      this.next();
    } else {
      this.render("layoutHeader", {
        to: "layoutHeader"
      });
      this.render("layoutFooter", {
        to: "layoutFooter"
      });
      this.render("unauthorized");
    }
  },
  yieldTemplates: {
    layoutHeader: {
      to: "layoutHeader"
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
    path: '/friends'
  });

  this.route('friendShow', {
    name: 'friendShow',
    controller: friendsController,
    template: 'friendsIndex',
    path: '/friends/:_id',
    waitOn: function() {
      Session.set('currentFriendId', this.params._id);
      let currentFriendId = Session.get('currentFriendId') || this.params._id;
      // window.history.replaceState({}, '', '/friends/' + currentFriendId);
      Meteor.call('getFriendInfo', currentFriendId, function(err, friend) {
        if(err)
          alert('Get friend data failed!');
        else {
          Session.set('currentFriend', friend);
          ReactionCore.subsManager.subscribe('groupsMedia');
          if(friend.isfollowing) {
            $('.detail-follow-unfollow').html('Unfollow');
          } else {
            $('.detail-follow-unfollow').html('Follow');
          }
        }
      });
      ReactionCore.subsManager.subscribe("articleByAuthorId", this.params._id);
      ReactionCore.subsManager.subscribe("friends/user", this.params._id);
      // window.location.href = "/friends/" + this.params._id;
    },
    action: function () {
      Modal.show('friendShowMicroduino');
      this.render();
    }
  });

  this.route('friendNew', {
    controller: friendsController,
    template: 'friendNew',
    path: '/friendNew'
  });
});
