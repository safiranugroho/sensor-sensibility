import React from 'react';
import { Provider, Toolbar, Heading, Select } from 'rebass';

import Graph from './Graph';
import readFromFile from '../utils/readFromFile';
import getLocation from '../utils/getLocation';
import { SensorGroup } from '../utils/enums';

export default () => {
  const sensorGroupLocations = readFromFile(getLocation);

  return (
    <Provider px={20}>
      <Toolbar style={{
        background: 'transparent',
        color: 'black'
      }}>
        <Heading py={20}>
          Sensor Sensibility
        </Heading>
        <Select
          style={{
            marginLeft: 'auto',
            width: '100px',
            padding: '10px',
            border: '0',
          }}>
          {sensorGroupLocations.map(({ name }, key) =>
            <option key={key}>{SensorGroup[name]}</option>
          )}
        </Select>
      </Toolbar>
      <Graph sensorGroupName='group_1' />
    </Provider>
  )
};