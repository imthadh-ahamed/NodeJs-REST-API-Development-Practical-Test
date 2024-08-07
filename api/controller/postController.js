import postService from "../services/postServices.js";

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page
    const filter = {
      title: req.query.title || "",
      category: req.query.status || "",
    };

    // Fetch posts and total count using the service
    const { posts, total } = await postService.getAllPosts(page, limit, filter);

    res.json({
      posts,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get post by ID function declaration
export const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create post declaration
export const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update post declaration
export const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete post declaration
export const deletePost = async (req, res) => {
  try {
    const result = await postService.deletePost(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
