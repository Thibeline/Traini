Template.timers.helpers({
	timer : function(){
		var current_user_id = Meteor.userId();
		var user = Meteor.users.findOne({"_id":current_user_id});
		var timer=user.timer;
		return timer;
	}
});

Template.timers.events({
	'submit #add_timer': function(e) {
		e.preventDefault();
		
		var new_time= $(e.target).find('[name=new_time]').val();
		new_time = parseInt(new_time, 10);

		Meteor.call('addTimer', new_time, function(error,result){
			if (error){
				throw error
			}
		})

	},

	'click #del_timer' : function(e) {
		e.preventDefault();

		var old_time =document.getElementById("time").value;
		old_time = parseInt(old_time,10);

		Meteor.call('deleteTimer', old_time, function(error,result){
			if (error){
				throw error
			}
		})

	}

});