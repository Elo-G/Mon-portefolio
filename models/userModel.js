//import de mongoose pour communiquer avec la bdd Mongodb:
const mongoose = require('mongoose')


//création du schema (le patron):
const userSchema = new mongoose.Schema({
   
    mail: {
        type: String,
        required: [true, 'Pas de mail saisi'],
    },
    password: {
        type: String,
        required: [true, 'Pas de mot de passe saisi']
    },
})

//création du model user:
const userModel = mongoose.model('users', userSchema); 

//exportation de userModel:
module.exports = userModel