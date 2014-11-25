//Application configuration
module.exports = {
	'port': 3000, //SITE SECURITY: important Don’t run as root!
	'facebookAuth' : {
		'clientID' 		: 'your-facebookapp-clientID-here',
		'clientSecret' 	: 'your-facebookapp-secret-here',
		'callbackURL' 	: '/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: '/auth/twitter/callback'
	},

	'googleAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: '/auth/google/callback'
	},

	'mongodb' : {
		'url': 'localhost',
		'name': 'test-user-data'
	},

	'ssl' : {
		key: '/config/ssl/key',
		cert: '/config/ssl/cert'
	}
};