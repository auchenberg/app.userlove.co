module.exports = {

    explicitHost: 'dev.userlove.co',

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