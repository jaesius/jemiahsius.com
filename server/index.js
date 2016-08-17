var express = require('express')
var config = require('../config')
var app =  express()
var bodyParser = require('body-parser')
var mailer = require("../mailgun")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  console.log('req.body', req.body)
  res.render('index')
})

app.use('/post', (req, res) => {
  var data = {
    name: req.body.name,
    sender: req.body.email,
    phone: req.body.phone,
    body: req.body.message
  }
  mailer(data);
  res.render('thanks').redirect('/thanks')
})

app.set('view engine', 'ejs')
app.set('views', 'public')
app.use(express.static(config.public))


module.exports = app
