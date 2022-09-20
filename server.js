const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const homeRoutes = require("./routes/homeRoutes");
const postRoutes = require("./routes/postRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes")
const profileRoutes = require("./routes/profileRoutes")
const commentRoutes = require("./routes/commentRoutes")

require("dotenv").config({ path: "./config/.env"});

require("./config/passport")(passport);

connectDB();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(logger("dev"));

app.use(methodOverride("_method"));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
    res.locals.globalUser = req.user;
    next();
})

app.use("/", homeRoutes);
app.use("/post", postRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/profile", profileRoutes);
app.use("/comment", commentRoutes);

app.listen(process.env.PORT);