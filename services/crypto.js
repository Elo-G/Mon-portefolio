//sécurise les mots de passes via la méthode salt et hash

let bcrypt = require('bcrypt');

let saltRounds = 5

let cryptPassword = async function(passwords){
    // Génère un sel de manière asynchrone
    let salt = await bcrypt.genSalt(saltRounds)
    // Hache le mot de passe avec le sel généré
    return await bcrypt.hash(passwords ,salt)
}

let comparePassword = async function(plainPass, hashword){
 // Compare le mot de passe en clair avec le mot de passe haché de manière asynchrone    
let compare = bcrypt.compare(plainPass, hashword);
//renvoie le resultat de la comparaison (true s'ils sont identiques et false s'ils sont différents, car le résultat de la méthode bcrypt.compare() est de type boléen)
return compare;
}



module.exports = {
    cryptPassword,
    comparePassword
}