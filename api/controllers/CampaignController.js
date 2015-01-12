var _ = require('lodash');

module.exports = {

	getAll: function(req, res) {
		Campaign.getAll()
		.spread(function(models) {
			Campaign.watch(req);
			Campaign.subscribe(req.socket, models);

			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		Campaign.getOne(req.param('id'))
		.spread(function(model) {
			Campaign.subscribe(req.socket, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	create: function (req, res) {

		var model = {
			title: req.param('title'),
			url: req.param('url'),
			user: req.param('user')
		};

		Campaign.create(model)
		.exec(function(err, campaign) {
			if (err) {
				return res.serverError(err);
			}
			else {
				Campaign.publishCreate(campaign);
				res.json(campaign);
			}
		});
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}

		// Otherwise, find and destroy the model in question
		Campaign.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			Campaign.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				Campaign.publishDestroy(model.id);
				return res.json(model);
			});
		});
	}

};