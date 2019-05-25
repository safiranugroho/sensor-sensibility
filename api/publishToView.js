import readFromFile from './readFromFile';

let out;
let sensorGroups = {};

export const getLocationData = (entry) => {
  const data = entry.replace(/['"]+/g, '').split(',');

  return {
    name: data[0],
    latitude: data[2],
    longitude: data[3]
  };
};

const sensorGroupLocations = readFromFile(getLocationData);

export const includeLocationData = (sensorGroups) => {
  for (const name in sensorGroups) {
    if (name !== 'group_all') {
      const location = sensorGroupLocations.find(
        location => location.name === name);

      sensorGroups[name].latitude = location.latitude;
      sensorGroups[name].longitude = location.longitude;
    };
  };

  return sensorGroups;
};

export const aggregateDataFromStream = (sensorGroups, data) => {
  const { name, element, value } = data;

  if (!sensorGroups[name]) sensorGroups[name] = {};
  sensorGroups[name][element] = value;

  return sensorGroups;
};

export const publishFromStream = (data) => {
  sensorGroups = aggregateDataFromStream(sensorGroups, data);
  sensorGroups = includeLocationData(sensorGroups);

  if (out) out.write(`data: ${JSON.stringify(sensorGroups)}\n\n`);
  else console.log(sensorGroups);
};

export default (request, response) => {
  response.status(200).set({
    'connection': 'keep-alive',
    'cache-control': 'no-cache',
    'content-Type': 'text/event-stream'
  });

  out = response;
};