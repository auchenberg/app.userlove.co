var _ = require('lodash');

module.exports = {

    create: function(req, res) {

        Campaign.getByEmbedToken(req.param('token')).spread(function(campaign) {

            var model = {
                comment: req.param('comment'),
                value: req.param('score'),
                campaign: campaign
            };

            Score.create(model).exec(function(err, model) {
                if (err) {
                    return console.log(err);
                } else {
                    res.json({
                        status: 'ok'
                    });
                }
            });

        });

    },

    show: function(req, res) {

        Campaign.getByEmbedToken(req.param('token'))
            .spread(function(model) {

                res.locals.layout = 'layouts/embed';
                res.view('campaign_embed/show', {
                    campaign: model
                });

            })
            .fail(function(err) {
                res.send(404);
            });
    }

};