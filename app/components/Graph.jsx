import React from 'react';
import Chart from 'react-apexcharts';
import { Subhead } from 'rebass';

import useGraphState from '../utils/useGraphState';
import { SensorGroup } from '../utils/enums';

const port = process.env.PORT || 3000;
const eventSource = new EventSource(`//localhost:${port}/api`);

export default ({ sensorGroupName }) => {
  const [{ options, series }, updateGraphState] = useGraphState();

  eventSource.onmessage = (event) => {
    const sensorGroup = JSON.parse(event.data)[sensorGroupName];
    if (sensorGroup) updateGraphState(sensorGroup);
  };

  return (
    <>
      <Subhead style={{ margin: '10px' }}>
        {SensorGroup[sensorGroupName]}
      </Subhead>
      <Chart
        options={options}
        series={series} />
    </>
  )
};