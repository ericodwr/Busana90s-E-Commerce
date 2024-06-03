'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order }) {
      // define association here
      this.hasOne(Order, { foreignKey: 'customerId', as: 'orders' });
    }
  }
  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 2,
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
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
    },
  );
  return Customer;
};
