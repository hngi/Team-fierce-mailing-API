const express = require("express");
const morgan = require("morgan"); //logger
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: "./.env" });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));

const mailingRouter = require("./api/routes/mailingRoutes")();

app.use("/api/v1", mailingRouter);

app.get("/", (req, res) => {
  res.send("home");
});

port = 4000;
app.listen(port, function () {
  console.log(`Listening on port ${port}...`);
});
