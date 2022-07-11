import mongoose from "mongoose"
const Schema = mongoose.Schema

const resultDetailSchema = new Schema({
  questionID: {
    type: Schema.Types.ObjectId,
    ref: "question",
    required: true,
  },
  resultID: {
    type: Schema.Types.ObjectId,
    ref: "result",
    required: true,
  },
  userAns: {
    type: Schema.Types.Mixed,
  },
})

export default mongoose.model("resultDetail", resultDetailSchema)
