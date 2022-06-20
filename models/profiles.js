const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db');

const usersModel = require('./users')

const Profil = sequelize.define(
    "Profiles",
    {
        day_birth:{
            type: DataTypes.DATEONLY,
            allowNull:false,
        },
        gender:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        phone:{
            type: DataTypes.REAL,
            allowNull:false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        image_header:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        id_country:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        id_user:{
            type: DataTypes.INTEGER,
            allowNull:false,
        }
    },
    {
        timestamps: true,
    }
);

// Profil.hasOne(usersModel, {foreignKey: 'id_user'});
// Profil.belongsTo(usersModel, {foreignKey: 'id_user'})

module.exports = Profil;