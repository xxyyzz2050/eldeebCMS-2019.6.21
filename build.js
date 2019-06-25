const config = require("./config.ts");
// remove sensetive data, then create config-sample.ts
config.firebase.apik = "";
config.db.auth = ["username", "password"];
