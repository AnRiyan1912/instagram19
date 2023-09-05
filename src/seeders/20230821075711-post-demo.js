'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */
  return queryInterface.bulkInsert(`Posts`, [
   {
    caption: 'LEGO BMW \n ▪️Follow us @e36broo LIKE COMMENT SHARE',
    image_url:
     'https://scontent-xsp1-3.cdninstagram.com/v/t51.2885-15/368174539_1704098960095311_3048442404256426461_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-xsp1-3.cdninstagram.com&_nc_cat=1&_nc_ohc=RDnPriEY4DIAX-pGOn7&edm=AI8qBrIBAAAA&ccb=7-5&ig_cache_key=MzE3MjgwMTg5NzI5ODU0MDQ4MQ%3D%3D.2-ccb7-5&oh=00_AfAHZtPGuqugvLiwODy-Vjk7d2xSduu469tG6HnEUL1OZQ&oe=64E7AF89&_nc_sid=469e9a',
    user_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    caption: '',
    image_url:
     'https://scontent-xsp1-3.cdninstagram.com/v/t51.2885-15/336319666_785899802422029_9052621263620515469_n.webp?stp=dst-jpg_e35&_nc_ht=scontent-xsp1-3.cdninstagram.com&_nc_cat=109&_nc_ohc=OwGBSyDMP7IAX-Dr_w_&edm=AI8qBrIBAAAA&ccb=7-5&ig_cache_key=MzA2MjA1MDgwNTgwNDM0NzI0OA%3D%3D.2-ccb7-5&oh=00_AfBVLsGVjnkkp8oYqMXeVgCkvvi1A2COKk0ajH10t0YGOA&oe=64E80DC3&_nc_sid=469e9a',
    user_id: 2,
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    caption: 'BREATHTAKING 👌 \n Owner @e30_336is \n Photos @artapfoto',
    image_url:
     'https://scontent-xsp1-1.cdninstagram.com/v/t51.2885-15/368443399_236880105997762_44805334797572246_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-xsp1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=dTseE9Jgg8EAX8Mb7Fp&edm=AI8qBrIBAAAA&ccb=7-5&ig_cache_key=MzE3MzIwNjUyNTk0MDUxNTgzMQ%3D%3D.2-ccb7-5&oh=00_AfCJjyPO8tQhFjF3ErkVmj6cbylvbm-J1h1glSaLi9fUuw&oe=64E8DA95&_nc_sid=469e9a',
    user_id: 3,
    createdAt: new Date(),
    updatedAt: new Date()
   }
  ]);
 },

 async down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
 }
};
