const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = express.Router();

// GET method  @desc REGISTER
router.get("/register", (req, res) => {
  res.render("register");
});

// GET method  @desc REGISTER
router.get("/login", (req, res) => {
  res.render("login");
});

// POST method  @desc LOGIN
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
});

// POST method  @desc REGISTER
router.post("/register", (req, res) => {
  const { firstname, lastname, email, password, password2 } = req.body;
  const errors = [];

  if (!firstname || !lastname || !email || !password || !password2) {
    errors.push({ message: "Please fill in all fields" });
  }

  if (password !== password2) {
    errors.push({ message: "Password does not match" });
  }

  if (password.length < 3) {
    errors.push({ message: "Password must be longer than 3" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      firstname,
      lastname,
      email,
      password,
      password2,
    });
  } else {
    //Find user
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          errors.push({ message: "Email already exists" });
          res.render("register", {
            errors,
            firstname,
            lastname,
            email,
            password,
            password2,
          });
        } else {
          // create user
          const newUser = new User({
            firstname,
            lastname,
            email,
            password,
          });
          //hash password
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash;

              newUser
                .save()
                .then((user) => {
                  req.flash("success_msg", "You are registered and can log in");
                  res.redirect("/user/login");
                })
                .catch((err) => console.log(err));
            });
          });
        }
      })
      .catch((err) => {if (err) throw err})
  }
});

module.exports = router;
