const { matchedData } = require('express-validator');
require('dotenv').config();
const { handleHttpError } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword');
const { verifyToken } = require('../utils/handleJwt')

const  usersModel  = require('../models/users')
const profileModel = require('../models/profiles')


const getUser = async (req,res) => {

    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    const data = {
        token: dataToken,
        user_id:dataToken.id,
    }

    res.send({data})
}

const getAllUsers = async(req,res) => {
    const allUser = await usersModel.findAll();
    res.send({allUser})
}

const registerProfile = async(req,res) =>{
    
    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    const user_id = dataToken.id;

    const ar = req.files;

    const dataSend={
        day_birth:req.body.day_birth,
        gender:req.body.gender,
        phone:req.body.phone,
        image:null,
        image_header:null,
        id_country:req.body.id_country,
        id_user:user_id
    }

    if(!req.files.image_header && !req.files.image){
        dataSend.image=`/storage/img-default/perfil.png`
        dataSend.image_header=`/storage/img-default/portada.jpg`
    }else if(!req.files.image && req.files.image_header){
        dataSend.image=`/storage/img-default/perfil.png`
        dataSend.image_header=`/storage/users/user-${user_id}/img-portada/portada-user-${user_id}.${image_header[0].originalname.split('.').pop()}`
    }else if(!req.files.image_header && req.files.image){
        dataSend.image_header=`/storage/img-default/portada.jpg`
        dataSend.image=`/storage/users/user-${user_id}/img-portada/portada-user-${user_id}.${image[0].originalname.split('.').pop()}`
    }else{
        dataSend.image_header=`/storage/users/user-${user_id}/img-portada/portada-user-${user_id}.${image_header[0].originalname.split('.').pop()}`
        dataSend.image=`/storage/users/user-${user_id}/img-portada/portada-user-${user_id}.${image[0].originalname.split('.').pop()}`
    }

    const dataUser = await profileModel.create(dataSend);
    res.send({dataUser})
}

module.exports = { getUser, getAllUsers, registerProfile }