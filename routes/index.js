const router = require('express').Router();
router.get('/',(req,res)=>{
    res.render('index')
});

router.get('/register',(req,res)=>{
    res.render('formRegister')
});

router.get('/consult',(req,res)=>{
    res.render('consultTable')
});

module.exports=router;