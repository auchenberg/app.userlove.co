var bcrypt = require('bcrypt');
var hat = require('hat');

module.exports = {
	tableName: "users",
	attributes: {
		email: {
			type: 'email',
			required: true,
			unique: true
		},
		firstName: {
			type: 'string',
			required: true
		},
		lastName: {
			type: 'string',
			required: true
		},		
		activated: {
      		type: 'boolean',
      		defaultsTo: false
    	},
   		activationToken: {
      		type: 'string'
		},
		resetPassToken: {
      		type: 'string'
    	},		
    	// Collections
		campaigns: {
			collection: 'Campaign',
			via: 'user'
		},
		passports : { 
			collection: 'Passport', 
			via: 'user' 
		},    	
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
	},

	// Callbacks
  	beforeCreate: function(user, cb) {
    	user.activated = false;
    	user.activationToken =  hat();
    	user.resetPassToken = hat();

    	return cb(null, user);
  	}
};