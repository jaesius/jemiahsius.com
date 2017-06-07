var Mailgun = require('mailgun').Mailgun;
var xss = require('xss')
require('dotenv').config()
//var config = require('./config')

var mg = new Mailgun(process.env.MG_KEY);

function validateEmail(email){
  var valid = false;
  var at = false;
  var topLevel = false;

  var tlds = [
    '.edu',
    '.pirate',
    '.com',
  ]

  // for (tld in tlds){
  //   if(email.endsWith(tlds[tld]) ){
  //     topLevel = true
  //     break;
  //   }
  // }

  for( var i=0; i<tlds.length; i++){
    if(email.endsWith(tlds[i]) ){
      topLevel =true;
      break;
    }
  }

  if(email.includes('@')){
    at = true;
  }

  valid = at && topLevel;

  return valid;
}

function validateName(name){
  if(name){
  return true;
  }else{
  return false;
  }
}
function validatePhone(phone){
  if(phone){
  return true;
  }else{
  return false;
  }
}
function validateBody(body){
  if(body){
  return true;
  }else{
  return false;
  }
}


function validateSend(data, callback) {

  if(validateEmail(data.sender) && validatePhone(data.phone) && validateName(data.name) && validateBody(data.body)){
    var messageBody = "Name: " + data.name + "\n";
    messageBody += "Email: " + data.sender + "\n";
    messageBody += "Phone: " + data.phone + "\n";
    messageBody += "Message: " + data.body;

    mg.sendText(data.sender,
      'jaesius@me.com',
      'Contact Form Submission From JemiahSius.com',
      messageBody,
      function(err) {
        if (err) {
          callback(err.message)
        } else {
          callback(undefined)
        }
      }
    );

  } else {
    callback('Did not validate: Please try again.')
  }

}

module.exports = validateSend;
