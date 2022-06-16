const multer = require('multer');

const { verifyToken } = require('./handleJwt')

const storage = multer.diskStorage({
    destination:async function(req,file,cb){

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        const user_id = dataToken.id;


        if(file.fieldname === "image"){
            const pathStorage = `./storage/users/user-${user_id}/img-perfil`;
            cb(null, pathStorage)
        }else if(file.fieldname === "image_header"){
            const pathStorage = `./storage/users/user-${user_id}/img-portada`;
            cb(null, pathStorage)
        }

    },
    filename:async function(req,file,cb){
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        const user_id = dataToken.id;

        if(file.fieldname === "image"){
            const ext=file.originalname.split('.').pop();
            const filename = `perfil-user-${user_id}.${ext}`;
            cb(null, filename)
        }else if(file.fieldname === "image_header"){
            const ext=file.originalname.split('.').pop();
            const filename = `portada-user-${user_id}.${ext}`;
            cb(null, filename)
        }
    }
})


const uploadMiddleware = multer({storage:storage});

module.exports = uploadMiddleware

// const multer = require('multer')


// const storage = multer.diskStorage(
//     {
//         filname:function(res, file, cb){
//             const ext = file.originalname.split('.').pop()
//             const filename = Date.now();
//             cb(null, `${filename}.${ext}`);
//         },
//         destination:function(res, file, cb){
//             cb(null, `../public`)
//         }
//     }
// );

// const upload = multer({storage:storage})