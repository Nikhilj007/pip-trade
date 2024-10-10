// controllers/postController.js
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({ author: req.user.userId, content });
    await post.save();
    res.status(201).send('Post created successfully');
  } catch (error) {
    res.status(500).send('Error creating post');
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).send('Post not found');

    post.comments.push({ author: req.user.userId, content });
    await post.save();
    res.status(201).send('Comment added successfully');
  } catch (error) {
    res.status(500).send('Error adding comment');
  }
};