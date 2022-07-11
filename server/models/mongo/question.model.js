import mongoose from 'mongoose'
const Schema = mongoose.Schema

// import * as Answer from '../../controllers/mongo/answer.controller.js'

//mixed type : process in frontend then send
//k lưu các giá trị default của property, lưu ở frontend
const questionSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    questionTypeId: {
      // 1: manyAns
      // 2: true/false
      // 3: matching
      // 4: textAns
      // 5: coding
      // 6: sql
      // 7: fillblank
      type: Number,
      required: true,
    },
    questionGroupID: {
      type: Number,
      required: true,
    },
    sectionId: {
      type: [Number],
    },
    correctAns: {
      type: Schema.Types.Mixed,
      required: function () {
        if (this.questionTypeId === 4) {
          return false
        }
        return true
      },
    },
    availableAns: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          _id: false,
        },
      ],
      required: function () {
        if ([1, 2].includes(this.questionTypeId)) {
          return true
        }
        return false
      },
    },
    matchAns: {
      type: {
        questions: [
          {
            id: {
              type: Number,
              required: true,
            },
            content: {
              type: String,
              required: true,
            },
            _id: false,
          },
        ],
        answers: [
          {
            id: {
              type: String,
              required: true,
            },
            content: {
              type: String,
              required: true,
            },
            _id: false,
          },
        ],
      },
      required: function () {
        if (this.questionTypeId === 3) {
          return true
        }
        return false
      },
    },
    fillBlankAns: {
      type: [
        {
          id: Number,
          content: [String],
          _id: false,
        },
      ],
      required: function () {
        if (this.questionTypeId === 7) {
          return true
        }
        return false
      },
    },
    is_answer_shuffled: {
      type: Boolean,
    },
    is_file_required: {
      type: Boolean,
      required: file_required,
    },
    has_muti_ans: {
      type: Boolean,
      default: false,
    },
    scoring_type: {
      //essay question, user score or auto
      type: String,
      enum: ['self', 'auto'],
      default: 'auto',
    },
    note_ques: {
      type: String,
    },
    duration: {
      type: Number,
      default: 0,
    },
    test_case: {
      type: [
        {
          input: {
            type: Schema.Types.Mixed,
            required: true,
          },
          output: {
            type: Schema.Types.Mixed,
            required: true,
          },
          hidden: {
            type: Boolean,
            required: true,
            default: true,
          },
          name: {
            type: String,
            required: true,
          },
          _id: false,
        },
      ],
    },
    code_stubs: {
      type: [
        {
          code: {
            type: String,
            required: true,
          },
          function_name: {
            type: String,
            required: true,
          },
          language: {
            type: String,
            enum: ['php', 'nodejs', 'java', 'python', 'c++'],
            required: true,
          },
          return_type: {
            type: String,
          },
          function_parameters: [
            {
              type: {
                type: String,
                required: true,
              },
              name: {
                type: String,
                required: true,
              },
              _id: false,
            },
          ],
          _id: false,
        },
      ],
    },
    sql_input: {
      type: String,
      required: sql_required,
    },
    time_limit: {
      //miliseconds
      type: Number,
    },
    //matching, coding, fillinblank
    calculate_score_type: {
      //tính điểm trên từng đáp án, testcase hoặc tất cả ms tính là điểm
      type: String,
      enum: ['each', 'all'],
      required: calculate_score_type_required,
    },
    expected_sql_output: {
      type: [String],
      required: sql_required,
    },
    sql_config: {
      type: [String],
      required: sql_required,
    },
    programming_langs_allow: {
      type: [String],
      default: programming_langs_default,
    },
  },
  {
    timestamps: true,
  }
)

questionSchema.path('test_case').validate(function (value) {
  if (this.questionTypeId === 5) {
    return value && value.length
  }
}, 'test_case can not be empty')

questionSchema.path('code_stubs').validate(function (value) {
  if (this.questionTypeId === 5) {
    return value && value.length
  }
}, 'code_stubs can not be empty')

// text ans doesnt need this field
function programming_langs_default() {
  if (this.questionTypeId === 5) {
    return ['php', 'nodejs', 'java', 'python', 'c++']
  }
  return undefined
}
function coding_required() {
  if (this.questionTypeId === 5) {
    return true
  }
  return false
}
function calculate_score_type_required() {
  if ([3, 5, 7].includes(this.questionTypeId)) {
    return true
  }
  return false
}
function sql_required() {
  if (this.questionTypeId === 6) {
    return true
  }
  return false
}
function file_required() {
  if ([4, 5].includes(this.questionTypeId)) {
    return true
  }
  return false
}
export default mongoose.model('question', questionSchema)
