//j'importe mongoose pr communiquer avec la bdd Mongodb:
const mongoose = require('mongoose')


// création du schéma:
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom saisi'],
    },

    technology: {
        type: String,
        required: [true, 'Pas de technologie saisie'],
    },

    responsiveDesign: {
        type: String,
        required: [true, 'Pas de format saisi']
    },
    
    url: {
        type: String,
        required: [true, 'Pas de lien saisi']
    },
    githubUrl: {     
        type: String,
        required: [true, 'Pas de lien saisi']
    },

    img:{
        type: String,
        required: [false, "image est requis"]
    }

})

//création du model utilisateur grâce à la méthode "mongoose.model(): 
const projectModel = mongoose.model('projects', projectSchema);
//export  de projectModel pour l'utiliser dans les autres fichiers de l'appli:
module.exports = projectModel