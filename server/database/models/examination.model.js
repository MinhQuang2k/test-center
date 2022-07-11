export const Examination = (sequelize, DataTypes) => {
   return sequelize.define('Examination', {
      testId: {
         allowNull: false,
         type: DataTypes.INTEGER,
         references: {
           model: "Test",
           key: "id",
            },
       },
      name: {
         allowNull: false,
         type: DataTypes.STRING,
      },
   }, {
      timestamps:false
   })
}