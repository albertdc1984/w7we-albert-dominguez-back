const bcrypt = require("bcrypt");
const debug = require("debug")("social:password")(async () => {
  const encryptedPassword = await bcrypt.hash("hola", 10);
  debug(encryptedPassword);
})();
