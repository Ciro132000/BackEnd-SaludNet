const { verifyToken } = require('../utils/handleJwt')
const { cloudinary } = require('../utils/cloudinary')
const fs =require('fs-extra')
const { sequelize } = require('../config/db')

const  postsModel  = require('../models/posts')
const { QueryTypes } = require('sequelize');


// Crear una publicación
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

// Ver publicacion de un usuario
const getPostUser = async (req, res) =>{
  try {
    // SELECT p.id,p.content,p.idPrivacy,p.createdAt, m.id as idMultimedia, m.multimedia, m.multimediaType FROM Posts AS p INNER JOIN PostMultimedia AS m ON p.id=m.postId WHERE p.idUser=1;
    const { idUser } = req.query

    const [data, metadata] =await sequelize.query(
      `SELECT p.id, p.content, p.idPrivacy, Privacies.name AS namePrivacie, Privacies.icon AS iconPrivacie, p.post_type_id, 
      PostTypes.name AS PostType, u.firstName, u.LastName, u.userName, profi.image, p.createdAt AS datePost FROM Posts AS p 
      INNER JOIN Users AS u ON p.idUser = u.id INNER JOIN Profiles AS profi ON profi.id_user = u.id INNER JOIN Privacies ON Privacies.id = p.idPrivacy
      INNER JOIN PostTypes ON PostTypes.id = p.post_type_id WHERE p.idUser=${idUser}`
    )

    res.send({data})
  } catch (error) {
    
  }
}

// const multi = async (id)=>{
//   const [result, metadatad] =await sequelize.query(
//       `SELECT * FROM PostMultimedia WHERE PostMultimedia.postId=${id}`,
//   )

//   return result[0]
// }

// Ver todas las publicaciones para un usuario
const getAllPost = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

// Mostrar Multimedia de publicación
const multimediaPost = async (req, res) => {
  try {
    const data = await postsModel.postMultimedia.findAll({where:{ postId:req.params.id}});

    res.send({data})

  } catch (error) {
    
  }
}

module.exports = { setPost, getPostUser, getAllPost, multimediaPost }