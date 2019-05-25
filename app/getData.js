export default (sensorGroups) => {
  const data = {};
  const timestamp = Date.now();

  for (const name in sensorGroups) {
    data[name] = [
      { name: 'light', x: timestamp, y: sensorGroups[name].light },
      { name: 'humidity', x: timestamp, y: sensorGroups[name].humidity },
      { name: 'radiation', x: timestamp, y: sensorGroups[name].radiation },
      { name: 'temperature', x: timestamp, y: sensorGroups[name].temperature },
    ];
  };

  return data;
};

