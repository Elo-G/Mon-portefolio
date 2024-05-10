const userModel = require("../models/userModel");
const userRouter = require("express").Router();
const crypto = require('../services/crypto')



//------------------------------------------------ROUTE POUR AFFICHER LE FORM DE LOGIN:

userRouter.get("/login", async (req, res) => {
  res.render("login.twig");
});



//----------------------------------------------------ROUTE POUR SE LOGUER:

userRouter.post("/login", async (req,res)=>{
    //recherche dans la bdd d'un user dont le mail est identique à celui saisi dans le formulaire : 
    const user = await userModel.findOne({ mail: req.body.mail})
    if (user) { // si tu trouve un user et si... 
        if (await crypto.comparePassword(req.body.password, user.password)) { //...si  le mdp cripté du body correspond à celui saisi par l'user 
            req.session.userId = user._id// req.session.userId permet de garder la session de l'user : user._id
            res.redirect('/addProject') //  redirrection vers addproject (route vers le form d'ajout de projets)
        }else{//sinon...
            try {
                res.render('login.twig',{ // rend la page login 
                errConnect: "le mot de passe est  incorrect !!!!!" // en y affichant ce msg d'erreur
                })     
            } catch (error) {
                res.send(error)
            }
        }               
    }else{
        //si pas d'utilisateur, rend la page login avec le message d'erreur:
        res.render('login.twig',{    
            errConnect: "l'utilisateur n'existe pas !!!!"/*errConnect: clé pour transmettre le message d'erreur à ma vue*/
        })     
    }
})



//----------------------------------------------------ROUTE POUR SE DELOGUER:

userRouter.get("/logout", async (req, res) => {
   req.session.destroy()
   res.redirect("/")
});



//--------------------------------------------------EXPORT D'USERROUTER:

module.exports = userRouter;
