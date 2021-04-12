const router = require("express").Router();


router.get("/", (req, res)=>{
    console.log(req.user);

    res.render("pages/dashboard", {});
})



module.exports = router;
