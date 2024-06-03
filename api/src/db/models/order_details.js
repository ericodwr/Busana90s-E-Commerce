'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, Order }) {
      // define association here
      this.belongsTo(Order, { foreignKey: 'orderId', as: 'orders' });
      this.belongsTo(Product, { foreignKey: 'productId', as: 'products' });
    }
  }
  Order_Details.init(
    {
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: {
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
    },
    {
      sequelize,
      modelName: 'Order_Details',
    },
  );
  return Order_Details;
};
