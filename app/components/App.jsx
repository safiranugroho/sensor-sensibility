import React from 'react';
import { Provider, Heading } from 'rebass';

import Graph from './Graph';

export default () => {
  return (
    <Provider px={20}>
      <Heading py={20}>
        Sensor Sensibility
        </Heading>
      <Graph sensorGroupName='group_1' />
    </Provider>
  )
};