const userModel = require('../models/userModel')

let authGuard = async(req,res,next)=>{
    let user = await userModel.findOne({_id: req.session.userId})
    if (user) {
        next()
    }else{
        res.redirect('/')
    }
}

module.exports = authGuard


//authgard = middlewire qui permet de protéger ma route addproject pr ne pas que n'importe qui y ait accès via localhost/addProject (on le met ds le dossier services)