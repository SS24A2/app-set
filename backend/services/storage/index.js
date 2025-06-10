const express = require("express");
const jwt = require("express-jwt");
const fileUpload = require("express-fileupload");

const config = require("../../pkg/config");
const storage = require("./handlers/storage");

const api = express();

api.use(
  jwt.expressjwt({
    algorithms: ["HS256"],
    secret: config.getSection("security").jwt_secret,
  })
);

api.use(fileUpload());

api.post("/api/v1/storage", storage.upload);
api.get("/api/v1/storage/:file", storage.download);

// PORT: 10001
api.listen(config.getSection("services").storage.port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(
    "Service [storage] successfully started on port",
    config.getSection("services").storage.port
  );
});
