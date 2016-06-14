Template.friendListElement.helpers({
	is_active:function(id){
		var target_user = Meteor.users.findOne({_id:id});
		if (target_user.status.online) {
			return "oui"
		} else {
			return "non"
		};
	}
});

Template.friendListElement.events({
	'click #delete' : function (e,t) {
		var confirm = window.confirm("Are you sure you want delete "+t.data.username+" from your friend list?");
		if (confirm) {
			var former_friend_id = t.data._id;
			Meteor.call('deleteFriend', former_friend_id, function(error, result){
				if (error) {
					return throwError (error.reason);
				}
			});
		};

	}
})