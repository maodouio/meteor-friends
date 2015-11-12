Template.friendsIndex.events({
  'click #add-friend': function(){
    let friendId = $('#friend-id').val();
    Meteor.call('follow', friendId, function(err, res){
      if(err){
        alert('add friend failed. ' + err.message);
      }else{
        alert('add friend successful');
      }
    });
  },
  'click .delete-friend': function(){
    let friendId = this.followingId;
    Meteor.call('unfollow', friendId, function(err, res){
      if(err){
        alert('unfollow friend failed. ' + err.message);
      }else{
        alert('unfollow friend successful');
      }
    });
  },
  'mouseenter .primary': function(event){
    $(event.target).animate({height: 260}, 100, function() {});
  },
  'mouseleave .primary': function(event){
    $(event.target).animate({height: 80}, 100, function() {});
  }
});
