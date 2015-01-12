angular.module('userlove.campaigns', [])

.config(function config( $stateProvider ) {
	$stateProvider
		.state('campagins', {
			url: '/campaigns',
			controller: 'CampaignsCtrl',
			templateUrl: 'campaigns/index.tpl.html'
		})
		.state('campagins.new', {
			url: '/new',
			controller: 'NewCampaignCtrl',
			templateUrl: 'campaigns/new.tpl.html'
		});
})

.controller('CampaignsCtrl', function MessagesController( $state, $scope, $sails, lodash, config, titleService, CampaignModel ) {
	titleService.setTitle('Campaigns');
	$scope.campaigns = [];
	$scope.currentUser = config.currentUser;

	$sails.on('campaign', function (envelope) {
		switch(envelope.verb) {
			case 'created':
				$scope.campaigns.unshift(envelope.data);
				break;
			case 'destroyed':
				lodash.remove($scope.campaigns, {id: envelope.id});
				break;
		}
	});

	$scope.destroyCampaign = function(message) {
		// check here if this message belongs to the currentUser
		if (message.user.id === config.currentUser.id) {
			MessageModel.delete(message).then(function(model) {
				// message has been deleted, and removed from $scope.messages
			});
		}
	};

	CampaignModel.getAll($scope).then(function(models) {
		$scope.campaigns = models;
	});

})

.controller('NewCampaignCtrl', function MessagesController( $state, $scope, $sails, config, titleService, CampaignModel ) {
	
	titleService.setTitle('Create new campaign');
	
	$scope.currentUser = config.currentUser;
	$scope.newCampaign = {};

	$scope.createCampaign = function(newCampaign) {
		newCampaign.user = config.currentUser.id;
		CampaignModel.create(newCampaign).then(function(model) {
			$scope.newCampaign = {};

			$state.transitionTo('campagins');
		});
	};


});