import Element from './Element';

export default (sensorGroups) => {
  const data = {};
  const timestamp = Date.now();

  for (const name in sensorGroups) {
    data[name] = [
      { name: Element.LIGHT, x: timestamp, y: sensorGroups[name].light },
      { name: Element.HUMIDITY, x: timestamp, y: sensorGroups[name].humidity },
      { name: Element.RADIATION, x: timestamp, y: sensorGroups[name].radiation },
      { name: Element.TEMPERATURE, x: timestamp, y: sensorGroups[name].temperature },
    ];
  };

  return data;
};

