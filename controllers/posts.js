const { verifyToken } = require('../utils/handleJwt')
const { cloudinary } = require('../utils/cloudinary')
const fs =require('fs-extra')

const  postsModel  = require('../models/posts')

const setPost = async (req,res) =>{
    try {

      // Data para enviar en el registro de la publicación
      const dataSend ={
        ...req.body,
        idUser:req.user.id
      }

      const data = await postsModel.Posts.create(dataSend);

      //Verificando si la publicación presenta imagenes 
      if(req.files.length > 0){
        await req.files.map(async (file)=>{

          const resultado = await cloudinary.uploader.upload(file.path,{ 
            public_id:`saludnet/users/user-${req.user.id}/Posts/Post-${data.id}/Multimedia-${Date.now()}` 
          },(error)=>{
            console.log(error)
          })

          const ext = file.mimetype.split('/');
          const type = (ext[0] === "image")? "0" : (ext[0] === "video")? "1": null;

          const multi = {
            multimedia:resultado.url,
            multimediaType:type,
            postId:data.id
          }

          await postsModel.postMultimedia.create(multi)

          fs.unlink(file.path)
        })
      }

      res.send(data)
      
    } catch (error) {
      res.send(error)   
    }
}

module.exports = { setPost }