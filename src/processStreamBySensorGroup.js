import getSensorGroup from './getSensorGroup';

export default (message) => {
  const { light, humidity, temperature, radiation } = getSensorGroup(message);

  light.next(Number(message.photosensor));
  humidity.next(Number(message.humidity));
  temperature.next(Number(message.ambient_temperature));
  radiation.next(Number(message.radiation_level));
};