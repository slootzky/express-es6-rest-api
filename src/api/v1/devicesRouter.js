import { getDevicesState, switchDeviceState } from '../../data/devicesState';
import { getDevices } from '../../data/devices';

import { Router } from 'express';

const devicesStateRoute = Router();

devicesStateRoute.get('/', async (req, res) => {
  res.json(await getDevices());
});

devicesStateRoute.get('/:deviceId', async ({ params: { deviceId } }, res) => {
  const deviceState = (await getDevicesState()).find(deviceState => deviceState.deviceId == deviceId);
  const err = deviceState ? null : 'Device state not found!';
  err ? res.status(404).send(err) : res.json(deviceState);
});

devicesStateRoute.patch('/:deviceId/:state', async ({ body, params: { deviceId, state } }, res) => {
  const deviceIndex = (await getDevicesState()).findIndex(deviceState => deviceState.deviceId == deviceId);
  if (deviceIndex > -1) {
    const oldState = (await getDevicesState())[deviceIndex];
    const stateChange = { [state]: { value: body} };
    const newStateObject = { [state]: { ...oldState[state], ...stateChange[state] }}
    const newState = { ...oldState, ...newStateObject };
    await switchDeviceState(deviceIndex, newState);
    res.sendStatus(200);
  } else {
    res.status(404).send('Device state not found');
  }

  res.sendStatus(500);
});
export default devicesStateRoute;
