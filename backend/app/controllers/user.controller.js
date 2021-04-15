const User = require("./../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config/jwt.config");

const checkDuplicateEmail = (email) => {
  // Email
  User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }
  });
};

exports.signin = (req, res) => {
  const email = req.body.user_mail || "";
  const password = req.body.password || "";

  User.findOne({ email: email }, (err, user) => {
    if (err) throw err;
    if (Boolean(user)) {
      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return err;
        if (isMatch) {
          // console.log(user);
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
              realname: user.realname,
              sex: user.sex,
              password: user.password,
              birthday: user.birthday,
              phonenumber: user.phonenumber,
            },
            config.jwtSecret
          );
          res.json({ token, success: "success" });
        } else {
          res.json({ errors: { invalidCredentials: "Invalid Password" } });
        }
      });
    } else {
      res.json({ errors: { invalidCredentials: "Invalid Email" } });
    }
  });
};

exports.signup = (req, res) => {
  console.log(req.body);
  const realname = req.body.realname || "";
  const sex = req.body.sex || 0;
  const email = req.body.mail || "";
  const password = req.body.password || "";
  const birthday = req.body.birthday || "";
  const phonenumber = req.body.phonenumber || "";

  const newUser = new User({
    realname: realname,
    sex: sex,
    email: email,
    password: password,
    birthday: birthday,
    phonenumber: phonenumber,
  });

  // Generate the Salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return err;
    // Create the hashed password
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) return err;
      newUser.password = hash;
      // Save the User
      newUser.save(function (err) {
        if (err) {
          res.json({ error: "user existed" });
          return err;
        }
        res.json({ success: "success" });
      });
    });
  });
};

exports.profileUpdate = (req, res) => {
  console.log(req.body);
  const userId = req.authorId;
  const realname = req.body.realname;
  const sex = req.body.sex;
  const email = req.body.mail;
  const oldPassword = req.body.oldpassword;
  const password = req.body.password;
  const confirmPassword = req.body.confirm;
  const birthday = req.body.birthday;
  const phonenumber = req.body.phonenumber;

  User.findById(userId, (err, user) => {
    bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
      if (err) return err;
      if (isMatch) {
        if (password == confirmPassword) {
          const userData = {
            realname: realname,
            sex: sex,
            email: email,
            password: password,
            birthday: birthday,
            phonenumber: phonenumber,
          };

          bcrypt.genSalt(10, (err, salt) => {
            if (err) return err;
            bcrypt.hash(userData.password, salt, (err, hash) => {
              if (err) return err;
              userData.password = hash;
              console.log(userData);
              User.findByIdAndUpdate(userId, userData, (err) => {
                // res.json({err});
                if (err) res.json({ error: "email is existed already" });
                else res.json({ success: "success" });
              });
            });
          });
        } else {
          res.json({ error: "No match confirm password" });
        }
      } else {
        res.json({ error: "No match old password" });
      }
    });
  });
};
