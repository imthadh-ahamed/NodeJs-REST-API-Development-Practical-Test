import Post from "../model/postmodel.js";

const getAllPosts = async (page, limit, filter) => {
  const query = {};

  // Filtering by title
  if (filter.title) {
    query.title = { $regex: filter.title, $options: "i" };
  }

  // Filtering by status
  if (filter.status) {
    query.status = filter.status;
  }

  // Finding posts with pagination and filtering
  const posts = await Post.find(query)
    .skip((page - 1) * limit)
    .limit(limit);   

  // Counting the total number of documents matching the filter
  const total = await Post.countDocuments(query);

  return { posts, total }; // Return the posts and total count
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
