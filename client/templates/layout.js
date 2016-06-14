Template.layout.helpers ({

	stop_ping: function (){
			var current_user_id = Meteor.userId();
			if (!current_user_id && interval) {
				Meteor.clearInterval(interval);
			};
	},

});