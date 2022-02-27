'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'milking_parlour',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        parlourName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        milkingCapacity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        parlourDetails: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }
      });

    await queryInterface.createTable(
      'milking_shift',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        parlourId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "milking_parlour",
            key: "id",
          }
        },
        shiftName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        startTime: {
          type: Sequelize.TIME,
          allowNull: false
        },
        endTime: {
          type: Sequelize.TIME,
          allowNull: false
        },
        groupId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "animal_groups",
            key: "id",
          }
        },
        subGroupId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "animal_sub_group",
            key: "id",
          }
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        shiftDetails: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE
        },
      },
    );

    await queryInterface.createTable(
      'milking_output',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        parlourId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "milking_parlour",
            key: "id",
          }
        },
        shiftId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "milking_shift",
            key: "id",
          }
        },
        tagId: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "animal_profile",
            key: "tagId",
          }
        },
        milkingDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        milkQuantity: {
          type: Sequelize.DECIMAL(4, 2),
          allowNull: false
        },
        animalTemperature: {
          type: Sequelize.DECIMAL(4, 2),
          allowNull: true
        },
        environmentTemperature: {
          type: Sequelize.DECIMAL(4, 2),
          allowNull: true
        },
        isManualEntry: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }
      });

    await queryInterface.createTable(
      'milking_output_audit',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        outputId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        parlourId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        shiftId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        tagId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        milkingDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        milkQuantity: {
          type: Sequelize.DECIMAL(4, 2),
          allowNull: false
        },
        animalTemperature: {
          type: Sequelize.DECIMAL(4, 2),
          allowNull: true
        },
        environmentTemperature: {
          type: Sequelize.DECIMAL(4, 2),
          allowNull: true
        },
        isManualEntry: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        modifiedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });

  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('milking_output_audit');
    await queryInterface.dropTable('milking_output');
    await queryInterface.dropTable('milking_shift');
    await queryInterface.dropTable('milking_parlour');
  }
};