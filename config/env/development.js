module.exports = {

    explicitHost: 'dev.userlove.co',

    connections: {
        local: {
            adapter: 'sails-mongo',
            host: '127.0.0.1',
            user: '',
            password: '',
            database: 'userlove',
            port: 27017,
            schema: true
        }
    },

    models: {
        connection: 'local',
        migrate: 'safe'
    },

    session: {
        adapter: 'memory'
    },

    sockets: {
        adapter: 'memory'
    }

};