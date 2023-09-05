'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable('Users', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   fullName: {
    type: Sequelize.STRING
   },
   email: {
    type: Sequelize.STRING,
    unique: true
   },
   username: {
    type: Sequelize.STRING,
    unique: true
   },
   password: {
    type: Sequelize.STRING
   },
   image_url: {
    type: Sequelize.TEXT('long')
   },
   gender: {
    type: Sequelize.ENUM('male', 'female')
   },
   createdAt: {
    allowNull: false,
    type: Sequelize.DATE
   },
   updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
   },
   uid_google: { type: Sequelize.STRING, unique: true },
   uid_facebook: { type: Sequelize.STRING, unique: true }
  });
 },
 async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Users');
 }
};
