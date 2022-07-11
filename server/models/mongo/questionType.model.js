import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "questions",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "questionType",
  questionTypeSchema,
  "questionType"
);
