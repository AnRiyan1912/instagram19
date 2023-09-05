'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class Comment extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   // define association here
   Comment.belongsTo(models.Post, {
    as: 'posts',
    foreignKey: 'post_id'
   });
   Comment.belongsTo(models.User, {
    as: 'users',
    foreignKey: 'user_id'
   });
  }
 }
 Comment.init(
  {
   post_id: DataTypes.INTEGER,
   user_id: DataTypes.INTEGER,
   comment: DataTypes.STRING
  },
  {
   sequelize,
   modelName: 'Comment'
  }
 );
 return Comment;
};
