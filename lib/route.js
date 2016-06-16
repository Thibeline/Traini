Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate:'loading'
});

var requireLogin = function(){
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render ('notConnect');
		}
	} else {
		this.next();
	}
}


Router.route('/', {
	name:"home",
	template:"layout",
	waitOn: function() {

		return Meteor.subscribe('userData');
		
	}
});