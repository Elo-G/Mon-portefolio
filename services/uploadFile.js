//Fichier dans lequel je vais utiliser multer, middleware qui permet au client d'uploader des images et des fichier.


const multer = require('multer'); // (require ('multer') donc ne pas oublier d' installer multer npm i etc... )

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',// Là je mets tous les formats de fichier que je vais vouloir utiliser
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => { //fonction definissant la destination du fichier que le client a uploadé
    callback(null, './assets/uploads/');
  },
  filename: (req, file, callback) => {  //fonction qui defini le nom que prendra le fichier uploadé
    const name = file.originalname.split(' ').join('_'); //remplace les espace par des "_" dans le nom du fichier original
    const extension = MIME_TYPES[file.mimetype];// récupère l'extension du fichier
    callback(null, name + Date.now() + '.' + extension); 
  }
});

const upload = multer({  
  storage: storage, 
  limits:{
    fieldSize:1024*1024*3
  }
})

module.exports = upload