const router = require('express').Router();
router.get('/',(req,res)=>{
    res.render('index')
});

router.get("/info",(req,res)=>{
    res.render('info');
});

module.exports=router;