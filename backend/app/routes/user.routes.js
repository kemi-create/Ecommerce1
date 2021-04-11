module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/signin", users.signin);
    router.post("/signup", users.signup);
  
    app.use("/api/users", router);
  };
  