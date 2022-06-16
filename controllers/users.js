const { matchedData } = require('express-validator');
require('dotenv').config();

const { handleHttpError } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword');
const { verifyToken } = require('../utils/handleJwt')
const { cloudinary } = require('../utils/cloudinary')
const fs =require('fs-extra')

const  usersModel  = require('../models/users')
const profileModel = require('../models/profiles');


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

const registerProfile = async (req,res) =>{
    
    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    const user_id = dataToken.id;


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
        const resultado = await cloudinary.uploader.upload(req.files.image_header[0].path, (error ,result)=>{
            console.log(error, result)
        })
        await fs.unlink(req.files.image_header[0].path)
        dataSend.image=`/storage/img-default/perfil.png`
        dataSend.image_header= resultado.url
    }else if(!req.files.image_header && req.files.image){
        const resultado = await cloudinary.uploader.upload(req.files.image[0].path, (error ,result)=>{
            console.log(error, result)
        })
        await fs.unlink(req.files.image[0].path)
        dataSend.image_header=`/storage/img-default/portada.jpg`
        dataSend.image=resultado.url
    }else{
        const resultado1 = await cloudinary.uploader.upload(req.files.image_header[0].path, (error ,result)=>{
            console.log(error, result)
        })
        await fs.unlink(req.files.image_header[0].path)
        const resultado2 = await cloudinary.uploader.upload(req.files.image[0].path, (error ,result)=>{
            console.log(error, result)
        })
        await fs.unlink(req.files.image[0].path)
        dataSend.image_header=resultado1.url
        dataSend.image=resultado2.url
    }

    const dataUser = await profileModel.create(dataSend);

    res.send({dataUser})

}

module.exports = { getUser, getAllUsers, registerProfile }