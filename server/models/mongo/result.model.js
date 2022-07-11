import mongoose from "mongoose";
const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    score: {
      type: Number,
    },
    complete_percent: {
      type: Number,
      default: 0,
    },
    is_passed: {
      type: Boolean,
    },
    max_score: {
      type: Number,
      default: 0,
    },
    startAt: {
      type: Date,
      default: null,
    },
    endAt: {
      type: Date,
      default: null,
    },
    time_do_test: {
      type: String,
    },
    group: {
      type: String,
    },
    job_position: {
      type: String,
    },
    identify_code: {
      type: String,
    },
    accesscodeID: {
      type: Number,
    },
    is_grading_it_questions: {
      type: Boolean,
      default: false,
    },
    need_grade: {
      type: Number,
    },
    total_question: {
      type: Number,
      default: 0,
    },
    total_fail_question: {
      type: Number,
      default: 0,
    },
    total_true_question: {
      type: Number,
      default: 0,
    },
    userID: {
      type: Number,
      required: true,
    },
    examinationsID: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("result", resultSchema);
