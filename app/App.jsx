import React, { createContext, useState } from 'react';
import { Provider, Heading } from 'rebass';

import Graph from './Graph';
import getData from './getData';

const port = process.env.PORT || 3000;
const eventSource = new EventSource(`//localhost:${port}/api`);

export const AppContext = createContext({
  sensorGroups: {}
});

const getNextData = (data) => {
  const element = data.find(element => element.name === 'light');
  return { x: element.x, y: element.y };
};

export default () => {
  const [sensorGroups, updateSensorGroups] = useState({});
  const [options, updateOptions] = useState({
    chart: {
      animations: {
        enabled: false,
      }
    },
    colors: ['#FFDB00'],
    stroke: {
      curve: 'smooth',
    },
    grid: {
      show: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.1,
        opacityTo: 0.9,
      }
    },
    markers: {
      size: 0
    },
    tooltip: {
      x: { show: false }
    },
    xaxis: {
      tooltip: { enabled: false },
      axisBorder: { show: false },
      categories: []
    },
    yaxis: {
      range: 50
    }
  });

  const [series, updateSeries] = useState([{
    name: 'Light',
    type: 'line',
    data: []
  }]);

  eventSource.onmessage = (event) => {
    updateSensorGroups(JSON.parse(event.data));

    const data = getData(sensorGroups);
    const sensorGroup = data.group_all;

    if (sensorGroup) {
      const lastY = [...series[0].data].pop();
      const { x, y } = getNextData(sensorGroup);

      if (y === lastY) return;
      const chartXs = [...options.xaxis.categories, x];
      const chartYs = [...series[0].data, y];

      if (chartXs.length > 50) chartXs.shift();
      if (chartYs.length > 50) chartYs.shift();

      updateOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: chartXs
        }
      });

      updateSeries([{
        ...series,
        data: chartYs
      }]);

    };
  };

  return (
    <AppContext.Provider value={{ sensorGroups }}>
      <Provider px={20}>
        <Heading py={20}>
          Sensor Sensibility
        </Heading>
        <Graph options={options} series={series} />
      </Provider>
    </AppContext.Provider >
  )
};