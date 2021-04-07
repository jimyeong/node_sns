const router = require("express").Router();

router.get("/", (req,res,next)=>{
    const twits = [];
    res.render("index", {
        title : "Node SNS",
        twits : twits
    })
})

module.exports = router;