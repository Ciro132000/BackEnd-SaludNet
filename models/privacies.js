const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db');

const Privacies = sequelize.define(
    "Privacies",
    {
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        icon:{
            type: DataTypes.STRING,
            allowNull:false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = Privacies;