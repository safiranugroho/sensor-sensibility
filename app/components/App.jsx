import React, { createContext } from 'react';
import { Provider, Heading } from 'rebass';

import Graph from './Graph';
import Element from '../utils/Element';
import useChartState from '../utils/useChartState';

const port = process.env.PORT || 3000;
const eventSource = new EventSource(`//localhost:${port}/api`);

export const AppContext = createContext({
  sensorGroups: {}
});

export default () => {
  const [chartState, updateChartState] = useChartState('group_all');

  eventSource.onmessage = (event) => {
    updateChartState(JSON.parse(event.data));
  };

  return (
    <AppContext.Provider value={{ sensorGroups: chartState.sensorGroups }}>
      <Provider px={20}>
        <Heading py={20}>
          Sensor Sensibility
        </Heading>
        <Graph options={chartState.options} series={chartState.series} />
      </Provider>
    </AppContext.Provider >
  )
};