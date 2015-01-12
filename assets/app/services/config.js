angular.module( 'services.config', ['lodash'])

.service('config', function(lodash) {

	// private vars here if needed

	return {
		siteName: 'UserLove',
		// no trailing slash!
		siteUrl: '/',
		apiUrl: '/api',

		currentUser: false
	};

});