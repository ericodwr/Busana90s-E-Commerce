'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('banners', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 4,
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
      },
      adminId: { type: DataTypes.STRING, allowNull: false },
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
    await queryInterface.dropTable('banners');
  },
};
