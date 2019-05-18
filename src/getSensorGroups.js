import fs from 'fs';

export const parseLineToSensorGroup = entry => {
  const data = entry.replace(/['"]+/g, '').split(',');

  return {
    name: data[0],
    uuidStartsWith: data[1],
    latitude: data[2],
    longitude: data[3]
  };
};

export default path => {
  const sensorGroups =
    fs.readFileSync(path, 'utf8')
      .split('\n')
      .map(line => parseLineToSensorGroup(line));

  sensorGroups.shift();

  return sensorGroups;
};