var express = require('express')
var config = require('../config')
var app =  express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  console.log('req.body', req.body)
  res.render('index')
})

app.use('/post', (req, res) => {
  console.log('req.body', req.body)
  res.send('thanks')
})

app.set('view engine', 'ejs')
app.set('views', 'public')
app.use(express.static(config.public))


module.exports = app
