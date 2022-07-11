export const Section = (sequelize, DataTypes) => {
  return sequelize.define(
    'Section',
    {
      testId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Test',
          key: 'id',
        },
        unique: 'unique_name',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: 'unique_name',
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  )
}
