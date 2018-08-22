const axios = require('axios');
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

handleLot = numberOfReqsPerLot => {
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
  return axios.post(`${baseUrl}/ping`);   
};

exports.getNumberOfPings = async () => {
    try {
      let request = await axios.get(`${baseUrl}/pong/total`); 
      return request.data.message;
    } catch(err) {
      throw err;
    }
};

exports.deletePings = () => {
  return axios.delete(`${baseUrl}/pings`);
};