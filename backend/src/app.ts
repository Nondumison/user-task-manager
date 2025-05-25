import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.get('/', (_req, res) => {
    res.status(200).send('OK');
  });

export default app;