"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //return Promise.all([
    await queryInterface.createTable(
      "animal_type",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        animalName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        taggingConvention: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        animalDetails: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      });

    await queryInterface.createTable(
      "animal_status",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        isCloseProfile: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        statusDetails: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      });

    await queryInterface.createTable(
      "animal_breed",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        animalTypeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "animal_type",
            key: "id",
          },
          unique: "composite_key",
        },
        breedName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: "composite_key",
        },
        breedDetails: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        uniqueKeys: {
          composite_key: {
            customIndex: true,
            fields: ["animalTypeId", "breedName"],
          },
        },
      }
    );

    await queryInterface.createTable(
      "animal_groups",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        animalTypeId: {
          type: Sequelize.INTEGER,
          references: {
            model: "animal_type",
            key: "id",
          },
          allowNull: false,
          unique: "composite_key",
        },
        groupName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: "composite_key",
        },
        groupDetails: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        uniqueKeys: {
          composite_key: {
            customIndex: true,
            fields: ["animalTypeId", "groupName"],
          },
        },
      }
    );

    await queryInterface.createTable(
      "animal_sub_group",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        groupId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: "composite_key",
          references: {
            model: "animal_groups",
            key: "id",
          },
        },
        subGroupName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: "composite_key",
        },
        subGroupDetails: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        uniqueKeys: {
          composite_key: {
            customIndex: true,
            fields: ["groupId", "subGroupName"],
          },
        },
      }
    );

    await queryInterface.createTable(
      "animal_profile",
      {
        tagId: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        oldTagId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        animalTypeId: {
          type: Sequelize.INTEGER,
          references: {
            model: "animal_type",
            key: "id",
          },
          allowNull: false,
        },
        birthDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        purchaseDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        breedId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "animal_breed",
            key: "id",
          },
        },
        statusId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "animal_status",
            key: "id",
          },
        },
        groupId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "animal_groups",
            key: "id",
          },
        },
        subGroupId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "animal_sub_group",
            key: "id",
          },
        },
        noOfChildren: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        parentTagId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      });

    await queryInterface.addConstraint(
      'animal_profile',
      ["parentTagId"], {
      name: "animal_profile_parentTagId_fk",
      type: "FOREIGN KEY",
      references: {
        table: "animal_profile",
        field: "tagId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    }
    );

    await queryInterface.createTable(
      "animal_group_history",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        tagId: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "animal_profile",
            key: "tagId",
          },
        },
        groupId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "animal_groups",
            key: "id",
          },
        },
        subGroupId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "animal_sub_group",
            key: "id",
          },
        },
        entryDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        exitDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        noOfDays: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      });

    await queryInterface
      .createTable('animal_last_tag',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          taggingConvention: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            references: {
              model: "animal_type",
              key: "taggingConvention",
            },
          },
          tagNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        },
        {
          uniqueKeys: {
            composite_key: {
              customIndex: true,
              fields: ["taggingConvention", "tagNumber"],
            },
          },
        });

    await queryInterface.createTable(
      "animal_profile_audit",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        tagId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        oldTagId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        animalTypeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        birthDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        purchaseDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        breedId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        statusId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        groupId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        subGroupId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        noOfChildren: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        parentTagId: {
          type: Sequelize.STRING,
          allowNull: true,
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


    //  ])
  },

  down: async (queryInterface, Sequelize) => {
    //return Promise.all([
    await queryInterface.dropTable("animal_profile_audit");
    await queryInterface.dropTable("animal_group_history");
    await queryInterface.dropTable("animal_profile");
    await queryInterface.dropTable("animal_sub_group");
    await queryInterface.dropTable("animal_groups");
    await queryInterface.dropTable("animal_breed");
    await queryInterface.dropTable("animal_status");
    await queryInterface.dropTable('animal_last_tag');
    await queryInterface.dropTable("animal_type");
    // ])
  },
};
