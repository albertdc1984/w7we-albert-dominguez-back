const bcrypt = require("bcrypt");
const debug = require("debug")("social:pass:");

(async () => {
  const encryptedPassword = await bcrypt.hash("kola", 10);
  console.log(` ${encryptedPassword}`);
})();
