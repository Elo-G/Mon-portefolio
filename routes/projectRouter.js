const projectRouter = require("express").Router()
const projectModel = require ("../models/projectModel")
const authGuard = require('../services/authGuard')
const upload = require("../services/uploadFile")


//--------------------------------------ROUTE POUR AFFICHER LE FORM D'AJOUT DE PROJET:


projectRouter.get("/addProject", authGuard, async(req,res)=>{ 
    res.render('addProject.twig')  
})



//------------------------------ROUTE POUR AJOUTER LES PROJETS (les enregistrer en bdd):

projectRouter.post("/addProject", upload.single("img"), authGuard, async(req,res)=>{
    try {
        // Si fichier uploadé par le client:
        if (req.file) {
            // l'attribut img  dans le req.body aura pour valeur = le nom du fichier uploadé via req.file.filename  ( cf fichier uploadfile.js dans dossier "services"):
            req.body.img = req.file.filename 
        }
        // création d'un nouvel objet newProject à partir de projectModel et des infos saisies dans le formulaire:
        let newProject = new projectModel(req.body) 
        //sauvegarde de newProject en bdd:
        await newProject.save() 
         //une fois sauvegardé redirrection sur la page  d'accueil :
        res.redirect('/')
} catch (error) {
        res.send(error)
}   
})                     
 


//-------------------------------------ROUTE POUR AFFICHER LES PROJETS DANS LA VUE MAIN.TWIG:

projectRouter.get("/", async(req,res)=>{
    /* stockage des projectModels trouvés en bdd dans la variable projects:*/
    /* (c'est cette variable "projectS" que j'utilise dans la vue main.twig {% for project in projectS %})*/
    let projects= await projectModel.find()      
    
    //rend la vue main.twig , et via la clé "projects", passe à la vue les données de tous les projets stoqués dans la variable projects,
    res.render('main.twig',{ 
        projects: projects,    
    })           
                                        
})

/* Rq: "ds projects:projects", le 1er projects c'est la clé que j'ai crée pour transmettre les données à la vue, et le deuxième projects c'est la valeur de la clé projects qui est
       = la variable "projects= await projectModel.find()" dans laquelle j'ai stoquée tous les projectModels find (<=>trouvé en bdd). 
       Cette clé je vais l'utiliser dans ma vue main.twig(dans la partie PROJETS), pour y afficher  le nom, la techno, l'img etc... de chacun des projets*/


       
//--------------------------------------------------EXPORT DE PROJECTROUTER:

module.exports = projectRouter