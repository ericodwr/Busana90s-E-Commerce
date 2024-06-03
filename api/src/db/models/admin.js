'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Banner, Category, Order, Promotion }) {
      // define association here
      this.hasMany(Banner, { as: 'banners', foreignKey: 'adminId' });
      this.hasMany(Category, { as: 'categories', foreignKey: 'adminId' });
      this.hasMany(Order, { as: 'orders', foreignKey: 'adminId' });
      this.hasMany(Promotion, { as: 'promotions', foreignKey: 'adminId' });
    }
  }
  Admin.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 4,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 4,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 4,
          isEmail: true,
        },
      },
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Admin',
    },
  );

  return Admin;
};
