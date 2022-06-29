'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let countrys=[
      {
        name:'Argentina',
        codePhone: 54,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'Bolivia',
        codePhone: 591,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'Brasil',
        codePhone: 55,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'Chile',
        codePhone: 56,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'Colombia',
        codePhone: 57,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'Ecuador',
        codePhone: 593,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'Paraguay',
        codePhone: 595,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'Perú',
        codePhone: 51,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'Uruguay',
        codePhone: 598,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'Venezuela',
        codePhone: 58,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      }      
    ]

    return queryInterface.bulkInsert('Countries', countrys, {})
  },


  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Countries', null, {})
  }
};
