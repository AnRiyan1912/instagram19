'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable('Messages', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   user_sender_id: {
    type: Sequelize.INTEGER,
    references: {
     model: 'Users',
     key: 'id'
    }
   },
   user_reciever_id: {
    type: Sequelize.INTEGER,
    references: {
     model: 'Users',
     key: 'id'
    }
   },
   message: {
    type: Sequelize.STRING
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
  await queryInterface.dropTable('Messages');
 }
};
