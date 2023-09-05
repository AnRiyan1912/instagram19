'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable('Follows', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   followed_user_id: {
    type: Sequelize.INTEGER,
    references: {
     model: 'Users',
     key: 'id'
    }
   },
   following_user_id: {
    type: Sequelize.INTEGER,
    references: {
     model: 'Users',
     key: 'id'
    }
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
  await queryInterface.dropTable('Follows');
 }
};
