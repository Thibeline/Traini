

countdown = new ReactiveCountdown(0);




Template.myTimer.helpers({


    getCountdown: function() {
//to show our countdown

    	var current_user_id = Meteor.userId();
    	var user_timer = Meteor.users.findOne({"_id": current_user_id}, {fields: {'runningTimer':1}});

//test if a running timer exist.
    	if (user_timer.runningTimer){
	    	var time = countdown.get();

// test if countdown exist, if yes, take the time, else, create one.	    	
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

// test if we are busy
	    	if(user_timer.runningTimer.busy == true){
	    		var busy = "oui";
			} else {
				var busy = "non";
			}

			var result ={
    			exist : true,
    		 	out : busy
    		};


//Change the session value for circular countdown
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
//to delete a timer during is work.
		e.preventDefault
		countdown.stop();
		var current_user_id = Meteor.userId();
		Meteor.users.update({"_id": current_user_id},{$unset:{'runningTimer':""}});

	}
});
