const express = require("express");
const jwt = require("express-jwt");

const config = require("../../pkg/config");
const db = require("../../pkg/db");
const posts = require("./handlers/posts");

db.init();

const api = express();
api.use(express.json())

api.use(
  jwt.expressjwt({
    algorithms: ["HS256"],
    secret: config.getSection("security").jwt_secret,
  })
);

api.get("/api/v1/posts", posts.getAll);
api.get("/api/v1/posts/:id", posts.getSingle);
api.post("/api/v1/posts", posts.create);
api.put("/api/v1/posts/:id", posts.update);
api.delete("/api/v1/posts/:id", posts.remove);

// Port 10003
api.listen(config.getSection("services").posts.port, (err) => {
  if (err) {
    console.log("error", err);
    return;
  }
  console.log(
    "Service [posts] successfully started on port",
    config.getSection("services").posts.port
  );
});
