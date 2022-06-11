'use strict';

const { encrypt} = require('../../utils/handlePassword');

module.exports = {
  async up (queryInterface, Sequelize) {
    /* Sembrar */
    let passwordHash = await encrypt('12345678')
    let user = [
      {
        firstName: "ciro",
        lastName: "Candiotti",
        userName: "Ciro13",
        email: "ciro@candiotti.com",
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
