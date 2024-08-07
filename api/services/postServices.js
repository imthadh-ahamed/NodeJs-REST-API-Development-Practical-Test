import Post from "../model/postmodel.js";

const getAllPosts = async () => {
  return await Post.find();
};

const getPostById = async (id) => {
  return await Post.findById(id);
};

const createPost = async (data) => {
  const post = new Post(data);
  return await post.save();
};

const updatePost = async (id, data) => {
  return await Post.findByIdAndUpdate(id, data, { new: true });
};

const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
