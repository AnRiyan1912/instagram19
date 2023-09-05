'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class Message extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   // define association here
   Message.belongsTo(models.User, {
    as: 'user_senders',
    foreignKey: 'user_sender_id'
   });

   Message.belongsTo(models.User, {
    as: 'user_recievers',
    foreignKey: 'user_reciever_id'
   });
  }
 }
 Message.init(
  {
   user_sender_id: DataTypes.INTEGER,
   user_reciever_id: DataTypes.INTEGER,
   message: DataTypes.STRING
  },
  {
   sequelize,
   modelName: 'Message'
  }
 );
 return Message;
};
