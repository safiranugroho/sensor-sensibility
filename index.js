import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app
  .use(cors())
  .get('/api', (request, response) => {
    response.status(200).set({
      'connection': 'keep-alive',
      'cache-control': 'no-chace',
      'content-Type': 'text/event-stream'
    });

    response.write(`data: Hi from server!\n\n`);
  });

app.listen(port, () => console.log(`Listening on port ${port}!`));