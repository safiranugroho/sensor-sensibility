import createStreamProcessors from './createStreamProcessors';
import readFromFile from './readFromFile';

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

export const createSensorGroups = () => {
  return readFromFile(createSensorGroup);
};

const sensorGroups = createSensorGroups();
export default (message) => {
  const sensorGroup = sensorGroups.find(sensorGroup =>
    RegExp(`(${sensorGroup.uuidStartsWith})`).test(message.sensor_uuid));

  return sensorGroup;
};
