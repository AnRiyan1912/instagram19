'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable('Posts', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   caption: {
    type: Sequelize.STRING
   },
   image_url: {
    type: Sequelize.TEXT('long')
   },
   createdAt: {
    allowNull: false,
    type: Sequelize.DATE
   },
   updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
   },
   user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
     model: 'Users',
     key: 'id'
    }
   }
  });
 },
 async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Posts');
 }
};
