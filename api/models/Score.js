module.exports = {
	attributes: {
		value: {
			type: 'string',
			required: true
		},	
		comment: {
			type: 'string'
		},
		metadata: {
			type: 'string'
		},					
		campaign: {
			model: 'campaign'
		}
	}
};
