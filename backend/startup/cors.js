const cors = require("cors");

const options = { origin: process.env.ORIGIN, optionsSuccessStatus: 200 };

module.exports = (app) => app.use(cors(options));
