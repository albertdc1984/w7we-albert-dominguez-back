const debug = require("debug")("social:server");

const serverUp = async (app, port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`Oi! Server is up on http://localhost:${port}`);
      resolve();
    });
    server.on("error", (error) => {
      debug(`Error on server: ${error.message}`);
      reject(error);
    });
    server.on("error", (error) => {
      reject(new Error(`Error on server: ${error.message}`));
    });
  });
module.exports = serverUp;
