Template.navbar.helpers({
	asking_friend : function() {
		var current_user_id = Meteor.userId();
		if (current_user_id) {
			
			var current_user = Meteor.users.findOne({_id:current_user_id});
			var array_demand = current_user.friends_demand;
			var test = array_demand.length;
			if (test>0) {
			
				return "-plus";
			}
		} else {
				return " hide";
		}
	}
})