const Product = require("./../models/product.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config/jwt.config");

exports.getAll = (req, res) => {
  Product.find({}, (err, products) => {
    console.log("===========products==============", products);
    res.json({ products });
  });
};
