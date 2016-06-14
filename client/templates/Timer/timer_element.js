Template.timerElement.events({
	'submit #start_timer': function(e,t) {
		e.preventDefault();

		var time = {
			time:t.data,
			busy:true
		};
		Meteor.call('startTimer',time , function(error,result){
			if (error){
				throw error
			}
		});

		var time_s = t.data *60;
		start_countdown(time_s);


	},

	'click #start' : function(e,t) {
		e.preventDefault();

		var time = {
			time:t.data,
			busy:false
		};
		Meteor.call('startTimer',time , function(error,result){
			if (error){
				throw error
			}
		});
		var time_s = t.data *60;
		start_countdown(time_s);
	},

	'click #delete' : function (e,t) {
		e.preventDefault
		var time = t.data;

		Meteor.call('deleteTimer', time, function(error,result){
			if (error){
				throw error
			}
		});
	}
});