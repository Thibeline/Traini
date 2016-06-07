Template.friendBox.events({
	'click #button_ping':function (e, t) {
		e.preventDefault();
		var id = t.data._id;
		Meteor.call('ping', id, function(error, result){
			if (error){
				throw error;
			}
		})
	}
});