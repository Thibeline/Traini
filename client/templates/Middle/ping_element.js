Template.pingElement.events({
	'click #delete_ping' : function (e,t) {
		e.preventDefault();
		var id = t.data.id;
		
		Meteor.call('delete_ping', id);
	}
})