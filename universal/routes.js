const oat = require('oat'),
  app = require('./components/app');

oat.app(route => {

  route.set('/', app);

});
