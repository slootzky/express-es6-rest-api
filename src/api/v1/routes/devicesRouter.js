import { getDeviceState, patchDeviceState, getDevices } from '../handlers/deviceStateHandler';

import { Router } from 'express';

const devicesStateRoute = Router();

devicesStateRoute.get('/', async (req, res) => {
  res.json(await getDevices());
});

devicesStateRoute.get('/:deviceId', async ({ params: { deviceId } }, res) => {
  try {
    const deviceState = await getDeviceState(deviceId);
    res.json(deviceState);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

devicesStateRoute.patch('/:deviceId/:state', async ({ body, params: { deviceId, state } }, res) => {
  try {
    await patchDeviceState(deviceId, state, body);
    res.sendStatus(200);
  } catch (err) {
    if (err.errorCode && err.errorCode === 404) {
      res.status(404).send(err.message);
    } else {
      console.log('this is error!!!' , err);
      res.sendStatus(500);
    }
  }
});
export default devicesStateRoute;
