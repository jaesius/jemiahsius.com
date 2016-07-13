var Mailgun = require('mailgun').Mailgun;
var mg = new Mailgun('key-e5b0d70d112144d49d65207ebbb45694');

mg.sendText('email@jemiahsius.com',
         'jaesius@me.com',
         'Mailgun Email',
         'Body copy goes here.',
         function(err) { err && console.log(err) });
