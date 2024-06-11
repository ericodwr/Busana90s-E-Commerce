'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Shipments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Shipments');
  },
};
