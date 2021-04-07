const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const _handlebars = require("handlebars");
const exhbrs = require("express-handlebars");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const path = require("path");

const pageRouter = require("./routers/pageRouter");


dotenv.config();

const hbs = exhbrs.create({
    handlebars : allowInsecurePrototypeAccess(_handlebars)
});

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.use(express.static(path.join(__dirname, "/public")));

// bodyparser
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// session

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        maxAge: 60*60*60*24,
        httpOnly: true,
        secure:false
    }
}))


app.use("/", pageRouter);


app.use((req, res, next)=>{
    let error = new Error(`${req.method}${req.url} no exists`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("pages/errors");
})

const server = app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
})