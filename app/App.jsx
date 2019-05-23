import React, { createContext, useState } from 'react';
import { Provider, Heading } from 'rebass';

import Graph from './Graph';

const port = process.env.PORT || 3000;
const eventSource = new EventSource(`//localhost:${port}/api`);

export const AppContext = createContext({
  sensorGroups: {}
});

export default () => {
  const [sensorGroups, updateSensorGroups] = useState({});

  eventSource.onmessage = (event) => {
    updateSensorGroups(JSON.parse(event.data));
  };

  return (
    <AppContext.Provider value={{ sensorGroups }}>
      <Provider px={20}>
        <Heading py={20}>
          Sensor Sensibility
        </Heading>
        <Graph />
      </Provider>
    </AppContext.Provider >
  )
};