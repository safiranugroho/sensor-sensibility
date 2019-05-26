import React from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import { Subhead } from 'rebass';

import useGraphState from '../utils/useGraphState';
import { SensorGroup } from '../utils/enums';

const port = process.env.PORT || 3000;
const eventSource = new EventSource(`//localhost:${port}/api`);

const GraphContainer = styled.div`
  padding-top: 150px;
  overflow: hidden;
`;

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
      <GraphContainer>
        <Chart
          options={options}
          series={series} />
      </GraphContainer>
    </>
  )
};