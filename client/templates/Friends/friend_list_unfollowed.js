Template.friendListUnfollowed.events({
	'submit' :function(e, t) {
		e.preventDefault();

		var friend_id = t.data._id;
		

		Meteor.call('followedFriend', friend_id, function(error, result){
			if (error){
				throw error;
			}
		});

	}
});