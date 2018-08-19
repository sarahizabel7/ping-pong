const request = require('request');
const baseUrl = process.env.URL_API || 'http://localhost:3000';

exports.requestApiInLots = (numberOfRequests, numberOfLots) => {
  return new Promise(resolve => {
    let requestsPerLot = Math.floor(numberOfRequests / numberOfLots);
    let missingRequests = numberOfRequests % numberOfLots;
    let listOfLots = [];
    for(let i = 0; i < numberOfLots; i++) {
      listOfLots.push(handleLot(requestsPerLot + missingRequests));
      missingRequests = 0;
    }
    resolve(Promise.all(listOfLots));
  });
};

handleLot = (numberOfReqsPerLot) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listOfRequests = [];
      for(let i = 0; i < numberOfReqsPerLot; i++) {
        listOfRequests.push(await sendPing());
      }
      resolve(Promise.all(listOfRequests));
    } catch(err) {
      reject(err);
    }
  });
};

sendPing = () => {
  return new Promise((resolve, reject) => {
    request.post(`${baseUrl}/ping`, (err, res) => {
      if(err) return reject(err);
      resolve();
    });
  });
};

exports.getNumberOfPings = () => {
  return new Promise((resolve, reject) => {
    request.get(`${baseUrl}/pong/total`, (err, res, body) => {
      if(err) return reject(err);
      let numberOfPings = JSON.parse(body).message;
      resolve(numberOfPings);
    });
  });
};

exports.deletePings = () => {
  return new Promise((resolve, reject) => {
    request.delete(`${baseUrl}/pings`, (err, res) => {
      if(err) return reject(err);
      resolve();
    });
  });
};