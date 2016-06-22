Template.timerElement.events({
	
//Start a timer by creating the well time variable and inject in the methode startTime
//After that start the countdown on the client side.
	'submit #start_timer': function(e,t) {
		e.preventDefault();
		
		var current_user_id = Meteor.userId();
		var user = Meteor.users.findOne({"_id": current_user_id});
		var ping = user.ping;
		var test = ping.length;
		if (test > 0) {
			var confirm = window.confirm("Are you sure you want to start a new timer? It will delete all your current ping.");
				if (!confirm) {
					return
				};
		};

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

		var current_user_id = Meteor.userId();
		var user = Meteor.users.findOne({"_id": current_user_id});
		var ping = user.ping;
		var test = ping.length;
		if (test > 0) {
			var confirm = window.confirm("Are you sure you want to start a new timer? It will delete all your current ping.");
				if (!confirm) {
					return
				};
		};

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