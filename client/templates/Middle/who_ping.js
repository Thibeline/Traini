
var reactive_show_ping =new ReactiveVar();




Template.whoPing.helpers({
	ping : function(){

// Show who ping us
// return an array full of user's who ping us
// We need to create a reactive var to update the value whitout action from the client.
		var current_user_id = Meteor.userId();

		if (current_user_id) {
			var show_ping = fn_show_ping();


			reactive_show_ping.set(show_ping);	

			interval = Meteor.setInterval(function(){
				var current_user_id = Meteor.userId();
				if (current_user_id == null) {
					Meteor.clearInterval(interval);
				}
				var show_ping = fn_show_ping();
				reactive_show_ping.set(show_ping);
			}, 30000)

			return reactive_show_ping.get();
		}
	}


});