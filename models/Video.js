import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required" // 충족하지 못하면 error 메세지
  },
  title: {
    type: String,
    requried: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment" // Video와 relation 연결
    }
  ]
});

const model = mongoose.model("Video", VideoSchema);
export default model;
