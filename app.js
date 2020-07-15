const express = require("express");
const dotenv = require("dotenv");
const expressLayout = require("express-ejs-layouts");

const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");

// load config
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(expressLayout);
app.set("view engine", "ejs");

//Load the index and user route
app.use("/", indexRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
