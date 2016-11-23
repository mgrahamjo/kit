const express = require('express'),
  oatServer = require('oat/server'),
  oatApp = require('./universal/app'),
  app = express();

app.use(express.static('src/universal'));

oatServer.setViewSync('universal/app.html');

oatServer.use(oatApp);

app.get('/', (req, res) => {

  const html = oatServer.respond(req);

  res.send(html);

});

app.listen(1337);

console.log('listening on port 1337');
