const { matchedData } = require('express-validator');
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { handleHttpError } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword');
const { verifyToken } = require('../utils/handleJwt')
const { cloudinary } = require('../utils/cloudinary')
const fs =require('fs-extra')
const { sequelize } = require('../config/db')

const  usersModel  = require('../models/users')
const profileModel = require('../models/profiles');


// Funcion para mostrar los datos del usuario activo
const getUser = async (req,res) => {

    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    const [results,metadata] = await sequelize.query(
        `SELECT Users.id AS user_id, 
        Users.firstName, Users.lastName, 
        Users.email, 
        Profiles.id AS profile_id, 
        Profiles.day_birth, 
        Profiles.gender, 
        Profiles.phone, 
        Profiles.image, 
        Profiles.image_header, 
        Profiles.id_country 
        FROM Users INNER JOIN Profiles ON Users.id=Profiles.id_user WHERE Users.id=${dataToken.id}`, 
        { type: QueryTypes.SELECT }
    )

    res.send({data:results})
}

// Mostar todos los usuarios
const getAllUsers = async(req,res) => {
    const allUser = await usersModel.findAll();
    res.send({allUser})
}

// Registro de perfil
const registerProfile = async (req,res) =>{

    try {
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
            const resultado = await cloudinary.uploader.upload(req.files.image_header[0].path,{ public_id:`saludnet/users/user-${user_id}/portada/portada-user-${user_id}` }, (error ,result)=>{
                console.log(error, result)
            })
            await fs.unlink(req.files.image_header[0].path)
            dataSend.image=`/storage/img-default/perfil.png`
            dataSend.image_header= resultado.url
        }else if(!req.files.image_header && req.files.image){
            const resultado = await cloudinary.uploader.upload(req.files.image[0].path, { public_id:`saludnet/users/user-${user_id}/perfil/perfil-user-${user_id}` },(error ,result)=>{
                console.log(error, result)
            })
            await fs.unlink(req.files.image[0].path)
            dataSend.image_header=`/storage/img-default/portada.jpg`
            dataSend.image=resultado.url
        }else{
            const resultado1 = await cloudinary.uploader.upload(req.files.image_header[0].path, { public_id:`saludnet/users/user-${user_id}/portada/portada-user-${user_id}` }, (error ,result)=>{
                console.log(error, result)
            })
            await fs.unlink(req.files.image_header[0].path)
            const resultado2 = await cloudinary.uploader.upload(req.files.image[0].path, { public_id:`saludnet/users/user-${user_id}/perfil/perfil-user-${user_id}` }, (error ,result)=>{
                console.log(error, result)
            })
            await fs.unlink(req.files.image[0].path)
            dataSend.image_header=resultado1.url
            dataSend.image=resultado2.url
        }

        const data = await profileModel.create(dataSend);

        res.send({data})
        
    } catch (error) {
        console.log(error)
    }

}

// Buscador de usurios
const searchUser = async (req,res) => {   
    try {
        const dataUser = req.query.dataSearch
        const [results,metadata] = await sequelize.query(
            `SELECT Users.id, Users.firstName, Users.lastName, Users.userName, Profiles.image FROM Users 
            INNER JOIN Profiles ON Profiles.id_user = Users.id 
            WHERE Users.firstName LIKE "%${dataUser}%" OR Users.lastName LIKE "%${dataUser}%"`
        );
        res.send({data:results})
    } catch (error) {
        console.log(error)
    }
}

// Perfil de usuaruis
const userProfile = async (req,res) =>{
    try {
        const userName = req.query.data;

        const [data,metadata] = await sequelize.query(
            `SELECT Users.id AS user_id, 
            Users.firstName, Users.lastName, 
            Users.email, 
            Profiles.id AS profile_id, 
            Profiles.day_birth, 
            Profiles.gender, 
            Profiles.phone, 
            Profiles.image, 
            Profiles.image_header, 
            Profiles.id_country 
            FROM Users INNER JOIN Profiles ON Users.id=Profiles.id_user WHERE Users.userName='${userName}'`, 
            { type: QueryTypes.SELECT }
        )

        res.send({data})
    } catch (error) {
        res.send(error)
    }
}

module.exports = { getUser, getAllUsers, registerProfile, searchUser, userProfile}