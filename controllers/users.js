const { matchedData } = require('express-validator');

const { handleHttpError } = require('../utils/handleError')
const { encrypt, compare } = require('../utils/handlePassword');
const { verifyToken } = require('../utils/handleJwt')

const  usersModel  = require('../models/users')

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

module.exports = { getUser, getAllUsers }