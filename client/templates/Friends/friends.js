Template.friends.events({
	'click #add_friend': function(e) {
// to add a friend in our list, use this email to find him.
		e.preventDefault();
		
		var email= document.getElementById("friend_email").value;
		
		Meteor.call('addFriend', email, function(error,result) {
			if (error) {
				return throwError (error.reason);
			}
			
		});
	},
});