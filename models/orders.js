module.exports = (sequelize, DataTypes) => {
  //Table - orders
  const orders = sequelize.define(
    "orders",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quote_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "name is required!",
          },
          notNull: {
            args: true,
            msg: "name is required!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "email is required!",
          },
          notNull: {
            args: true,
            msg: "email is required!",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "phone is required!",
          },
          notNull: {
            args: true,
            msg: "phone is required!",
          },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      postcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      data: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      name: {
        singular: "orders",
        plural: "orders"
      }
    }
  );

  orders.associate = function (models) {
    orders.hasMany(models.payments, { foreignKey: "order_id", sourceKey: "id" });
  };

  return orders;
};
