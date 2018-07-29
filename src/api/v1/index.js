import { version } from '../../../package.json';
import { Router } from 'express';
import devicesRouter from './devicesRouter';

const api = Router();

api.use('/devices', devicesRouter);

api.get('/version', (req, res) => {
  res.status(200).send('1');
});

export default api;