'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class Post extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   // define association here
   Post.belongsTo(models.User, {
    as: 'users',
    foreignKey: 'user_id'
   });

   Post.hasMany(models.Comment, {
    as: 'comments',
    foreignKey: 'post_id'
   });

   Post.hasMany(models.PostLike, {
    as: 'postlikes',
    foreignKey: 'post_id'
   });
  }
 }
 Post.init(
  {
   caption: DataTypes.STRING(150),
   image_url: DataTypes.TEXT('long'),
   user_id: DataTypes.INTEGER
  },
  {
   sequelize,
   modelName: 'Post',
   paranoid: true
  }
 );
 return Post;
};
