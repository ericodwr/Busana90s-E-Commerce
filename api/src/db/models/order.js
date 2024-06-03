'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Admin, Customer, Shipment, Order_Details }) {
      this.belongsTo(Admin, { foreignKey: 'adminId', as: 'admin' });
      this.belongsTo(Customer, { foreignKey: 'customerId', as: 'customers' });
      this.belongsTo(Shipment, { foreignKey: 'shipmentId', as: 'shipments' });
      this.hasMany(Order_Details, {
        foreignKey: 'orderId',
        as: 'order_details',
      });
    }
  }
  Order.init(
    {
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      snap_token: DataTypes.STRING,
      snap_redirect_url: DataTypes.STRING,
      payment_method: DataTypes.STRING,
      adminId: { type: DataTypes.STRING },
      customerId: { type: DataTypes.STRING, allowNull: false },
      shipmentId: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
