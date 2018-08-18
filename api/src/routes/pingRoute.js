const controller = require('../controllers/pingController');

module.exports = app => {
  
  app.post('/ping', controller.registerPing);
  app.get('/pong/total', controller.getTotalPings); 

};