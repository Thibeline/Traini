Template.friendPanel.helpers({

	friends_demand: function  () {
		var user_id = Meteor.userId();

		if (user_id) {
			var user = Meteor.users.findOne({"_id": user_id});
		}

		var friends_demand = user.friends_demand;
		var friends_array_demand = [];

		friends_demand.forEach(function (value) {
				friends_array_demand.push(value);
		});
		
		var demand_list = Meteor.users.find({
					"_id": {$in :friends_array_demand}
				});

		return demand_list;

	},

	followed_friends: function(fav) {
		
		return followed_friends(fav);
		
	}, 
	
	unfollowed_friends: function() {

// to return the list of unfollowed friends.
// Return an array with users object.
		var user_id = Meteor.userId();

		if (user_id) {
			var user = Meteor.users.findOne({"_id": user_id});


		var friends = user.friends;
		var array_unfollowed_friends = [];
		
		friends.forEach(function (value) {
			if (value.followed == false) {
				array_unfollowed_friends.push(value.id);
			}
		});

		var unfollowed_friends = Meteor.users.find({
					"_id": {$in :array_unfollowed_friends}
				});

		return unfollowed_friends;

		}
	},

	friends_asking: function  () {
		var user_id = Meteor.userId();

		if (user_id) {
			var user = Meteor.users.findOne({"_id": user_id});
		}

		var friends_asking = user.friends_waiting;
		var friends_array_asking = [];

		friends_asking.forEach(function (value) {
				friends_array_asking.push(value);
		});

		var ask_list = Meteor.users.find({
					"_id": {$in :friends_array_asking}
				});

		return ask_list;

	}

});

Template.friendPanel.events({
	'click #add_friend':function(e) {
		e.preventDefault();
		var id = e.target.attributes[0].value;
		Meteor.call('addFriend', id ,function(error,result) {
			if (error) {
				return throwError (error.reason);
			}
		});		
	},

	'click #delete':function(e) {
		e.preventDefault();
		var id = e.target.attributes[0].value;
		Meteor.call('deleteDemand', id ,function(error,result) {
			if (error) {
				return throwError (error.reason);
			}
		});		
	},

	'click #cancel':function(e) {
		e.preventDefault();
		var id = e.target.attributes[0].value;
		Meteor.call('cancelDemand', id ,function(error,result) {
			if (error) {
				return throwError (error.reason);
			}
		});		
	}
})