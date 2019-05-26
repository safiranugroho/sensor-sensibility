import React, { useState } from 'react';
import { Provider, Toolbar, Heading } from 'rebass';

import Graph from './Graph';
import Dropdown from './Dropdown';
import Map from './Map';
import readFromFile from '../utils/readFromFile';
import getLocation from '../utils/getLocation';

export default () => {
  const [currentSensorGroup, setCurrentSensorGroup] = useState('group_all');
  const sensorGroups = readFromFile(getLocation);
  const currentLocation = sensorGroups.find(({ name }) => name === currentSensorGroup);

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
        <Dropdown
          sensorGroups={sensorGroups}
          onChange={handleOnChange} />
      </Toolbar>
      <Graph sensorGroupName={currentSensorGroup} />
      <Map location={currentLocation} />
    </Provider>
  )
};