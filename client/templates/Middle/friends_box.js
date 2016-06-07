Template.friendsBox.helpers({
	
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
		
	}
});