// ***************************************************************
// ROUTES (Friends)
// ***************************************************************

let friendsController = RouteController.extend({
  onBeforeAction: function () {
    if (!ReactionCore.hasPermission('account/profile')) {
      this.render("layoutHeader", {
        to: "layoutHeader"
      });
      this.render("layoutFooter", {
        to: "layoutFooter"
      });
      this.render("unauthorized");
    } else {
      this.next();
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
    controller: friendsController,
    template: 'friendShow',
    path: '/friends/:_id',
    data: function () {
      return {
        isModal: false
      };
    }
  });

  this.route('friendNew', {
    controller: friendsController,
    template: 'friendNew',
    path: '/friendNew'
  });
});
