'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subExamGroupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SubExamGroups',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      test_type: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: 'normal',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(),
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING(),
      },
      duration: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      has_multi_section: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_all_question_shown: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      has_multi_section: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      language: {
        allowNull: true,
        type: Sequelize.STRING(),
        defaultValue: 'VN',
      },
      audio_type: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_question_shuffled: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
    await queryInterface.createTable('Examinations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      testId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tests',
          key: 'id',
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    await queryInterface.createTable('Sections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      testId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tests',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    });
    queryInterface.addConstraint('Sections', {
      fields: ['testId', 'name'],
      type: 'unique',
      name: 'unique_section_test_name',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Examinations');
    await queryInterface.dropTable('Sections');

    await queryInterface.dropTable('Tests');
  },
};
