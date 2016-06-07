Meteor.methods({

	ping: function(target_id){
		check(target_id, String);
		var date = new Date()
		var new_ping ={
			_id:Meteor.userId(),
			time : date
		}
		Meteor.users.update({_id:target_id},{$push:{"ping":new_ping}});

	}
});