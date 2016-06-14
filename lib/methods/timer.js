Meteor.methods({


	addTimer:function(new_time){
		check(new_time, Number);
		var current_user_id = Meteor.userId();
		var user = Meteor.users.findOne({_id: current_user_id});
		if (new_time <= 0) {
			throw new Meteor.Error('invalid-time',"You must enter a positiv timer.");
		} else {
		if (user.timer){
			var timer = user.timer;
			timer.push(new_time);
		} else {
			var timer =[new_time];
		}

		timer.sort(function(a,b){
			return a-b;
		});

		var a = [];
		for ( i = 0; i <timer.length; i++ ) {
		    while (timer[i]==timer[i+1] || i==timer.lenght - 1){
		    	timer.splice(i,1);
		    }
		}

		Meteor.users.update({_id: current_user_id},{$set: {timer:timer}});
		}
	},

	deleteTimer:function(old_time){
		check(old_time, Number);
		var current_user_id = Meteor.userId();
		var user = Meteor.users.findOne({_id: current_user_id});

		if (user.timer) {
			var timer = user.timer;
			timer.forEach(function(el, index){
				if (el == old_time){
					timer.splice(index, 1);
					Meteor.users.update({_id: current_user_id},{$set: {timer:timer}})

				}
			});
		}
	},

	startTimer :function(time){
		check(time, Object);
		check(time.time, Number);
		check(time.busy, Boolean);
		var current_date = new Date().getTime();
		var timer_lenght = time.time * 60000;
		var timer_end = current_date + timer_lenght;
		var running_timer = {
			timerEnd: timer_end,
			timerStart : current_date,
			busy: time.busy
		};
		var current_user_id=Meteor.userId();
		Meteor.users.update({_id: current_user_id},{$set:{runningTimer:running_timer}});
		

	},

	syncTimer : function(running_timer){
		check(running_timer, Object);
		var current_user_id=Meteor.userId();
		Meteor.users.update({_id: current_user_id},{$set:{runningTimer:running_timer}});
	}



})



