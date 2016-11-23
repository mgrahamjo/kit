const oat = require('oat'),
  app = require('./components/app');

module.exports = oat.app(route => {

  route.set('/', app);

});
