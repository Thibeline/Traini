

countdown = new ReactiveCountdown(0);




Template.myTimer.helpers({


    getCountdown: function() {

    	var current_user_id = Meteor.userId();
    	var user_timer = Meteor.users.findOne({"_id": current_user_id}, {fields: {'runningTimer':1}});
    	
    	if (user_timer.runningTimer){
	    	var time = countdown.get();
	    	
	    	if (time) {
	    		
		    	var ss = time%60;
		    	var mm = Math.floor(time/60);
		    	var result1 = mm +'m' + ss + 's';
	    	} else {

				var time_lenght = duration(user_timer);

				if (time_lenght < 0) {
					Meteor.users.update({"_id": current_user_id},{$unset:{'runningTimer':""}});
	    		}else{
	    			start_countdown(time_lenght);
	    		};	
	    	};

	    	if(user_timer.runningTimer.busy == true){
	    		var busy = "oui";
			} else {
				var busy = "non";
			}

			var result ={
    			exist : true,
    		 	out : "busy"
    		};



	    	var init_time_lenght = (user_timer.runningTimer.timerEnd - user_timer.runningTimer.timerStart)/1000;
	    	var percent = ((init_time_lenght-time)/init_time_lenght)*100;
    		Session.set('progressPercent',percent);
    		Session.set('timer', result1);


    	} else {

    		var result ={
    			exist : false,
    		 	out : "no running timer"
    		};
    	};
    	
    	return result;


    	
    },

});

Template.myTimer.events({
	'click #delete' : function (e) {
		e.preventDefault
		countdown.stop();
		var current_user_id = Meteor.userId();
		Meteor.users.update({"_id": current_user_id},{$unset:{'runningTimer':""}});

	}
});


 //    	var current_user_id = Meteor.userId();
 //    	var user_timer = Meteor.users.findOne({"_id": current_user_id}, {fields: {'runningTimer':1}});
	// 	    	// set the date we're counting down to

	// 	var target_date = user_timer.runningTimer.timerEnd;

	// 	console.log(target_date);
		 
	// 	// variables for time units
	// 	var days, hours, minutes, seconds;
		 
	// 	// get tag element
	// 	var countdown = document.getElementById('countdown');
		 
	// 	console.log("1  " + refreshIntervalId);
	// 	//console.log("2  " + globalId);

	// 	//clearInterval(refreshIntervalId);

	// 	// update the tag with id "countdown" every 1 second
	// 	 var refreshIntervalId = setInterval(function () {
		 
	// 	    // find the amount of "seconds" between now and target
	// 	    var current_date = new Date().getTime();
	// 	    var seconds_left = (target_date - current_date) / 1000;
		     
	// 	    minutes = parseInt(seconds_left / 60);
	// 	    seconds = parseInt(seconds_left % 60);
	// 	    console.log(minutes);

	// 	    // format countdown string + set tag value
	// 	    //countdown.innerHTML =  '<span class="minutes">'
	// 	   // + minutes + ' <b>Minutes</b></span> <span class="seconds">' + seconds + ' <b>Seconds</b></span>';  
		 
	// 	}, 1000);
			
	// 	globalId = refreshIntervalId;
	// 	console.log(globalId);
	// },