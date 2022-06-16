'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      day_birth: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.INTEGER
      },
      phone: {
        type: Sequelize.REAL
      },
      image: {
        type: Sequelize.STRING
      },
      image_header: {
        type: Sequelize.STRING
      },
      id_country: {
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Profiles');
  }
};