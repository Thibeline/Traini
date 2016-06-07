Template.whoPing.helpers({
	ping : function(){
		var current_user_id = Meteor.userId();
		var user = Meteor.users.findOne({"_id":current_user_id});
		var pings=user.ping;
		var show_ping = [];

		pings.forEach(function (value) {
			var id = value._id;
			var pinger = Meteor.users.findOne({"_id": id});
			
			var ping_time = value.time;
			var now = new Date;
			var time_dif = now - ping_time;
			var time_dif_min = Math.ceil(time_dif/60000);
			var hh = Math.floor(time_dif_min/60);
			var mm = time_dif_min%60;
			var time= hh+' h et '+mm +' min'
			

			var ping = {
				username: pinger.username,
				time: time
			};
			show_ping.push(ping);
	
		});


		return show_ping
	}
});