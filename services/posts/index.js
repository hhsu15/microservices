const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json()); // use json to parse body
app.use(cors()); // use json to parse body
const posts = {};

// get all the posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// post with id
app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex'); // create a 4 bytes random id
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  // emit event to event bus
  // await axios.post('http://localhost:4005/events', {
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: { id, title }
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Reveived event:', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('Updated!!');
  console.log('Listening on 4000');
});
