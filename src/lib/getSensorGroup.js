import fs from 'fs';
import createStreamProcessors from './createStreamProcessors';

export const createGeneralGroup = () => {
  const name = 'group_all';
  return createStreamProcessors(name);
};

const generalGroup = createGeneralGroup();
export const getGeneralGroup = () => generalGroup;

export const createSensorGroup = (entry) => {
  const data = entry.replace(/['"]+/g, '').split(',');
  const name = data[0];

  return {
    name,
    uuidStartsWith: data[1],
    latitude: data[2],
    longitude: data[3],
    ...createStreamProcessors(name)
  };
};

const defaultPath = 'data/sensor_group_location.csv';
export const createSensorGroups = () => {
  const sensorGroups =
    fs.readFileSync(defaultPath, 'utf8')
      .split('\n')
      .map(entry => createSensorGroup(entry));

  sensorGroups.shift();

  return sensorGroups;
};

const sensorGroups = createSensorGroups();
export default (message) => {
  const sensorGroup = sensorGroups.find(sensorGroup =>
    RegExp(`(${sensorGroup.uuidStartsWith})`).test(message.sensor_uuid));

  return sensorGroup;
};
