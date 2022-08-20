'use strict';

const { encrypt} = require('../../utils/handlePassword');

module.exports = {
  async up (queryInterface, Sequelize) {
    /* Sembrar */
    let passwordHash = await encrypt('123456789')
    let user = [
      {
        firstName: "Ciro",
        lastName: "Candiotti",
        userName: "Ciro13",
        email: "ciro@candiotti.com",
        password: passwordHash,
        is_active: true,
        is_admin: true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        firstName: "Mari Carmen",
        lastName: "Gutierrez",
        userName: "MariGuti",
        email: "Mari@guti.com",
        password: passwordHash,
        is_active: true,
        is_admin: true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        firstName: "Carlos Andres",
        lastName: "Mendoza",
        userName: "CarlosMendoza",
        email: "carlos@mendoza.com",
        password: passwordHash,
        is_active: true,
        is_admin: true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        firstName: "Jesus",
        lastName: "Arias",
        userName: "JesusArias",
        email: "jesus@arias.com",
        password: passwordHash,
        is_active: true,
        is_admin: true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      }
    ]

    return queryInterface.bulkInsert('Users', user, {})
  },

  async down (queryInterface, Sequelize) {
    /* Eliminar los seeders */

    return queryInterface.bulkDelete('Users', null, {})
  }
};
