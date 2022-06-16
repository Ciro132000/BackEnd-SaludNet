const { body } = require('express-validator');

const validateResults = require('../utils/handleValidator')

const validatorRegisterProfile = [
    body("day_birth").exists().toDate(),

    body("gender").isInt({min:1}),

    body("phone").exists().isInt({min:3}),

    body("image").exists().optional({ nullable: true }),

    body("image_header").exists().optional({ nullable: true }),

    body("id_country").exists().notEmpty().isLength({min:3, max:15}),


    (req, res, next) => {
        return validateResults(req, res, next);
    }
];


module.exports = {validatorRegisterProfile};