const { matchedData } = require('express-validator');
const fs = require('fs')

const { handleHttpError } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt')
const  usersModel  = require('../models/users')


const registerCtrl = async (req,res) => {

    try{
        req = matchedData(req);
        const passwordHash = await encrypt(req.password)
        const body = {...req, password:passwordHash};
        const dataUser = await usersModel.create(body);
        dataUser.set('password', undefined, { strict:false }) // Con esto seteamos o ocultamos la contraseña en la respuesta de la api
            
        const data = {
            token: await tokenSign(dataUser),
            user:dataUser,
        }
        
        fs.mkdirSync(`./storage/users/user-${dataUser.id}`,{recursive:true});
        fs.mkdirSync(`./storage/users/user-${dataUser.id}/img-perfil`,{recursive:true});
        fs.mkdirSync(`./storage/users/user-${dataUser.id}/img-portada`,{recursive:true});
        fs.mkdirSync(`./storage/users/user-${dataUser.id}/img-posts`,{recursive:true});
        fs.mkdirSync(`./storage/users/user-${dataUser.id}/img-messages`,{recursive:true});

        res.send({data})
    
    }catch(e){
        handleHttpError(res, "ERROR_REGISTER_USER");
        console.log(e)
    }


}

const loginCtrl = async (req,res) => {

    try {
        req = matchedData(req);
        const user = await usersModel.findOne({ where: {email:req.email}})
        console.log('--->'+user.email)
        // .select('password name role email');
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS",404);
            return
        }

        const hashPassword = user.get('password');
        console.log('--->'+hashPassword)
        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "PASSWORD_INVALID",401);
            return
        }    

        user.set('password', undefined, {strict:false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data});


    } catch (e) {
        handleHttpError(res, "ERROR_LOGIN_USER");
    }

}


module.exports = { registerCtrl,loginCtrl }