Template.friendListFollowed.events({
	'submit' :function(e, t) {
//To put a followed friend in unfollow
		e.preventDefault();

		var friend_id = t.data._id;
		

		Meteor.call('unfollowFriend', friend_id, function(error, result){
			if (error){
				throw error;
			}
		});

	}
});

