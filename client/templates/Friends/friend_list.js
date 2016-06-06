Template.friendList.helpers({

	followed_friends: function() {
		
		var user_id = Meteor.userId();

		if (user_id) {
			var user = Meteor.users.findOne({"_id": user_id});

		var friends = user.friends;
		var array_followed_friends = [];
		
		friends.forEach(function (value) {
			if (value.followed == true) {
				array_followed_friends.push(value.id);
			}
		});

		var followed_friends = Meteor.users.find({
					"_id": {$in :array_followed_friends}
				});
			
		return followed_friends;

		}
		
	
	},

	unfollowed_friends: function() {

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


