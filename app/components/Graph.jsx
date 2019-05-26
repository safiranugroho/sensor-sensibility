import React from 'react';
import Chart from 'react-apexcharts';

import useGraphState from '../utils/useGraphState';

const port = process.env.PORT || 3000;
const eventSource = new EventSource(`//localhost:${port}/api`);

export default ({ sensorGroupName }) => {
  const [{ options, series }, updateGraphState] = useGraphState();

  eventSource.onmessage = (event) => {
    const sensorGroup = JSON.parse(event.data)[sensorGroupName];
    if (sensorGroup) updateGraphState(sensorGroup);
  };

  return <Chart options={options} series={series} />
};