var campaigns = angular.module('campaigns', []);

campaigns.config(function config($stateProvider) {
	$stateProvider
		.state('campagins', {
			url: '/campaigns',
			controller: 'CampaignsCtrl',
			templateUrl: 'app/components/campaigns/index.tpl.html'
		})
		.state('campagins.new', {
			url: '/new',
			controller: 'NewCampaignCtrl',
			templateUrl: 'app/components/campaigns/new.tpl.html'
		})
		.state('campagins.show', {
			url: '/:id',
			controller: 'ShowCampaignCtrl',
			templateUrl: 'app/components/campaigns/show.tpl.html'
		});		
});

campaigns.controller('CampaignsCtrl', function MessagesController( $state, $scope, $sails, lodash, config, titleService, CampaignModel ) {
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

	CampaignModel.getAll($scope).then(function(models) {
		$scope.campaigns = models;
	});

});

campaigns.controller('NewCampaignCtrl', function MessagesController( $state, $scope, $sails, config, titleService, CampaignModel ) {
	
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

campaigns.controller('ShowCampaignCtrl', function MessagesController( $state, $stateParams, $scope, $sails, config, titleService, CampaignModel ) {
	
	$scope.currentUser = config.currentUser;

	CampaignModel.getOne($stateParams.id).then(function(model) {
		$scope.campaign = model;
		
		var url = 'https://' + window.location.host + '/campaign/embed/' + $scope.campaign.embed_token;

		$scope.embedCode = '<iframe src="' + url + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:500px;" allowTransparency="true"></iframe>'

		CampaignModel.getMetrics($stateParams.id).then(function(data) {
			
			if(data.nps) {
				$scope.npsScore = Math.round(data.nps);
			}

			if(data.counts) {
				$scope.npsProgress = {
					promoter: Math.max(Math.floor(data.counts.promoter / data.counts.total * 100), 1),
					passive: Math.max(Math.floor(data.counts.passive / data.counts.total * 100), 1),
					detractor: Math.max(Math.floor(data.counts.detractor / data.counts.total * 100), 1),
				}
			}
		});

	    titleService.setTitle($scope.campaign.title);

	});

})