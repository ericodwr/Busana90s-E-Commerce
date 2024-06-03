'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order }) {
      // define association here
      this.hasOne(Order, { foreignKey: 'shipmentId', as: 'orders' });
    }
  }
  Shipment.init(
    {
      courier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      services: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shipping_cost: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receipt_number: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Shipment',
    },
  );
  return Shipment;
};
