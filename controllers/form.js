const { matchedData } = require('express-validator');
require('dotenv').config();
const { QueryTypes } = require('sequelize');

const { handleHttpError } = require('../utils/handleError')

const  privaciesModel  = require('../models/privacies')

// Mostrar los niveles de privacidad
const privaciesLevel = async (req,res)  =>{
    try {
        const allPrivacies = await privaciesModel.findAll();
        res.send({data:allPrivacies})
    } catch (error) {
        handleHttpError(res, "ERROR_MOSTRANDO_NIVELES_DE_PRIVACIDAD");
    }
}

module.exports = { privaciesLevel }