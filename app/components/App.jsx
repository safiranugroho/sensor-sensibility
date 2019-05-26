import React, { useState } from 'react';
import { Provider, Toolbar, Heading } from 'rebass';

import Graph from './Graph';
import Dropdown from './Dropdown';

export default () => {
  const [currentSensorGroup, setCurrentSensorGroup] = useState('group_all');

  const handleOnChange = (event) => setCurrentSensorGroup(event.target.value);

  return (
    <Provider px={20}>
      <Toolbar style={{
        background: 'transparent',
        color: 'black'
      }}>
        <Heading py={20}>
          Sensor Sensibility
        </Heading>
        <Dropdown onChange={handleOnChange} />
      </Toolbar>
      <Graph sensorGroupName={currentSensorGroup} />
    </Provider>
  )
};