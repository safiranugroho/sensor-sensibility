import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Subhead } from 'rebass';

import Legend from './Legend';
import useGraphState from '../utils/useGraphState';
import { SensorGroup } from '../utils/enums';

const port = process.env.PORT || 3000;
const eventSource = new EventSource(`//localhost:${port}/api`);

const SubheadStyle = { margin: '10px' };

export default ({ sensorGroupName }) => {
  const [{ options, series }, updateGraphState] = useGraphState();
  const [currentSensorGroup, updateCurrentSensorGroup] = useState({});

  eventSource.onmessage = ({ data }) => {
    const sensorGroup = JSON.parse(data)[sensorGroupName];
    if (sensorGroup) {
      updateGraphState(sensorGroup);
      updateCurrentSensorGroup(sensorGroup);
    };
  };

  return (
    <>
      <Subhead style={SubheadStyle}>
        {SensorGroup[sensorGroupName]}
      </Subhead>
      <Legend sensorGroup={currentSensorGroup} />
      <Chart options={options} series={series} />
    </>
  )
};