export const Test = (sequelize, DataTypes) => {
   return sequelize.define('Test', {
    subExamGroupId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "SubExamGroup",
        key: "id",
      },
    },
    test_type: {
      allowNull: true,
      type: DataTypes.STRING,
      default:'normal'
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(),
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING(),
    },
    duration: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue:0,
    },
    has_multi_section: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    },
    is_all_question_shown: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    },
    has_multi_section: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    },
    language: {
      allowNull: true,
      type: DataTypes.STRING(),
      defaultValue:'VN',
    },
    audio_type:{
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    },
    is_question_shuffled: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    }
   }, {
    timestamps :true
  })
}