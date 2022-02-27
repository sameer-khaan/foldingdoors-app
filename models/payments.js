"use strict";
module.exports = (sequelize, DataTypes) => {
  //Table - payments
  const payments = sequelize.define(
    "payments",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      animalTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.animal_type,
          key: "id",
        },
        allowNull: false,
        unique: {
          name: "composite_key",
          msg: "groupName with this animalTypeId already exist!",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "animalTypeId is required!",
          },
          notNull: {
            args: true,
            msg: "animalTypeId is required!",
          },
          len: {
            args: [1, 999],
            msg: "animalTypeId must be between 1 and 999!",
          },
          isInt: {
            args: true,
            msg: "animalTypeId must be an integer!",
          },
        },
      },
      groupName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "composite_key",
          msg: "groupName with this animalTypeId already exist!",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "groupName is required!",
          },
          notNull: {
            args: true,
            msg: "groupName is required!",
          },
          len: {
            args: [1, 999],
            msg: "groupName must be between 1 and 999 characters!",
          },
        },
      },
      groupDetails: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      name: {
        singular: "payments",
        plural: "payments"
      }
    }
  );
  payments.associate = function (models) {
    payments.belongsTo(models.orders, { foreignKey: "order_id", targetKey: "id" });
  };
  return payments;
};
