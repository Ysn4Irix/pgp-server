/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 17-09-2021
 * @modify date 20-06-2022
 * @desc Server entry point
 */

require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");

const index = require("./routes/index");
const middlewares = require("./helpers/middlewares");

const app = express();

app.use(logger("common"));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-eval'"],
      "font-src": ["'self'"],
      "style-src": ["'self'"],
    },
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api", index);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;