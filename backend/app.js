require("dotenv").config();
require("colors");
require("./strategies/discord");

const express = require("express");
const app = express();
const passport = require("passport");
const routes = require("./routes/index");
const cors = require("cors");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./db/db");

const dbConnection = connectDB();

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ clientPromise: dbConnection }),
  })
);

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(passport.initialize());
app.use(passport.session());

const apiVersion = "v1";

app.use(`/api/${apiVersion}`, routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
