import './index.css';

const port = process.env.PORT || 3000;
const eventSource = new EventSource(`//localhost:${port}/api`);

eventSource.onmessage = (event) => {
  document.body.innerHTML = event.data;
};
