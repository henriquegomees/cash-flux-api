
const restify  = require('restify')
const mongoose = require('mongoose')
const config   = require('./config')

const server = restify.createServer()

//Middleware
server.use( restify.plugins.bodyParser() )

//Setting up the server
server.listen( config.PORT, () => {
    mongoose.connect( config.MONGO_URI, { useNewUrlParser: true } )
} )

const database = mongoose.connection

//Handling database error connection
database.on( 'error', err => console.log(err) )

//If the database is connected
database.once( 'open', () => {
    require('./routes/expenses')( server )
    require('./routes/users')( server )
    console.log( `Server running on port ${config.PORT}` )
})