var Mailgun = require('mailgun').Mailgun;
var mg = new Mailgun('key-e5b0d70d112144d49d65207ebbb45694');
//var config = require('./config')


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


function validateSend(data) {
  if(validateEmail(data.sender) && validatePhone(data.phone) && validateName(data.name) && validateBody(data.body)){
    var messageBody = "Name: " + data.name + "\n";
    messageBody += "Email: " + data.sender + "\n";
    messageBody += "Phone: " + data.phone + "\n";
    messageBody += "Message: " + data.body;

    mg.sendText(data.sender,
             'jaesius@me.com',
             'Contact Form Submission From JemiahSius.com',
             messageBody,
             function(err) { err && console.log(err) });

  }

}

module.exports = validateSend;
