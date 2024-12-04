const mongoose = require("mongoose");

async function connectMongoDb(url) {
  return mongoose.connect(url); // Use the passed parameter 'url'
}

module.exports = { connectMongoDb };
