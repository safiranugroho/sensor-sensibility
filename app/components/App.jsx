import React, { useState } from 'react';
import { Provider, Toolbar, Heading } from 'rebass';

import Graph from './Graph';
import Dropdown from './Dropdown';
import Map from './Map';
import readFromFile from '../utils/readFromFile';
import getLocation from '../utils/getLocation';

const ProviderStyle = {
  padding: '0 20px',
  height: '100vh',
  overflow: 'hidden'
};

const ToolbarStyle = {
  background: 'transparent',
  color: 'black'
};

export default () => {
  const [currentSensorGroupName, setCurrentSensorGroupName] = useState('group_all');
  const sensorGroups = readFromFile(getLocation);
  const currentLocation = sensorGroups.find(({ name }) => name === currentSensorGroupName);

  const handleOnChange = (event) => setCurrentSensorGroupName(event.target.value);

  return (
    <Provider style={ProviderStyle}>
      <Toolbar style={ToolbarStyle}>
        <Heading py={20}>
          Sensor Sensibility
        </Heading>
        <Dropdown
          sensorGroups={sensorGroups}
          onChange={handleOnChange} />
      </Toolbar>
      <Graph sensorGroupName={currentSensorGroupName} />
      <Map location={currentLocation} />
    </Provider>
  )
};