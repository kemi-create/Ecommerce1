const User = require("./../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config/jwt.config");

const checkDuplicateEmail = (mail) => {
  // Email
  User.findOne({
    where: {
      mail: mail,
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
        console.log(isMatch);
        if (err) return err;
        if (isMatch) {
          // console.log(user);
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
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
  if (!req.body.realname) {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }
  if (!req.body.mail) {
    res.status(400).send({
      message: "Mail can not be empty!",
    });
    return;
  }
  checkDuplicateEmail(req.body.mail);
  if (!req.body.sex) {
    res.status(400).send({
      message: "Sex can not be empty!",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "Password can not be empty!",
    });
    return;
  }
  // if (req.body.password !== req.body.password) {
  //   res.status(400).send({
  //     message: "Password can not be empty!",
  //   });
  //   return;
  // }
  const realname = req.body.realname || "";
  const sex = req.body.sex || 0;
  const mail = req.body.mail || "";
  const password = req.body.password || "";
  const birthday = req.body.birthday || "";
  const phonenumber = req.body.phonenumber || "";

  const newUser = new User({
    realname: realname,
    sex: sex,
    mail: mail,
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
        if (err) return err;
        res.json({ success: "success" });
      });
    });
  });
};
