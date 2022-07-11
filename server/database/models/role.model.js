export const Role = (sequelize, DataTypes) => {
  return sequelize.define(
    "Role",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
    },
    {
      timestamps: false,
    }
  )
}
