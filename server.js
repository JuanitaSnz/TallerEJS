const express = require('express');
const ejs= require('ejs');
const path= require('path');
const router = require('./routes/index')
const app= express();


app.set('PORT',process.env.PORT||3800);
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'/public')))
app.use("/",require("./routes/index"));
app.use(router)
app.listen(app.get('PORT'),()=> console.log(`server listen at port ${app.get('PORT')}`));