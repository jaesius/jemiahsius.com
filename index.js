// var mongoose = require('mongoose')
var config = require('./config')
var server = require('./server')
// var db = mongoose.connection

//connect to mongo db
// mongoose.connect(config.db)
//
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
// db.once('open', function(){
//   console.log('MongoDB connection ready!')
// })

//listen on port config,port
server.listen(config.port, function(){
  console.log(`Express server started on port ${config.port} (${config.env})`)
})

module.exports = server
