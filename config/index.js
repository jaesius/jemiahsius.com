var path = require('path')
var configByEnv = require('./env')

var defaults = {
  public: 'public'
}

module.exports = {
  ...defaults,
  ...configByEnv
}
