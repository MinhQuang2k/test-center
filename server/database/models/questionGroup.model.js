export const QuestionGroup = (sequelize, DataTypes) => {
  return sequelize.define(
    "QuestionGroup",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  )
}
