require("dotenv").config();
require("express-async-errors");

const app = require("express")();

require("./startup/db")(app);
require("./startup/cors")(app);
require("./startup/routes")(app);
