var express = require('express')
var config = require('../config')
var app =  express()
var bodyParser = require('body-parser')
var mailer = require("../mailgun")
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash')
var xss = require('xss')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({secret: 'keyboard cat',resave: false, saveUninitialized: true,
                 cookie: { maxAge: 60000 }}))
app.use(flash())

app.get('/', (req, res) => {
  res.render('index', { messages: req.flash('err') })
})

app.get('/thanks', (req, res) => {
  res.render('thanks', { messages: req.flash('success')} )
})

app.post('/', (req, res, next) => {
  var data = {
    name: req.body.name,
    sender: req.body.email,
    phone: req.body.phone,
    body: req.body.message
  }

  mailer(data, function(err){
    if(err){
      // console.log("Error");
      req.flash('err', err)
      res.redirect('/')
    }else{
      // console.log("Sent email");
      req.flash('success', 'Your message was sent. ')
      res.redirect('/thanks')
    }
    next()
  });

})

app.set('view engine', 'ejs')
app.set('views', 'public')
app.use(express.static(config.public))


module.exports = app
