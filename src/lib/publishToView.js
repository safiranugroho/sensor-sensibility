let out;
const sensorGroups = {};

export const publishFromStream = ({ name, element, value }) => {
  if (!sensorGroups[name]) sensorGroups[name] = {};
  sensorGroups[name][element] = value;

  const data = JSON.stringify(sensorGroups);
  out.write(`data: ${data}\n\n`);
};

export default (request, response) => {
  response.status(200).set({
    'connection': 'keep-alive',
    'cache-control': 'no-cache',
    'content-Type': 'text/event-stream'
  });

  out = response;
};