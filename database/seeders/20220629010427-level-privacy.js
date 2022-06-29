'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let levelPrivacies = [
      {
        name:'Público',
        description:'Todos lo pueden ver, incluso personas que no esten registradas',
        icon: 'bi bi-globe2',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'Amigos',
        description:'Solo tu lista de amigos lo pueden ver.',
        icon: 'bi bi-people-fill',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        name:'Privado',
        description:'Solo tu y personas etiquetadas lo pueden ver',
        icon: 'bi bi-shield-lock-fill',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      }
    ]

    return queryInterface.bulkInsert('Privacies', levelPrivacies, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Privacies', null, {})
  }
};
