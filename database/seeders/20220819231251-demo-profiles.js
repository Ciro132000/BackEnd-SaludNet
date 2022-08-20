'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let profiles = [
      {
        day_birth: '2000-07-13',
        gender: 1,
        phone: 929739991,
        image: 'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1655685320/saludnet/users/user-1/perfil/perfil-user-1.jpg',
        image_header: 'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1655690844/saludnet/users/user-1/portada/portada-user-1.jpg',
        id_country: 8,
        id_user: 1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        day_birth: '2000-07-13',
        gender: 2,
        phone: 929736598,
        image: 'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1660951740/saludnet/users/user-2/perfil/Screenshot_20220623-011942_1_a2vfd0.jpg',
        image_header: 'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1660951744/saludnet/users/user-2/portada/mujer-maquillaje-e1583340248548-680x365_c_acvnpt.jpg',
        id_country: 2,
        id_user: 2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        day_birth: '2000-07-13',
        gender: 1,
        phone: 962486357,
        image: 'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1660952068/saludnet/users/user-3/perfil/istockphoto-1130462892-170667a_gnqu1q.jpg',
        image_header: 'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1660951914/saludnet/users/user-3/portada/zgCrv_yuexro.jpg',
        id_country: 7,
        id_user: 3,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        day_birth: '2000-07-13',
        gender: 1,
        phone: 964821754,
        image: 'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1660952213/saludnet/users/user-4/perfil/istockphoto-1148604663-170667a_cfkuuj.jpg',
        image_header: 'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1660951911/saludnet/users/user-4/portada/images_xnoblt.jpg',
        id_country: 1,
        id_user: 4,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      }
    ]

    return queryInterface.bulkInsert('Profiles', profiles, {})
  },

  async down (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Profiles', null, {})
  }
};
