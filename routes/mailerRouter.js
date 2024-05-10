const express = require ("express")
const mailerRouter = require("express").Router()
const nodemailer = require("nodemailer")
require ('dotenv').config()


// = defini le transporter qui contient le service mail utilisé,ainsi que le compte ( ici c'est gmail)
const transporter = nodemailer.createTransport({ 
  service: "gmail",  
  auth: { user: "fonsat.nodemailer@gmail.com", 
  pass: "dlclhbrybfcawlgi" },
  tls: {rejectUnauthorized: false}
// !  ligne à mettre pour que le code fonctionne correctement
});



mailerRouter.post('/sendMail', async (req, res) =>{
    try{
       console.log(req.body);
       let info = await transporter.sendMail({
          from: process.env.USER_MAIL,// mail intermediaire (mail du serveur) qu'ensuite je sécurise 
          to: process.env.MY_MAIL,//mon mail
          subject: req.body.name,//objet du message (nom contenu ds l'input name)
         //  html: JSON.stringify(req.body),// = j'envoie tout le form en json mais l'affichage n'aura pas une structure fluide, donc dessous je le fais d'une manière "propre"
        

        html: `
        
      // nom : ${req.body.name} <br>    
        prénom : ${req.body.firstName}<br>
        entreprise : ${req.body.compagny}<br>
        ville : ${req.body.location}<br>
        mail : ${req.body.mail}<br>
        message: ${req.body.message}<br>
        
        // `,
       })
       res.redirect('/')
    }catch (err){
       console.log(err);
       res.send(err)
    }
 })



module.exports = mailerRouter;