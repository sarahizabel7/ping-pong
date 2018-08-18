const Ping = require('../models/pingModel');

//Retorna "pong" e contabiliza quantos pings foram enviados
exports.registerPing = (req, res) => {
  res.status(200).json({message: "pong"});
  Ping.create({title: 'ping'});
};

//Retorna o total de pings salvos no documento
exports.getTotalPings = (req, res) => {
  Ping.countDocuments({}, (err, totalPings) => {
    if(err) {
      return res.status(500).json({message: "Server Error"});
    }
    res.status(200).json({message: totalPings});
  });
};