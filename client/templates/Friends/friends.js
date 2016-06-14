Template.friends.events({
	'click #add_timer': function(e) {
		e.preventDefault();
		
		var email= document.getElementById("friend_email").value;
		
		Meteor.call('addFriend', email, function(error,result) {
			if (error) {
				return throwError (error.reason);
			}
			
		});
	},
});