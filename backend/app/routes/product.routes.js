module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.get("/", products.getAll);
  
    app.use("/api/products", router);
  };
  