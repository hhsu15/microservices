const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  console.log('Reveived event:', req.body.type);
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    console.log('inside the moderator', data);
    // run some business logics here
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    // emit to event bus

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    });
  }
  // make sure you send otherwise the request is going to hang forever
  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
