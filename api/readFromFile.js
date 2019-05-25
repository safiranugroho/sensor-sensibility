import fs from 'fs';

const defaultPath = 'data/sensor_group_location.csv';
export default (callback) => {
  const sensorGroups =
    fs.readFileSync(defaultPath, 'utf8')
      .split('\n')
      .map(callback);

  sensorGroups.shift();

  return sensorGroups;
};