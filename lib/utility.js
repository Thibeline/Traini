 duration = function(user_timer) {

	var timer_end = user_timer.runningTimer.timerEnd;
	var current_date = new Date().getTime();
	var duration = (timer_end-current_date)/1000;
	var duration = parseInt(duration);

	return duration;

};

 start_countdown = function(time) {
 	
 	var current_user_id=Meteor.userId();
 	var ping = [];
	Meteor.users.update({"_id":current_user_id},{$set:{'ping': ping}});
	countdown.stop();
	countdown.start(function() {

	Meteor.users.update({"_id": current_user_id},{$unset:{'runningTimer':""}});

	});

	var remain_time = countdown.get();

	countdown.remove(remain_time);

	countdown.add(time);
};

fn_show_ping = function() {
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
			time: time,
			id : id
		};

		show_ping.push(ping);
	});

	return show_ping;
};

followed_friends = function(fav) {
	var user_id = Meteor.userId();
	if (user_id) {
		var user = Meteor.users.findOne({"_id": user_id},);

	var friends = user.friends;
	var array_followed_friends = [];
	
	friends.forEach(function (value) {
		if (value.followed == true && value.fav == fav) {
			array_followed_friends.push(value.id);
		}
	});

	var followed_friends = Meteor.users.find({
				"_id": {$in :array_followed_friends}
			},{sort:{"friends.$.fav": 1}
		});
		
	return followed_friends;

	}
};