let devicesState = [
  {
    deviceId: '1',
    state: { value: 'cool', type: 'picker', values: ['cool', 'warm', 'fan', 'off'] },
    temperature: { value: '19', type: 'range', values: { min: 0, max: 100 } },
  },
  { deviceId: '2', switch: { value: 'on', type: 'switch' } },
  { deviceId: '3', switch: { value: 'off', type: 'switch' } },
  {
    deviceId: '4',
    state: { value: 'warm', type: 'picker', values: ['cool', 'warm', 'fan', 'off'] },
    temperature: { value: '26', type: 'range', values: { min: 0, max: 100 } },
  },
];

export const getDevicesState = async _ => devicesState;
export const switchDeviceState = async newState => {
  devicesState = devicesState.map(deviceState => (deviceState.deviceId === newState.deviceId ? newState : deviceState));
};
