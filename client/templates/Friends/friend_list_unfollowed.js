Template.friendListUnfollowed.events({
	'submit' :function(e, t) {
// to put an unfollowed friend in the follow list.
		e.preventDefault();

		var friend_id = t.data._id;
		

		Meteor.call('followFriend', friend_id, function(error, result){
			if (error){
				throw error;
			}
		});

	}
});

