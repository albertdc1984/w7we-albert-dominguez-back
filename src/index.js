require("dotenv").config();
const chalk = require("chalk");
const express = require("express");
const debug = require("debug")("social:");
const cors = require("cors");
const databaseConnect = require("./database");

const serverUp = require("./server");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;
const mongoConnection = process.env.MONGO_STRING;

(async () => {
  try {
    await databaseConnect(mongoConnection);
    await serverUp(app, port);
  } catch (error) {
    debug(chalk.bgRed.white(error.message));
  }
})();
