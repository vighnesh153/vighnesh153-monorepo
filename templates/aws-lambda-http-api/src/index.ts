import serverless from 'serverless-http';
import express from 'express';

const app = express();

app.get('/', (req, res) =>
  res.status(200).json({
    message: 'Hello world from root!',
  })
);

app.get('/path', (req, res) =>
  res.status(200).json({
    message: 'Hello from path!',
  })
);

app.use((req, res) =>
  res.status(404).json({
    error: 'Not Found',
  })
);

export const handler = serverless(app);
