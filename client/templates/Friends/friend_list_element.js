Template.friendListElement.helpers({
	is_active:function(id){
// Check if the friend is log in the app
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
// To delete a friend from the list

//Need a confirmation before delete, show an alert on the screen
		var confirm = window.confirm("Are you sure you want delete "+t.data.username+" from your friend list?");
		if (confirm) {
			var former_friend_id = t.data._id;
// The modification of the BDD is done in a method in friends file			
Meteor.call('deleteFriend', former_friend_id, function(error, result){
				if (error) {
					return throwError (error.reason);
				}
			});
		};

	}
})