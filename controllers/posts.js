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
        console.log('Si hay archivos');
        console.log(req.files)

        await req.files.map(async (file)=>{

          const ext = file.mimetype.split('/');
          const type = (ext[0] === "image")? "0" : (ext[0] === "video")? "1": null;

          let resultado;

          // Prueba para solucionar la carga de video
          if(type === "0"){
            resultado = await cloudinary.uploader.upload(file.path,{ 
              public_id:`saludnet/users/user-${req.user.id}/Posts/Post-${data.id}/Multimedia-${Date.now()}` 
            },(error)=>{
              console.log(error)
            })
          }else{
            resultado = await cloudinary.uploader.upload(file.path,{ 
              resource_type: "video",
              public_id:`saludnet/users/user-${req.user.id}/Posts/Post-${data.id}/Multimedia-${Date.now()}` 
            },(error)=>{
              console.log(error)
            })
          }

          // const resultado = await cloudinary.uploader.upload(file.path,{ 
          //   public_id:`saludnet/users/user-${req.user.id}/Posts/Post-${data.id}/Multimedia-${Date.now()}` 
          // },(error)=>{
          //   console.log(error)
          // })

          const multi = {
            multimedia:resultado.url,
            multimediaType:type,
            postId:data.id
          }

          await postsModel.postMultimedia.create(multi)

          fs.unlink(file.path)
        })


      }else{
        // Data para enviar en el registro de la publicación
        console.log('nO HAY ARCHIVOS')
      }


      res.send(data)
      
    } catch (error) {
      res.send(error)   
    }
}

module.exports = { setPost }