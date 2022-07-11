export const ExamGroup = (sequelize, DataTypes) => {
  return sequelize.define(
    "ExamGroup",
    {
      user_id: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      name: {
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
