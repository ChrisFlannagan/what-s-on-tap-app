require("./bundle-config");
var application = require("application");

// MUST CONTAIN HTTPS
global.wpurl = 'http://tests.dev';

application.start({ moduleName: "main-page" });
