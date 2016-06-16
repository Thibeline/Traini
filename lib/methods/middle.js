Meteor.methods({

	ping: function(target_id){
// To send a ping to a friend
		check(target_id, String);
// select the time when we ping
		var date = new Date();
		var current_user_id = Meteor.userId();
// Create a ping in is database or update him
		if (Meteor.users.findOne({_id:target_id, "ping._id":current_user_id})) {
			Meteor.users.update({_id:target_id, "ping._id":current_user_id},{$set:{"ping.$._id": current_user_id, "ping.$.time":date}});
		} else {
			Meteor.users.update({_id:target_id},{$push:{ping: {"_id": current_user_id, "time":date}}});
		};
			
	},

	delete_ping : function (ping_id) {
// To delete a ping
// Create the object corresponding to the ping and remove it
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
// To chnge the favorite value of a following friend
		check(friend_id, String);
		var current_user_id = Meteor.userId();
// create the object associate to the friend in our database in the case not fav
// the two first line already exist so we can conslude if we are already friend with it or not
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