import fs from 'fs';
import createStreamProcessor from './createStreamProcessor';

export const Element = {
  LIGHT: 'light',
  HUMIDITY: 'humidity',
  TEMPERATURE: 'temperature',
  RADIATION: 'radiation'
};

export const createSensorGroup = (entry) => {
  const data = entry.replace(/['"]+/g, '').split(',');
  const name = data[0];

  return {
    name,
    uuidStartsWith: data[1],
    latitude: data[2],
    longitude: data[3],
    light: createStreamProcessor(name, Element.LIGHT),
    humidity: createStreamProcessor(name, Element.HUMIDITY),
    radiation: createStreamProcessor(name, Element.RADIATION),
    temperature: createStreamProcessor(name, Element.TEMPERATURE)
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
