Template.friendList.helpers({
	
// To ordonne the list of followed friends. 
// Return an array with users object.

	followed_friends: function(fav) {
		
	return followed_friends(fav);
		
	}, 

	unfollowed_friends: function() {

// to return the list of unfollowed friends.
// Return an array with users object.
		var user_id = Meteor.userId();

		if (user_id) {
			var user = Meteor.users.findOne({"_id": user_id});

		var friends = user.friends;
		var array_unfollowed_friends = [];
		
		friends.forEach(function (value) {
			if (value.followed == false) {
				array_unfollowed_friends.push(value.id);
			}
		});

		var unfollowed_friends = Meteor.users.find({
					"_id": {$in :array_unfollowed_friends}
				});

		return unfollowed_friends;

		}
	}

});

Template.friendList.events({

// Show or hide the list of unfollowed frend.
	'click #button_unfollowed_friend_list' : function(e) {
		e.preventDefault();
		$("#unfollowed_friend_list").toggle();
	}
})

