// controllers/userController.js
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};

exports.getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const friendPosts = await Post.find({ author: { $in: user.friends } }).sort('-createdAt');
    
    const postsWithFriendsComments = await Post.find({
      author: { $nin: [...user.friends, user._id] },
      'comments.author': { $in: user.friends }
    }).sort('-createdAt');

    const feed = [...friendPosts, ...postsWithFriendsComments];
    res.json(feed);
  } catch (error) {
    res.status(500).send('Error fetching feed');
  }
};