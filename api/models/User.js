var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		email: {
			type: 'email',
			required: true,
			unique: true
		},
		first_name: {
			type: 'string',
			required: true
		},
		last_name: {
			type: 'string',
			required: true
		},		
		message_count: {
			type: 'number'
		},
		campaigns: {
			collection: 'Campaign',
			via: 'user'
		},
		passports : { 
			collection: 'Passport', 
			via: 'user' 
		}
	},

	getAll: function() {
		return User.find()
		.then(function (models) {
			return [models];
		});
	},

	getOne: function(id) {
		return User.findOne(id)
		.then(function (model) {
			return [model];
		});
	}
};