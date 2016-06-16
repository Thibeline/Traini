Meteor.publishComposite('userData', {
	find : function() {
		var current_user_id = this.userId;
		return Meteor.users.find(
			{_id:current_user_id},
			{fields : 
			{'username':1,
			 'email.adress':1,
			 'timer':1, 
			 'friends':1, 
			 'ping':1, 
			 'runningTimer':1,
			 'status' :1}});
	},
	children :[
		{
			find : function(user){ 
				var friends = user.friends;
				var array_friends = [];
				friends.forEach(function (value) {
					array_friends.push(value.id);
				});

				return Meteor.users.find(
					{"_id": {$in :array_friends}},
					{fields :
					{'username':1,
					 'email.adress':1,
					 'runningTimer':1,
					 'status':1,
					 'ping':1}});
			}
		}
	]
});
// Meteor.publish('friendData', function(){
// 	var current_user_id = this.userId;
// 	var user = Meteor.users.findOne({_id:current_user_id});
// 	var friends = user.friends;
// 	var array_friends = [];
// 	friends.forEach(function (value) {
// 		array_friends.push(value.id);
// 	});

// 	return Meteor.users.find(
// 		{"_id": {$in :array_friends}},
// 		{fields :
// 		{'username':1,
// 		 'email.adress':1,
// 		 'runningTimer':1,
// 		 'status':1,
// 		 'ping':1}});
// });
