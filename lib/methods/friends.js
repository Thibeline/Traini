
Meteor.methods({

	addFriend: function(email){
		check(email, String);
		var friend = Meteor.users.findOne({"emails.address": email});
		
		if (friend) {
			var new_friends_id = friend._id;
		} else {
			throw new Meteor.Error('invalid-email',"We couldn't find this email in our database.");
		};

		var current_user_id = Meteor.userId();

		var is_still_friend = Meteor.users.findOne({_id: current_user_id, "friends.id": new_friends_id});

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