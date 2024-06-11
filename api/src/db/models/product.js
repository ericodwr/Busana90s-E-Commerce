'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Product_Imgs, Order_Details }) {
      this.belongsTo(Category, { foreignKey: 'categoryId', as: 'categories' });
      this.hasMany(Product_Imgs, {
        foreignKey: 'productId',
        as: 'product_imgs',
      });
      // this.hasOne(Order_Details, {
      //   as: 'order_details',
      //   foreignKey: 'productId',
      // });
    }
  }
  Product.init(
    {
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
