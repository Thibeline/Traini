Template.friendListFollowed.events({
	'submit' :function(e, t) {
		e.preventDefault();

		var friend_id = t.data._id;
		

		Meteor.call('unfollowedFriend', friend_id, function(error, result){
			if (error){
				throw error;
			}
		});

	}
});