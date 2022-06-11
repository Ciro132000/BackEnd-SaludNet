// require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET


// Firmar el token o generarlo
/**
 * Debes pasar el objecto del usuario
 * @param {*} user
 */

const tokenSign = async (user) => {
    const sign = await jwt.sign(
        {
            id: user.id,
            role: user.is_admin
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign
}

// Verificar que el token sea del back-end
const verifyToken = async (tokenJwt) => {
    try{
        return jwt.verify(tokenJwt, JWT_SECRET);
    }catch(e){
        return null;
    }
}

module.exports = { tokenSign,verifyToken }