Meteor.methods({

	ping: function(target_id){
		check(target_id, String);

		var date = new Date();
		var current_user_id = Meteor.userId();
		
		if (Meteor.users.findOne({_id:target_id, "ping._id":current_user_id})) {
			Meteor.users.update({_id:target_id, "ping._id":current_user_id},{$set:{"ping.$._id": current_user_id, "ping.$.time":date}});
		} else {
			Meteor.users.update({_id:target_id},{$push:{ping: {"_id": current_user_id, "time":date}}});
		};
			
	},

	delete_ping : function (ping_id) {
		check(ping_id,String);
		var current_user_id = Meteor.userId();
		var user = Meteor.users.findOne({"_id": current_user_id});
		var pings=user.ping;
		
		pings.forEach(function (value) {
			var id = value._id;
			if (id==ping_id){
				Meteor.users.update({_id:current_user_id},{$pull:{"ping": value}});
			};
		});
		
	},

	favorite_friend : function (friend_id) {
		check(friend_id, String);
		var current_user_id = Meteor.userId();
		var friend_test={
			id: friend_id,
			followed: true,
			fav:0
		};
		var test = Meteor.users.findOne({_id : current_user_id, friends : friend_test});
		if (test) {
			Meteor.users.update({_id: current_user_id, "friends.id": friend_id},{$set:{"friends.$.id": friend_id,"friend.$.followed" : true, "friends.$.fav" : 1}});
		} else {
			Meteor.users.update({_id: current_user_id, "friends.id": friend_id},{$set:{"friends.$.id": friend_id, "friend.$.followed" : true, "friends.$.fav" : 0}});
		}
	}
});