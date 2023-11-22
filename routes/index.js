const router = require('express').Router();
router.get('/',(req,res)=>{
    res.render('index')
});

//ruta formulario de registro
router.get('/register',(req,res)=>{
    res.render('formRegister')
});

//ruta consulta tabla
router.get('/consult',(req,res)=>{
    res.render('consultTable')
});  

//ruta informacion de la pagina
router.get("/info",(req,res)=>{
    res.render('info');
});

module.exports=router;