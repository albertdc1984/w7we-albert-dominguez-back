require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const debug = require("debug")("social:");

const serverUp = require("./server");

const app = express();

const port = process.env.PORT || 4000;
const mongoConnection = process.env.MONGO_STRING;

const databaseConnect = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(mongoConnection, (error) => {
      if (error) {
        reject(new Error(`Couldn't connect to the database: ${error.message}`));
        return;
      }
      debug("Connected to DB");
      resolve();
    });
  });

serverUp(app, port);
databaseConnect();
