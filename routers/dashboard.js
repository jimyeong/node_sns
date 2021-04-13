const router = require("express").Router();
const {isLoggedIn} = require("./middlewares");



router.get("/", isLoggedIn,(req, res)=>{
    console.log(req.user);

    res.render("pages/dashboard", {});
})


router.get("/post", isLoggedIn,(req, res)=>{
    console.log(req.user);



    res.render("pages/user/post", {});
})



module.exports = router;
