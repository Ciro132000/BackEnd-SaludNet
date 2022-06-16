
const  usersModel  = require('../models/users')
const { handleHttpError } =require('../utils/handleError');
const { verifyToken } = require('../utils/handleJwt');


const authMiddleware = async (req,res,next) =>{
    try {
        
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401);
            return
        }

        // Omitir la palabra beard
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return
        }

        // if(!dataToken._id){
        //     handleHttpError(res, "ERROR_ID_TOKEN", 401);
        //     return
        // }

        // const query = {
        //     id:dataToken.id
        // }

        const user = await usersModel.findOne({ where: { id: dataToken.id } });
        req.user = user

        next()

    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401);
    }
}

module.exports = authMiddleware