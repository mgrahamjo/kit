const express = require('express'),
  oatServer = require('oat/server'),
  routes = require('./universal/routes'),
  app = express();

app.use(express.static('universal'));

oatServer.setViewSync('universal/app.html');

oatServer.use(routes);

app.get('/', (req, res) => {

  const html = oatServer.respond(req);

  res.send(html);

});

app.listen(8080);
