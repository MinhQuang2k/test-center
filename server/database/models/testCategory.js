export const TestCategory = (sequelize, DataTypes) => {
   return sequelize.define('TestCategory', {
      name: {
         allowNull: false,
         type: DataTypes.STRING,
      },
   })
}