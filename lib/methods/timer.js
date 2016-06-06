Meteor.methods({


	addTimer:function(new_time){
		check(new_time, Number);
		var current_user_id = Meteor.userId();
		var user = Meteor.users.findOne({_id: current_user_id});

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
	}


})