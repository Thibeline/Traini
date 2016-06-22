




Template.whoPing.helpers({
	ping : function() {


	
		var current_user_id = Meteor.userId();
		var user = Meteor.users.findOne({"_id": current_user_id});
		var ping = user.ping;
		var array_ping = [];

		ping.forEach(function (value){


			var pinger = Meteor.users.findOne({"_id":value._id});
			
			var ping_element = {
				username : pinger.username,
				time : value.time,
				message : "\"" + value.message + "\"",
				id : value._id
			};
			array_ping.push(ping_element);
		})

		return array_ping;

	}


});