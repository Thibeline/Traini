Template.timers.helpers({
	timer : function(){

//Show timer in memory
		var current_user_id = Meteor.userId();
		var user = Meteor.users.findOne({"_id":current_user_id});
		var timer=user.timer;
		return timer;
	}
});

Template.timers.events({
	'click #add_timer': function(e) {

// Add a timer in memory 
// take the value in the input and send to the method addTimer
		e.preventDefault();
		
		var new_time= document.getElementById("time").value;
		if (new_time) {
			new_time = parseInt(new_time, 10);
			Meteor.call('addTimer', new_time, function(error,result){
				if (error){
					return throwError (error.reason)
				}
			})
		} else {
			return throwError ("Enter a timer");
		} 



	},

});