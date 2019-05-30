import { Element } from './enums';

export default (sensorGroup) => {
  const timestamp = Date.now();
  const { LIGHT, HUMIDITY, RADIATION, TEMPERATURE } = Element;

  const data = [
    { name: LIGHT.text, xAxis: timestamp, yAxis: sensorGroup.light },
    { name: HUMIDITY.text, xAxis: timestamp, yAxis: sensorGroup.humidity },
    { name: RADIATION.text, xAxis: timestamp, yAxis: sensorGroup.radiation },
    { name: TEMPERATURE.text, xAxis: timestamp, yAxis: sensorGroup.temperature }
  ];

  return data;
};

