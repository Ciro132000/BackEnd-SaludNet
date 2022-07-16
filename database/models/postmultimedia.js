'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostMultimedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostMultimedia.init({
    multimedia: DataTypes.STRING,
    multimediaType: {
      type: DataTypes.ENUM,
      values: [0, 1]
    },
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostMultimedia',
  });
  return PostMultimedia;
};