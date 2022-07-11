export const AccessExamCode = (sequelize, DataTypes) => {
  return sequelize.define(
    "AccessExamCode",
    {
      examID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Examinations",
          key: "id",
        },
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
