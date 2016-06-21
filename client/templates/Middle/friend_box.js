Template.friendBox.events({
	
	'click #button_ping':function (e, t) {
// To ping a friend, the information is stock in his side
		e.preventDefault();
		var id = t.data._id;
		var message = document.getElementById(t.data.username).value;
		if (!message) {
			message = "No message"
		}

		Meteor.call('ping', id, message, function(error, result){
			if (error){
				throw error;
			}
		})
	},

	'click #button_sync':function (e, t) {
		e.preventDefault();

//To synchronize our timer to a friend one and not be busy	
		var running_timer = t.data.runningTimer;

		if (running_timer){
			running_timer.busy = false;
			Meteor.call('syncTimer',running_timer , function(error,result){
				if (error){
					throw error
				}
			});

			var user_timer = t.data;

			var time_lenght = duration(user_timer);

			start_countdown(time_lenght);
		} else {
			throw new Meteor.Error('No timer running',"There is no timer running to synchronise you");
		}
	},

	'click #button_sync_busy':function (e, t) {
//To synchronize our timer to a friend one and be busy
		e.preventDefault();
		
		var running_timer = t.data.runningTimer;

		if (running_timer){
			running_timer.busy = true;
			Meteor.call('syncTimer',running_timer , function(error,result){
				if (error){
					throw error
				}
			});


			var user_timer = t.data;

			var time_lenght = duration(user_timer);

			start_countdown(time_lenght);

		} else {
			return new Meteor.Error('No timer running',"There is no timer running to synchronise you");

		}
	},

	'click #button_favorite' : function(e,t) {
//To make a friend favorite, favorite friend appear at the top of the list.
		e.preventDefault();

		Meteor.call('favorite_friend', t.data._id, function(error){
			if (error) {
				throw error
			}
		});

	}

});

Template.friendBox.helpers({
		ping : function(id) {
//Prevent you if you have ping a friend.
		var current_user_id = Meteor.userId();
		if (Meteor.users.findOne({_id:id, "ping._id":current_user_id})) {
			return "Running ping";
		};
	},

// To change the style of button sync if the friend did not have a timer in the moment!
	sync_background : function (id) {
		var user_timer = Meteor.users.findOne({"_id":id}, {fields: {'runningTimer':1}});
		if (user_timer.runningTimer && duration(user_timer) > 0){

			return "button_add";

		} else {
			return "button_inactive";
		};
	},

	sync_background_busy : function (id) {
		var user_timer = Meteor.users.findOne({"_id":id}, {fields: {'runningTimer':1}});
		if (user_timer.runningTimer && duration(user_timer) > 0){
			return "button_busy"
		} else {
			return "button_inactive"
		};
	},

	disabled : function (id) {
		var user_timer = Meteor.users.findOne({"_id":id}, {fields: {'runningTimer':1}});
		if (!(user_timer.runningTimer && duration(user_timer) > 0)){
			return "disabled";
		};
	},


	led : function(id) {
//To change the color of the led functiun of the activity of the people.
		var user_target =  Meteor.users.findOne({"_id":id});
		if (!user_target.status.online) {
			return "button_inactive";
		} else if (user_target.runningTimer && user_target.runningTimer.busy && duration(user_target) > 0){
				return "led_disconnect";
		} else {
			return "led_connect";
		};

	},

	is_favorite : function(id) {
// Change the color of the star in yellow if this friend is one of your favorite
		var current_user_id = Meteor.userId();
		var friend_test={
			id: id,
			followed: true,
			fav:1
		};
		var test = Meteor.users.findOne({_id : current_user_id, friends : friend_test});
		if (test) {
			return "favorite";
		} else {
			return "";
		}
	}
}); 