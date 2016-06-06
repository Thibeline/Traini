
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
				followed: false
			}
			Meteor.users.update({_id: current_user_id},{$push:{friends : new_friends}});
		};

	},

	deleteFriend: function(email){
		check(email, String);
		var friend = Meteor.users.findOne({"emails.address": email});
		
		if (friend) {
			var former_friends_id = friend._id;
		} else {
			throw new Meteor.Error('invalid-email',"We couldn't find this email in our database.");
		};

		var current_user_id = Meteor.userId();

		var is_still_friend = Meteor.users.findOne({_id: current_user_id, "friends.id": former_friends_id});

		if (is_still_friend) {
				var former_friends = {
				id: former_friends_id,
			}
			Meteor.users.update({_id: current_user_id},{$pull:{friends : former_friends}});
		} else {
			throw new Meteor.Error('not_friend',"You'r not friend with it.")
		}
	},

	followedFriend: function(friend_id){
		check(friend_id, String);
		var current_user_id = Meteor.userId();
		Meteor.users.update({_id: current_user_id, "friends.id": friend_id},{$set:{"friends.$.id": friend_id, "friends.$.followed" : true}});
	},

	unfollowedFriend: function(friend_id){
		check(friend_id, String);
		var current_user_id = Meteor.userId();
		Meteor.users.update({_id: current_user_id, "friends.id": friend_id},{$set:{"friends.$.id": friend_id, "friends.$.followed" : false}});
	}

});