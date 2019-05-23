import getSensorGroup, { getGeneralGroup } from './getSensorGroup';

export const processStream = (message, sensorGroup) => {
  const { light, humidity, temperature, radiation } = sensorGroup;

  light.next(Number(message.photosensor));
  humidity.next(Number(message.humidity));
  temperature.next(Number(message.ambient_temperature));
  radiation.next(Number(message.radiation_level));
};

export const acrossAllGroups = (message) => {
  const allGroups = getGeneralGroup();
  processStream(message, allGroups);
};

export const bySensorGroup = (message) => {
  const sensorGroup = getSensorGroup(message);
  processStream(message, sensorGroup);
};