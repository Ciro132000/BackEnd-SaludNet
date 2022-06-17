const { matchedData } = require('express-validator');
const fs = require('fs')

const { handleHttpError } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt')
const  usersModel  = require('../models/users')
const profileModel = require('../models/profiles');


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
        const profile = await profileModel.findOne({ where: {id_user:user.id}})
        // .select('password name role email');
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS",404);
            return
        }

        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "PASSWORD_INVALID",401);
            return
        }    

        user.set('password', undefined, {strict:false})
        const data = {
            token: await tokenSign(user),
            user,
            profile
        }


        res.send({data});


    } catch (e) {
        handleHttpError(res, "ERROR_LOGIN_USER");
    }

}


module.exports = { registerCtrl,loginCtrl }
