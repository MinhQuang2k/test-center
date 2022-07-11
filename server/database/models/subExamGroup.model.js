export const SubExamGroup = (sequelize, DataTypes) => {
   return sequelize.define('SubExamGroup', {
      ExamGroups_id: {
         allowNull: false,
         type: DataTypes.INTEGER,
         references: {
           model: "ExamGroup",
           key: "id",
            },
       },
      name: {
         allowNull: false,
         type: DataTypes.STRING,
         unique: true,
      },
   }, {
      timestamps:false
   })
}