const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  server: {
    port: process.env.PORT || 8082,
  },
  db: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/users",
  },
};
