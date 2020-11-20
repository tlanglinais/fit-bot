require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const passport = require("passport");
require("./strategies/discord");
const routes = require("./routes/index");

const Store = require("connect-mongo")(session);
const connectDB = require("../db/db");
const connection = connectDB();

const session = require("express-session");
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({ mongooseConnection: connection.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
