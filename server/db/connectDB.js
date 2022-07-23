const mongoose = require('mongoose')

const conn = mongoose.connect(process.env.DATABASE_URL).then((db) => {
    console.log("Databse Connected Successfully!");
    return db;
  }).catch((error) => {
    console.log("Could not connect to database");
  });

module.exports = conn;