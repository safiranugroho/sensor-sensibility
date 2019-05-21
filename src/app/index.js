import './index.css';

const port = process.env.PORT || 3000;
const eventSource = new EventSource(`//localhost:${port}/api`);

eventSource.onmessage = (event) => {
  const text = document.createTextNode(event.data);
  const paragraph = document.createElement('p');

  paragraph.appendChild(text);
  document.body.appendChild(paragraph);
};
