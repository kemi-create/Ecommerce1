
module.exports = (app) => {
  const products = require("../controllers/product.controller.js");
  const isAuthenticated = require('../middlewares/authproduct.js');

  var router = require("express").Router();

  // Create a new User
  router.get("/", isAuthenticated, products.getAll);
  router.post("/searchall", isAuthenticated, products.searchAll);
  router.post("/edit", isAuthenticated, products.updateFavourite);
  router.get("/favourites", isAuthenticated, products.getFavourites);
  // router.get("/", products.getAll);

  app.use("/api/products", router);
};
