// controllers/friendController.js
const User = require('../models/User');

exports.sendFriendRequest = async (req, res) => {
  try {
    const sender = await User.findById(req.user.userId);
    const receiver = await User.findById(req.params.userId);

    if (!receiver) return res.status(404).send('User not found');
    if (sender.friends.includes(receiver._id)) return res.status(400).send('Already friends');
    if (receiver.friendRequests.includes(sender._id)) return res.status(400).send('Friend request already sent');

    receiver.friendRequests.push(sender._id);
    await receiver.save();
    res.send('Friend request sent');
  } catch (error) {
    res.status(500).send('Error sending friend request');
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const receiver = await User.findById(req.user.userId);
    const sender = await User.findById(req.params.userId);

    if (!sender) return res.status(404).send('User not found');
    if (!receiver.friendRequests.includes(sender._id)) return res.status(400).send('No friend request from this user');

    receiver.friendRequests = receiver.friendRequests.filter(id => !id.equals(sender._id));
    receiver.friends.push(sender._id);
    sender.friends.push(receiver._id);

    await receiver.save();
    await sender.save();
    res.send('Friend request accepted');
  } catch (error) {
    res.status(500).send('Error accepting friend request');
  }
};

exports.rejectFriendRequest = async (req, res) => {
  try {
    const receiver = await User.findById(req.user.userId);
    const sender = await User.findById(req.params.userId);

    if (!sender) return res.status(404).send('User not found');
    if (!receiver.friendRequests.includes(sender._id)) return res.status(400).send('No friend request from this user');

    receiver.friendRequests = receiver.friendRequests.filter(id => !id.equals(sender._id));
    await receiver.save();
    res.send('Friend request rejected');
  } catch (error) {
    res.status(500).send('Error rejecting friend request');
  }
};