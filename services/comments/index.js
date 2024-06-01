const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { request } = require('express');
const axios = require('axios');
const app = express();
app.use(bodyParser.json()); // use json to parse body
app.use(cors());
const commentsByPostId = {
  // key will be the id and value will be an array of comments
};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: 'pending' });
  commentsByPostId[req.params.id] = comments;

  // send event to event bus
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id, status: 'pending' }
  });

  res.status(201).send(comments);
});

// receieve events from event-bus
app.post('/events', async (req, res) => {
  console.log('Reveived event:', req.body.type);
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find(comment => {
      return comment.id === id;
    });
    comment.status = status;

    // send to event-bus
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content
      }
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on port 4001...');
});
