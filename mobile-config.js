App.accessRule('*');
App.accessRule('http://*');
App.accessRule('https://*');
App.accessRule('http://localhost:*');
App.accessRule('data:*', { type: 'navigation' });