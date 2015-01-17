module.exports = {

    connections: {
        mongolab: {
            adapter: 'sails-mongo',
            url: process.env.MONGOLAB_URI,
            schema: true
        }
    },

    models: {
        connection: 'mongolab',
        migrate: 'safe'
    },

    port: process.env.PORT || 80,

};