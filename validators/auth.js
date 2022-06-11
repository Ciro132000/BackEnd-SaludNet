const { check } = require('express-validator');

const validateResults = require('../utils/handleValidator')

const validatorRegister = [
    check("firstName").exists().notEmpty().isLength({min:3, max:99}),

    check("lastName").exists().notEmpty().isLength({min:5, max: 200}),

    check("password").exists().notEmpty().isLength({min:3, max:15}),

    check("email").exists().notEmpty().isEmail(),

    check("userName").exists().notEmpty().isLength({min:3, max:99}),

    check("is_active").exists().notEmpty().isBoolean(),

    check("is_admin").exists().notEmpty().isBoolean(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorLogin = [
    
    check("password").exists().notEmpty().isLength({min:3, max:15}),

    check("email").exists().notEmpty().isEmail(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = {validatorRegister, validatorLogin};