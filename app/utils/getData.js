import { Element } from './enums';

export default (sensorGroup) => {
  const timestamp = Date.now();
  const data = [
    { name: Element.LIGHT, xAxis: timestamp, yAxis: sensorGroup.light },
    { name: Element.HUMIDITY, xAxis: timestamp, yAxis: sensorGroup.humidity },
    { name: Element.RADIATION, xAxis: timestamp, yAxis: sensorGroup.radiation },
    { name: Element.TEMPERATURE, xAxis: timestamp, yAxis: sensorGroup.temperature }
  ];

  return data;
};

