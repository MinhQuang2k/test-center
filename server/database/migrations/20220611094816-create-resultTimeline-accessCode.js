"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ResultTimelines", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      resultID: {
        allowNull: false,
        type: Sequelize.STRING(25),
      },
      time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    await queryInterface.createTable("AccessExamCodes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      examID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Examinations",
          key: "id",
        },
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ResultTimelines");
    await queryInterface.dropTable("AccessExamCodes");
  },
};
