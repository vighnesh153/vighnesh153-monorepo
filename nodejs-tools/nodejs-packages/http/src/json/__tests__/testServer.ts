import express from 'express';
import { sleep } from '@vighnesh153/utils';

const app = express();

app.get('/200', (req, res) => {
  res.json({
    message: '200',
    receivedSearchParams: req.query,
    receivedHeaders: req.headers,
  });
});

app.get('/201', async (req, res) => {
  await sleep(1000);
  res.json({
    message: '200',
    receivedSearchParams: req.query,
    receivedHeaders: req.headers,
  });
});

app.get('/401', (req, res) => {
  res.status(401).send('You are not authenticated');
});

app.get('/403', (req, res) => {
  res.status(403).send({
    message: 'You are not authorized',
    receivedSearchParams: req.query,
    receivedHeaders: req.headers,
    cookies: req.cookies,
  });
});

app.get('/500', (req, res) => {
  res.status(500).send('Oh crap! Something went wrong...');
});

export { app };
