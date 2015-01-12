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
		user: {
			model: 'user'
		}
	},

	/**
	* Callback to be run after creating a Campaign.
	*
	* @param {Object}   campaign The soon-to-be-created Campaign
	* @param {Function} next
	*/
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
		.then(function (model) {
			// you have the option to do something with the model here if needed, before returning it to the controller
			return [model];
		});
	}
};
