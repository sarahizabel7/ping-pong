const app = require('./src/config/app');
const db = require('./src/config/database');
const environment = require('./src/config/environment');

db.on('error', console.error);
db.once('open', () => {
  console.log('Connected at MongoDB.');
  const port = environment.server.port;

  app.listen(port, function() {
    console.log(`api listening on port ${port}`);
  });
});