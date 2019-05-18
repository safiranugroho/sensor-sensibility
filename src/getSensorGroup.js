import fs from 'fs';
import createStreamProcessor from './createStreamProcessor';

export const createSensorGroup = (entry) => {
  const data = entry.replace(/['"]+/g, '').split(',');
  const name = data[0];

  return {
    name,
    uuidStartsWith: data[1],
    latitude: data[2],
    longitude: data[3],
    subject: createStreamProcessor(name)
  };
};

const defaultPath = 'data/sensor_group_location.csv';
export const createSensorGroups = () => {
  const sensorGroups = {};

  fs.readFileSync(defaultPath, 'utf8')
    .split('\n')
    .forEach(entry => {
      const group = createSensorGroup(entry);
      sensorGroups[group.name] = group;
    });

  delete sensorGroups.group_name;
  return sensorGroups;
};

const sensorGroups = createSensorGroups();
export default (message) => {
  const groups = Object.values(sensorGroups);
  const sensorGroup = groups.find(sensorGroup =>
    RegExp(`(${sensorGroup.uuidStartsWith})`).test(message.sensor_uuid));

  return sensorGroup;
};
