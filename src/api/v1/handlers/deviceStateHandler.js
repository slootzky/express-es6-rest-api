import { getDevicesState, switchDeviceState } from '../../../data/devicesState';
import { getDevices as getDevicesFromStorage } from '../../../data/devices';

export const getDevices = async () => await getDevicesFromStorage();
export const getDeviceState = async deviceId => {
  const deviceState = (await getDevicesState()).find(deviceState => deviceState.deviceId === deviceId);
  if (!deviceState) throw new Error('Device not found!');
  return deviceState;
};

export const patchDeviceState = async (deviceId, stateName, newValue) => {
  const deviceIndex = (await getDevicesState()).findIndex(deviceState => deviceState.deviceId === deviceId);
  if (deviceIndex > -1) {
    const oldState = (await getDevicesState())[deviceIndex];

    const stateChange = { [stateName]: { value: newValue } };
    const nestedStateObject = { [stateName]: { ...oldState[stateName], ...stateChange[stateName] } };
    const newState = { ...oldState, ...nestedStateObject };
    await switchDeviceState(newState);
  } else {
    throw new Error({ message: 'Device not found!', errorCode: 404 });
  }
};
