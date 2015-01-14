var hat = require('hat');

module.exports = {
	attributes: {
		title: {
			type: 'string',
			required: true
		},
		url: {
			type: 'string',
			required: true
		},
		embed_token: {
			type: 'string',
		},		
		user: {
			model: 'user'
		},
		scores: {
			collection: 'Score',
			via: 'campaign'
		}
	},

	/**
	* Callback to be run after creating a Campaign.
	*
	* @param {Object}   campaign The soon-to-be-created Campaign
	* @param {Function} next
	*/

	beforeCreate: function (values, next) {
		values.embed_token = hat();
		next();
	},

	afterCreate: function (campaign, next) {
		// set campaign.user = to appropriate user model
		User.getOne(campaign.user)
		.spread(function(user) {
			campaign.user = user;
			next(null, campaign);
		});
	},

	getAll: function() {
		return Campaign.find()
		// TODO: sort by createdAt DESC does not work here, something to do with a camelCase key names bug
		.sort({createdAt: 'desc'})
		.populate('user')
		.then(function (models) {
			return [models];
		});
	},

	getOne: function(id) {
		return Campaign.findOne(id)
		.populate('user')
		.populate('scores', { limit: 50 })
		.then(function (model) {
			// you have the option to do something with the model here if needed, before returning it to the controller
			return [model];
		});
	},

	getByEmbedToken: function(token) {
		return Campaign.findOne()
		.where({ embed_token: token })
		.then(function(model) {
		 	return this.getOne(model.id);
		}.bind(this));
	},

	calculateNPS: function(id) {

		return Campaign.findOne(id).populate('scores', { limit: 50 })
		.then(function (model) {

			var scores = model.scores;
	        var counts = {
	            promoter: 0,
	            detractor: 0,
	            passive: 0,
	            total: scores.length
	        };

	        scores.forEach(function(score) {
	            
	            var value = score.value;

	            if (value >= 9) {
	                counts.promoter++;
	            } else if (value >= 7 && value <= 9) {
	                counts.detractor++;
	            } else {
	                counts.passive++;
	            }

	        });

            var promoterScore = counts.promoter / counts.total * 100;
            var detractorScore = counts.detractor / counts.total * 100;
            var nps = promoterScore - detractorScore;

            return [{
            	nps: nps,
            	counts: counts
            }];

		});
	}
};
