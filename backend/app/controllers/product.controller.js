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
  const searchTxt = req.body.searchtext;
  console.log(req.body);
  if (searchTxt == "") {
    Product.find({}, (err, products) => {
      if (err) throw err;
      res.json({ products });
    });
  } else {
    Product.find({ title: { $regex: searchTxt } }, (err, products) => {
      let product = [];
      if (products.length != 0) {
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
      } else res.json({ products: [] });
    });
  }
};

exports.updateFavourite = (req, res) => {
  console.log(req.body);
  const productId = req.body.productid;
  const authorId = req.authorId;

  Product.findById(productId, (err, products) => {
    if (err) throw err;

    const index = products.favourites.indexOf(authorId);
    if (index > -1) {
      products.favourites.splice(index, 1);
    } else {
      products.favourites.push(authorId);
    }

    const updateData = {
      favourites: products.favourites,
    };

    Product.findByIdAndUpdate(productId, updateData, (err) => {
      if (err) throw err;
      else res.json({ success: "success" });
    });
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

exports.getSearchFavourites = (req, res) => {
  const searchTxt = req.body.searchtext;

  Product.find({ title: { $regex: searchTxt } }, (err, products) => {
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
