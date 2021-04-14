const router = require("express").Router();
const {isLoggedIn} = require("./middlewares");
const Post = require("../models/post");
const sanitizeHtml = require("sanitize-html");


// csrf 공격 방어
const csrf = require("csurf");
const csrfProtection = csrf({cookie: true});


router.get("/", isLoggedIn, (req, res) => {
    console.log(req.user);

    res.render("pages/dashboard", {info: req.flash('info')});
})


router.get("/post", isLoggedIn, csrfProtection, (req, res) => {


    res.render("pages/user/post", {csrfToken: req.csrfToken()});
});

router.post("/post", isLoggedIn, csrfProtection, async (req, res, next) => {
    const content = sanitizeHtml(req.body.content, {
        allowedTags: [
            "h1", "h2", "h3", "h4", "h5", "h6", "div", "p", "ul", "em", "small", "span", "strong", "caption",
        ],
    });

    const commentAllow = req.body.allowComment === 'on' ? '1' : '0';
    const newPost = {
        content: content,
        img: req.body.thumbnail,
        status: req.body.status,
        commentAllow: commentAllow
    }
    newPost.fk_user_post_id = req.user.id;

    try {
        const result = await Post.create(newPost);
        if(result){
            req.flash("info", "posting is successfully done");
            res.redirect("/dashboard");
        }
    }catch (err){
        console.error(err);
        next(err);
    }
})


module.exports = router;
