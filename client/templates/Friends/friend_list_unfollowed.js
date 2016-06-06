Template.friendListUnfollowed.events({
	'submit' :function(e, t) {
		e.preventDefault();

		var friend_id = t.data._id;
		var current_user_id = Meteor.userId();
		var friend_add = {
			id:friend_id,
			followed: true
		}

		var friend_remove = {
			id:friend_id,
			followed: false
		}
		
		Meteor.users.update({_id: current_user_id},{$push:{friends:friend_add}});
		Meteor.users.update({_id: current_user_id},{$pull:{friends:friend_remove}})

	}
});