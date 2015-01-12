angular.module('models.campaign', ['lodash', 'services', 'ngSails',])

.service('CampaignModel', function($q, lodash, utils, $sails) {
	this.getAll = function() {
		var deferred = $q.defer();
		var url = utils.prepareUrl('campaign');

		$sails.get(url, function(models) {
			return deferred.resolve(models);
		});

		return deferred.promise;
	};

	this.create = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('campaign');

		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};

	this.delete = function(model) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('campaign/' + model.id);

		$sails.delete(url, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
});