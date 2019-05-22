let out;
let sensorGroups = {};

export const aggregateDataFromStream = (sensorGroups, data) => {
  const { name, element, value } = data;

  if (!sensorGroups[name]) sensorGroups[name] = {};
  sensorGroups[name][element] = value;

  return sensorGroups;
};

export const publishFromStream = (data) => {
  sensorGroups = aggregateDataFromStream(sensorGroups, data);
  out.write(`data: FROM STREAM\n\n`);
  out.write(`data: ${JSON.stringify(sensorGroups)}\n\n`);
};

export default (request, response) => {
  response.status(200).set({
    'connection': 'keep-alive',
    'cache-control': 'no-cache',
    'content-Type': 'text/event-stream'
  });

  out = response;
};