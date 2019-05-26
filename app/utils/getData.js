import Element from './Element';

export default (sensorGroups) => {
  const data = {};
  const timestamp = Date.now();

  for (const name in sensorGroups) {
    data[name] = [
      { name: Element.LIGHT, xAxis: timestamp, yAxis: sensorGroups[name].light },
      { name: Element.HUMIDITY, xAxis: timestamp, yAxis: sensorGroups[name].humidity },
      { name: Element.RADIATION, xAxis: timestamp, yAxis: sensorGroups[name].radiation },
      { name: Element.TEMPERATURE, xAxis: timestamp, yAxis: sensorGroups[name].temperature },
    ];
  };

  return data;
};

