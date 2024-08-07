import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  published_date: { type: Date, required: true },
  status: { type: String, enum: ["published", "unpublished"], required: true },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
