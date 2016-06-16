Template.notConnect.helpers ({

	stop_ping: function (){
// stop the running fonction who check if your ping.

			if (interval) {
				Meteor.clearInterval(interval);
			};
	},

});