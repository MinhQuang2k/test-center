export const User = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      roleID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Role",
          key: "id",
        },
      },
      fullname: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      dateOfBirth: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      phoneNumber: {
        allowNull: true,
        type: DataTypes.STRING(12),
      },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING(20),
      },
      isActive: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
