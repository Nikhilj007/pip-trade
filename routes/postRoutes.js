// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/', auth, PostController.createPost);
router.post('/:postId/comment', auth, PostController.addComment);

module.exports = router;