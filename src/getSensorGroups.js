import fs from 'fs';
import readline from 'readline';

export const parseLineToSensorGroup = (entry) => {
  const data = entry.replace(/['"]+/g, '').split(',');

  return {
    name: data[0],
    uuidStartsWith: data[1],
    latitude: data[2],
    longitude: data[3]
  };
};

export default async (path) => {
  return new Promise((resolve) => {
    let sensorGroups = [];

    readline
      .createInterface({ input: fs.createReadStream(path) })
      .on('line', (line) => {
        sensorGroups.push(parseLineToSensorGroup(line));
      })
      .on('close', () => {
        sensorGroups.shift();
        resolve(sensorGroups);
      });
  });
};