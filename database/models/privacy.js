'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Privacy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Privacy.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    description: DataTypes.STRING  
  }, {
    sequelize,
    modelName: 'Privacy',
  });
  return Privacy;
};