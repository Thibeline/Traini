Template.timer.helpers({

	showTimer: function(id) {
		var user_timer = Meteor.users.findOne({"_id":id}, {fields: {'runningTimer':1}});
		

		if (user_timer.runningTimer && duration(user_timer) > 0){

			var time_lenght = duration(user_timer);

			if (window['countdown'+id]){
				var time_left = window['countdown'+id].get();

					if (time_left != time_lenght ) {

						var remain_time = window['countdown'+id].get();

						window['countdown'+id].remove(remain_time);

						window['countdown'+id].add(time_lenght);
					};

			} else {

				window['countdown'+id] = new ReactiveCountdown(time_lenght);
				window['countdown'+id].start(function(){

				});
			};

			var time = window['countdown'+id].get();
	    	if (time) {
		    	var ss = time%60;
		    	var mm = Math.floor(time/60);
		    	var result = mm +'m' + ss + 's';
	    	};



    } else {

    	var result = "no running timer";
 
    };
    	return result;		

	}


});