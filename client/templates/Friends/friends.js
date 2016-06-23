Template.friends.events({
	'click #add_friend': function(e) {
// to add a friend in our list, use this email to find him.
		e.preventDefault();
		
		var username= document.getElementById("friend_username").value;
		
		Meteor.call('askFriend', username, function(error,result) {
			if (error) {
				return throwError (error.reason);
			}
			
		});
	},
});

Template.friends.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [
        {
          collection: Meteor.users,
          field: "username",
          template: Template.userPill
        }
      ]
    };
  }
});

