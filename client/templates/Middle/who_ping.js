
var reactive_show_ping =new ReactiveVar();




Template.whoPing.helpers({
	ping : function(){
		var current_user_id = Meteor.userId();

		if (current_user_id) {
			var show_ping = fn_show_ping();


			reactive_show_ping.set(show_ping);	

			interval = Meteor.setInterval(function(){
				var show_ping = fn_show_ping();
				reactive_show_ping.set(show_ping);
			}, 30000)

			return reactive_show_ping.get();
		}
	}


});