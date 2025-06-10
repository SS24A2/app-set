const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const config = require("../../pkg/config");
const auth = require("./handlers/auth");
const db = require("../../pkg/db");

db.init(); // Databazata e startuvana

const api = express();

api.use(express.json()); // req.body moze da bide json format

api.use(
  jwt({
    secret: config.getSection("security").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/v1/auth/login",
      "/api/v1/auth/register",
      "/api/v1/auth/refreshToken",
      "/api/v1/forgotPassword",
      "/api/v1/auth/resetPassword",
    ],
  })
);

api.post("/api/v1/auth/login", auth.login);
api.post("/api/v1/auth/register", auth.register);
api.post("/api/v1/refreshToken", auth.refreshToken);
api.post("/api/v1/forgotPassword", auth.forgotPassword);
api.post("/api/v1/auth/resetPassword", auth.resetPassword);

api.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token...");
  } else {
    next(err);
  }
});

// config.getSection("services").auth.port
// const services = {
//   auth: {
//     port: 10002
//   }
// }

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
