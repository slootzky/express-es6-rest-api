let devicesState = [
  { deviceId: '1', state: 'cool', temperature: '25' },
  { deviceId: '2', state: 'on',color:'white' },
  { deviceId: '3', state: 'on'},
  { deviceId: '4', state: 'warm', temperature: '28' },
];

export const getDevicesState = async _ => devicesState;
export const switchDeviceState = async (index, newState) => {
  devicesState = devicesState.map(deviceState => (deviceState.deviceId == newState.deviceId ? newState : deviceState));
};
// export default devicesState;
