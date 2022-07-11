export const ResultTimeline = (sequelize, DataTypes) => {
  return sequelize.define(
    "ResultTimeline",
    {
      resultID: {
        allowNull: false,
        type: DataTypes.STRING(25),
      },
      time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  )
}
