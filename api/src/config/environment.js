let dbUser = process.env.DB_USER;
let dbPass = process.env.DB_PASS;

module.exports = {
  server: {
    port: process.env.SERVER_PORT || 3000 
  },
  db: { 
    url: dbUser && dbPass && `mongodb://${dbUser}:${dbPass}@localhost/ping` || 'mongodb://localhost/ping'
  }
};