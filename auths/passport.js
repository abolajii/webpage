const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../model/User");

const passportAuth = (passport) => {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Email isn't registered" });
          } else {
            // compare password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (!isMatch) {
                return done(null, false, {
                  message: "Password Incorrect",
                });
              } else {
                return done(null, user);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = passportAuth;
