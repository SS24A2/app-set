const express = require("express");

const config = require("../../pkg/config");
const auth = require("./handlers/auth");
const db = require("../../pkg/db");

db.init(); // Databazata e startuvana

const api = express();

api.use(express.json()); // req.body moze da bide json format

api.post("/api/v1/auth/login", auth.login);
api.post("/api/v1/auth/register", auth.register);
api.post("/api/v1/auth/refreshToken", auth.refreshToken);
api.post("/api/v1/auth/forgotPassword", auth.forgotPassword);
api.post("/api/v1/auth/resetPassword", auth.resetPassword);

api.listen(config.getSection("services").auth.port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(
    "Service [auth] successfully started on port",
    config.getSection("services").auth.port
  );
});
