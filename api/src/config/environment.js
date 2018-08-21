module.exports = {
  server: {
    port: process.env.API_PORT || 3000 
  },
  db: { 
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/ping'
  }
};