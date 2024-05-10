const express = require ("express")
const mongoose = require ("mongoose")
const session = require("express-session")
const projectRouter = require("./routes/projectRouter")
require ('dotenv').config()
const userRouter = require("./routes/userRouter")
const mailerRouter = require("./routes/mailerRouter")
const db = process.env.BDD_URL


const app = express()
require ('dotenv').config()


app.use(session({secret: process.env.SESSION_PWD,saveUninitialized: true, resave: true}));
app.use(express.static("./assets"))// PERMETS A APP (A EXPRESS) D'UTILISER LES DOSSIERS STATICS DS ASSETS
app.use(express.urlencoded({extended: true}))// ligne specifique pour désencoder  les infos saisies ds les form en général (qui s'encode automatiquement avec la methode post)
app.use (express.json())
app.use(projectRouter)
app.use(userRouter)
app.use(mailerRouter)


app.listen ( 3005,(err)=>{ 
                            
if (err){
    console.log(err);
}else{
    console.log("connecté");
}
})

mongoose.set('strictQuery', true); 
mongoose.connect(db, (err)=>{   
    if (err){
        console.log(err);
    }else{ console.log("connecté à la bdd");}
})

