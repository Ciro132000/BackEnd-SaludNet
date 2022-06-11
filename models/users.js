const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db');

const User = sequelize.define(
    "Users",
    {
        firstName:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        userName:{
            type: DataTypes.NUMBER,
        },
        email:{
            type: DataTypes.STRING,
        },
        password:{
            type: DataTypes.STRING,
        },
        is_active:{
            type: DataTypes.BOOLEAN,
        },
        is_admin:{
            type: DataTypes.BOOLEAN,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = User;