
Meteor.methods({

	addFriend: function(email){

//To add a friend in your list
		check(email, String);
		var friend = Meteor.users.findOne({"emails.address": email});
// Check if the email exist in the database
		if (friend) {
			var new_friends_id = friend._id;
		} else {
			throw new Meteor.Error('invalid-email',"We couldn't find this email in our database.");
		};

		var current_user_id = Meteor.userId();

		var is_still_friend = Meteor.users.findOne({_id: current_user_id, "friends.id": new_friends_id});
// Ceck if your not already friend with it, else, add it
		if (is_still_friend) {
			throw new Meteor.Error('still_friend',"You'r already friend with it.")
		} else {
			var new_friends = {
				id: new_friends_id,
				followed : true,
				fav : 0
			}
			Meteor.users.update({_id: current_user_id},{$push:{friends : new_friends}});
		};

	},

	deleteFriend: function(id){
// remove the selected friend from your friend list
		check(id, String);
		
		var current_user_id = Meteor.userId();

		var former_friends = {
				id: id,
		}

		Meteor.users.update({_id: current_user_id},{$pull:{friends : former_friends}});

	},

	followFriend: function(friend_id){

		check(friend_id, String);
		var current_user_id = Meteor.userId();
		Meteor.users.update({_id: current_user_id, "friends.id": friend_id},{$set:{"friends.$.id": friend_id, "friends.$.followed" : true}});
	},

	unfollowFriend: function(friend_id){
		check(friend_id, String);
		var current_user_id = Meteor.userId();
		Meteor.users.update({_id: current_user_id, "friends.id": friend_id},{$set:{"friends.$.id": friend_id, "friends.$.followed" : false}});
	}

});