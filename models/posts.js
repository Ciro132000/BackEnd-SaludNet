const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db');

const Posts = sequelize.define(
    "Posts",
    {
        content:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        idPrivacy:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        idUser:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        post_type_id:{
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: true,
    }
);

const postMultimedia = sequelize.define(
    "PostMultimedia",
    {
        multimedia:{
            type:DataTypes.STRING
        },
        multimedia:{
            type:DataTypes.STRING
        },
        multimediaType:{
            type: DataTypes.ENUM,
            values: [0, 1]
        },
        postId:{
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps:true,
    }
)

module.exports = {Posts, postMultimedia};