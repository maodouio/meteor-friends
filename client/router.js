// ***************************************************************
// ROUTES (Friends)
// ***************************************************************

Router.map(function() {
  this.route('friendsIndex', {
    template: 'friendsIndex',
    path: '/friends',
    waitOn: function () {
      return Meteor.subscribe('friends');
    },
    data: {
      friends: function () {
        return Friends.find({}, {sort: {createdAt: -1}});
      }
    }
  });

  this.route('friendShow', {
    template: 'friendShow',
    path: '/friends/:_id',
    waitOn: function () {
      return Meteor.subscribe('friend', this.params._id);
    },
    data: function () {
      return Friends.findOne(this.params._id);
    }
  });
});
