export const QuestionTest = (sequelize, DataTypes) => {
   return sequelize.define('questionTest', {
    sectionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Section",
        key: "id",
         },
    },
    questionId: {
      allowNull: false,
      type: DataTypes.STRING(24),
    }
   }, {
     timestamps: false
  })
}