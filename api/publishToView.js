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