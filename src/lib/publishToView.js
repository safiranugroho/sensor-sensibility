let out;

export const publishFromStream = ({ name, element, value }) => {
  const data = `${name} - ${element}: ${value.toFixed(2)}`;
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