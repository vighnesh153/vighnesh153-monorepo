import express from 'express';
import { sleep } from '@vighnesh153/utils';

const app = express();

app.use(express.json());

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
    message: '201',
    receivedSearchParams: req.query,
    receivedHeaders: req.headers,
  });
});

app.get('/401', (req, res) => {
  res.status(401).send('You are not authenticated');
});

app.get('/403', (req, res) => {
  res.status(403).json({
    message: 'You are not authorized',
    receivedSearchParams: req.query,
    receivedHeaders: req.headers,
  });
});

app.get('/500', (req, res) => {
  res.status(500).send('Oh crap! Something went wrong...');
});

app.post('/200', (req, res) => {
  res.json({
    message: '200',
    receivedSearchParams: req.query,
    receivedHeaders: req.headers,
    receivedData: req.body,
  });
});

app.post('/201', async (req, res) => {
  await sleep(1000);
  res.json({
    message: '201',
    receivedSearchParams: req.query,
    receivedHeaders: req.headers,
    receivedData: req.body,
  });
});

app.post('/401', (req, res) => {
  res.status(401).send('You are not authenticated');
});

app.post('/403', (req, res) => {
  res.status(403).json({
    message: 'You are not authorized',
    receivedSearchParams: req.query,
    receivedHeaders: req.headers,
    receivedData: req.body,
  });
});

app.post('/500', (req, res) => {
  res.status(500).send('Oh crap! Something went wrong...');
});

export { app };
