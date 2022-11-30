import express from 'express';
import { setTimeout } from 'timers/promises';

const app = express();

app.get('/', async (_, res) => {
  await setTimeout(200);
  res.send('Hello');
});

app.get('/health', (_, res) => {
  res.send('ok');
});

export default app;
