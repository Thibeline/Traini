// Router.configure({
// 	layoutTemplate: 'layout',

// 	waitOn: function() {

// 		if (Meteor.user()) {
// 			return [
// 			Meteor.subscribe('users'), 

// 			];
// 		}

// 		else {
// 			return "";
// 		}
// 	}
// });

Router.route('/', {
	name:"home",
	template:"layout",
	waitOn: function() {

			return [
			Meteor.subscribe('users'), 
			];
	}
});