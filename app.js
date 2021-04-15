const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const logger = require('./helper/logger');

// 환경변수 설정
if (process.env.NODE_ENV === "production") {
    dotenv.config({path: path.join(__dirname, "/.env.production")});
    app.use(morgan("combined"));
} else {
    dotenv.config({path: path.join(__dirname, "/.env.develop")});
    app.use(morgan("dev"));
}

const _handlebars = require("handlebars");
const exhbrs = require("express-handlebars");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


const flash = require("connect-flash");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const keys = require("./config/keys");
const methodOverride = require("method-override");

//db
const {sequelize} = require("./models");

const passport = require("passport");
require("./passport")();

// routers
const pageRouter = require("./routers/pageRouter");
const authRouter = require("./routers/auth");
const dashboardRouter = require("./routers/dashboard");

// view template
const {stringify, formatDate} = require("./helper/hbs");
const hbs = exhbrs.create({
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    helpers:{stringify, formatDate}

});
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.use(express.static(path.join(__dirname, "/public")));

// bodyparser
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(flash());

// session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: keys.COOKIE_SECRET,
    cookie: {
        maxAge: 60 * 60 * 60 * 24,
        httpOnly: true,
        secure: false
    }
}))

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
    res.locals.user = req.user || null;
    next();
});

// db connection
sequelize.sync({force: false})
    .then(() => {
        console.log("db is successfully connect")
    }).catch(err => console.log(err));

app.use("/", pageRouter);
app.use("/auth",authRouter);
app.use("/dashboard", dashboardRouter);

app.use((req, res, next) => {
    let error = new Error(`${req.method}${req.url} no exists`);
    error.status = 404;

    // log
    logger.info(`${err.method} ${err.message}`);
    logger.error(`${err.method} ${err.message}`);
    next(error);
});

// error middleware
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);

    res.render("pages/errors");
})

const server = app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})