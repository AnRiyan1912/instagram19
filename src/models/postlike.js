'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class PostLike extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   // define association here
   PostLike.belongsTo(models.Post, {
    as: 'posts',
    foreignKey: 'post_id'
   });
   PostLike.belongsTo(models.User, {
    as: 'users',
    foreignKey: 'user_id'
   });
  }
 }
 PostLike.init(
  {
   post_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
   user_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true }
  },
  {
   sequelize,
   modelName: 'PostLike'
  }
 );
 return PostLike;
};
