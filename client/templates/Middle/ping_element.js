Template.pingElement.events({
	'click #delete_ping' : function (e,t) {
		e.preventDefault();
		var id = t.data.id;
		console.log(t.data);
		Meteor.call('delete_ping', id);
	},

	'mouseover #ping_element' : function(e,t) {
		e.preventDefault();
		var ping_time = t.data.time;
		var now = new Date;
		var time_dif = now - ping_time;
		var time_dif_min = Math.ceil(time_dif/60000);
		var hh = Math.floor(time_dif_min/60);
		var mm = time_dif_min%60;
		var time= hh+' h et '+mm +' min';
		Session.set('time_ping',time);
	}
});

Template.pingElement.helpers ({

	ping_time : function(){
		return Session.get('time_ping');
	}
});


