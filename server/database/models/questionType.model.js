export const QuestionType = (sequelize, DataTypes) => {
   return sequelize.define('questionType', {
      name: {
         allowNull: false,
         type: DataTypes.STRING(),
       },
   }, {
    timestamps :true
  })
}