// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('../config/config');

const userRoutes = require('../routes/userRoutes');
const postRoutes = require('../routes/postRoutes');
const friendRoutes = require('../routes/friendRoutes');

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.get('/', (req, res) => {
  //send html for frontend
  res.send(`<html>
            <h1>Pip Trade Social media api</h1>
            <h3>Endpoints</h3>
            <h4>Users</h4>
            <p>Feed:-   GET /api/users/feed</p>
            <p>New User Register:-  POST /api/users/register</p>
            <p>User Login:-  POST /api/users/login</p>
            <h4>Posts</h4>
            <p>Create Post:-  POST /api/posts</p>
            <p>Add Comment:-  POST /api/posts/:postId/comment</p>
            
            <h4>Friends</h4>
            <p>Send Friend Request:-  POST /api/friends/request/:userId</p>
            <p>Accept Friend Request:-  POST /api/friends/accept/:userId</p>
            <p>Reject Friend Request:-  POST /api/friends/reject/:userId</p>

        </html>`)
});
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/friends', friendRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});