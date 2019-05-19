import getSensorGroup, { createGeneralGroup } from './getSensorGroup';

const processStream = (message, sensorGroup) => {
  const { light, humidity, temperature, radiation } = sensorGroup;

  light.next(Number(message.photosensor));
  humidity.next(Number(message.humidity));
  temperature.next(Number(message.ambient_temperature));
  radiation.next(Number(message.radiation_level));
};

const allGroups = createGeneralGroup();
export const acrossAllGroups = (message) => {
  processStream(message, allGroups);
};

export const bySensorGroup = (message) => {
  const sensorGroup = getSensorGroup(message);
  processStream(message, sensorGroup);
};