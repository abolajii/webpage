const express = require("express");
const dotenv = require("dotenv");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passportAuth = require("./auths/passport")

const passport = require('passport')
passportAuth(passport)

const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");

// load config
dotenv.config({ path: "./config/config.env" });

// //mongoose connect
mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser : true,
useUnifiedTopology: true
})
.then(msg => {
    console.log('Mongo connected')
})
.catch(err => console.log(err))

const app = express();

app.use(expressLayout);
app.set("view engine", "ejs");

//bodyparser
app.use(express.urlencoded({ extended: false }));

// flash
app.use(flash());

// session
app.use(
  session({
    secret: "devb",
    resave: true,
    saveUninitialized: true,
  })
);

// global variable
const globalVariable = (req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.failure_msg = req.flash("failure_msg");
  res.locals.error = req.flash("error");
  next();
};

app.use(globalVariable);

//Load the index and user route
app.use("/", indexRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${PORT}`));
