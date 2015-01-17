module.exports = {

    models: {
	    connection: 'mongolab',
      	migrate: 'safe'
    },

    port: process.env.PORT || 80,

    // log: {
    //   level: "silent"
    // }

};