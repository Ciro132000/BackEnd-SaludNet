'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /* Sembrar */
    let types = [
      {
        name:'onlyText',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'multimedia',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      }
    ]

    return queryInterface.bulkInsert('PostTypes', types, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PostTypes', null, {})
  }
};
