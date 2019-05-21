import express from 'express';
import cors from 'cors';

import subscribeToStream from './src/lib/subscribeToStream';
import publishToView from './src/lib/publishToView';

const app = express();
const port = process.env.PORT || 3000;

subscribeToStream();

app
  .use(cors())
  .get('/api', publishToView);

app.listen(port, () => console.log(`
🐒  Server running at http://localhost:${port}`));