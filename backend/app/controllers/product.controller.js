const Product = require("./../models/product.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config/jwt.config");

exports.getAll = (req, res) => {
  Product.find({}, (err, products) => {
    let product = [];
    products.forEach((data) => {
      data.favourite = false;
      data.favourites.forEach((item) => {
        if (item == req.authorId) {
          data.favourite = true;
        }
      });
      product.push(data);
    });
    res.json({ products: product });
  });
};

exports.searchAll = (req, res) => {
  const searchTxt = req.body.searchTxt;

  Product.find({ $text: { $search: searchTxt } }, (err, products) => {
    let product = [];
    products.forEach((data) => {
      if (data.favourites.length != 0) {
        data.favourites.forEach((item) => {
          if (item == req.authorId) {
            data.favourite = true;
          } else data.favourite = false;
        });
      } else {
        data.favourite = false;
      }
      product.push(data);
    });
    res.json({ products: product });
  });
};

exports.updateFavourite = (req, res) => {
  const productId = req.body.product_id;
  const authorId = req.authorId;
  const favourites = req.body.favourites;
  // const favourites = ["60734ab69eba931404cfe2f1"];

  const index = favourites.indexOf(authorId);
  if (index > -1) {
    favourites.splice(index, 1);
  } else {
    favourites.push(authorId);
  }

  const updateData = {
    favourites: favourites,
  };

  Product.findByIdAndUpdate(productId, updateData, (err) => {
    if (err) throw err;
    else res.json({ success: "success" });
  });
};

exports.getFavourites = (req, res) => {
  Product.find({}, (err, products) => {
    let product = [];
    products.forEach((data) => {
      data.favourites.forEach((item) => {
        if (item == req.authorId) {
          data.favourite = true;
          product.push(data);
        }
      });
    });
    console.log(product);
    res.json({ products: product });
  });
};
