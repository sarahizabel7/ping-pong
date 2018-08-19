const http = require('http');
const prompt = require('prompt');
const apiHandler = require('./apiHandler');

http.createServer().listen(process.env.SERVER_PORT || 8080);

startRobot = async () => {
  try {
    let { number_of_req, number_of_lots } = await getParamsFromPrompt();
    await sendRequestsInLots(number_of_req, number_of_lots);
    let numberOfPings = await getNumberOfPings();
    comparePingsAndRequests(number_of_req, numberOfPings);
    checkRestart();
  } catch(err) {
    console.log(err.toString());
  }
};

getParamsFromPrompt = () => {
  return new Promise((resolve, reject) => {
    prompt.start();
    console.log('Hello, i am Mr Robot!');
    prompt.get(['number_of_req', 'number_of_lots'], (err, result) => {
      if(err) return reject(err);
      if(Number(result.number_of_req) < 10000 || isNaN(Number(result.number_of_req))) {
        result.number_of_req = 10000;
        console.log('Number of request out of range, setted automatically to 10000.');
      }
      if(Number(result.number_of_lots) < 3 || isNaN(Number(result.number_of_lots))) {
        result.number_of_lots = 3;
        console.log('Number of lots out of range, setted automatically to 3.');
      }
      resolve(result);
    });
  });
};

sendRequestsInLots = (numberOfRequests, numberOfLots) => {
  return new Promise(async (resolve, reject) => {
    try {
      let initialTime = new Date().getTime();
      await apiHandler.requestApiInLots(numberOfRequests, numberOfLots);
      let finalTime = new Date().getTime();
      let seconds = (finalTime - initialTime) / 1000;
      console.log(`finished in ${seconds} seconds.`);
      resolve();
    } catch(err) {
      reject(err);
    }
  });
};  

getNumberOfPings = () => {
  return apiHandler.getNumberOfPings();
};  

comparePingsAndRequests = (numberOfRequests, numberOfPings) => {
  console.log(`Number of requests: ${numberOfRequests}`);
  console.log(`Number of pings from API: ${numberOfPings}`);
  return;
};

checkRestart = () => {
  let promptQuestion = {
    properties: {
      clearData: {
        description: 'Run again and clear data? Type 1 for yes, anything else for no'
      }
    }
  };
  prompt.get(promptQuestion, (err, { clearData }) => {
    if(err) return console.log(err.toString());
    if(clearData === '1') return clearDataAndRestartRobot();
    process.exit();
  });
};

clearDataAndRestartRobot = async () => {
  try {
    await apiHandler.deletePings();
    startRobot();
  } catch(err) {
    console.log(err.toString());
  }
};

startRobot();