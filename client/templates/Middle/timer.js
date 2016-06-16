Template.timer.helpers({

	showTimer: function(id) {
// Show the timer of a following friend
		var user_timer = Meteor.users.findOne({"_id":id}, {fields: {'runningTimer':1}});
		
// test if there is a timer to show
		if (user_timer.runningTimer && duration(user_timer) > 0){

			var time_lenght = duration(user_timer);

// test if a coundown already exist for this friend
			if (window['countdown'+id]){
				var time_left = window['countdown'+id].get();

// test if the countdown is at the good time
					if (time_left != time_lenght ) {

						var remain_time = window['countdown'+id].get();

						window['countdown'+id].remove(remain_time);

						window['countdown'+id].add(time_lenght);
					};
// si countdown does not exist, create one in a global variable to put a variable name, the name contain the id to be unique.
			} else {

				window['countdown'+id] = new ReactiveCountdown(time_lenght);
				window['countdown'+id].start(function(){

				});
			};

			var time = window['countdown'+id].get();
	    	if (time) {
//Send the time
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