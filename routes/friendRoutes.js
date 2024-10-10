// routes/friendRoutes.js
const express = require('express');
const router = express.Router();
const FriendController = require('../controllers/friendController');
const auth = require('../middleware/auth');

router.post('/request/:userId', auth, FriendController.sendFriendRequest);
router.post('/accept/:userId', auth, FriendController.acceptFriendRequest);
router.post('/reject/:userId', auth, FriendController.rejectFriendRequest);

module.exports = router;