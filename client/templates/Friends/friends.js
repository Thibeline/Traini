Template.friends.events({
	'submit #add_friend': function(e) {
		e.preventDefault();
		
		var email= $(e.target).find('[name=friend_email]').val();
		
		Meteor.call('addFriend', email, function(error,result) {
			if (error) {
				return throwError (error.reason);
			}

		});
	},

	'click #del_friend' : function(e) {
		e.preventDefault();

		var email =document.getElementById("friend_username").value;
		
		Meteor.call('deleteFriend', email, function(error, result){
			if (error) {
				return throwError (error.reason);
			}
		});
	}

});