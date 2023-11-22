const router = require('express').Router();
const psychologists = require('./psychologists')

router.get('/',(req,res)=>{
    res.render('index')
});

router.use('/consult', psychologists)

module.exports=router;