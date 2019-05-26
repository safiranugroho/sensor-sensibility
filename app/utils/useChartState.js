import { useState } from 'react';

import Element from './Element';
import getData from './getData';

const defaultSeries = {
  [Element.TEMPERATURE]: {
    name: Element.TEMPERATURE,
    type: 'line',
    data: []
  },
  [Element.LIGHT]: {
    name: Element.LIGHT,
    type: 'line',
    data: []
  },
  [Element.RADIATION]: {
    name: Element.RADIATION,
    type: 'line',
    data: []
  },
  [Element.HUMIDITY]: {
    name: Element.HUMIDITY,
    type: 'line',
    data: []
  },
};

const defaultOptions = {
  chart: {
    toolbar: { show: false },
    animations: { enabled: false }
  },
  colors: ['#007281', '#FFDB00', '#812711', '#22D213'],
  stroke: { curve: 'smooth' },
  grid: { show: false },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.1,
      opacityTo: 0.9,
    }
  },
  markers: { size: 0 },
  tooltip: {
    x: { show: false }
  },
  legend: { position: 'left' },
  xaxis: {
    tooltip: { enabled: false },
    axisBorder: { show: false },
    labels: { show: false }
  },
  yaxis: [
    { seriesName: Element.TEMPERATURE, range: 5, labels: { show: false } },
    { seriesName: Element.LIGHT, range: 20, labels: { show: false } },
    { seriesName: Element.RADIATION, range: 1, labels: { show: false } },
    { seriesName: Element.HUMIDITY, range: 1, labels: { show: false } },
  ]
};

const getNextData = (yAxis, lastData, dataSize) => {
  const nextData = [...lastData, yAxis];
  if (nextData.length > dataSize) {
    nextData[0] = null;
    nextData.shift();
  };

  return nextData;
};

export default (groupName) => {
  const [sensorGroups, updateSensorGroups] = useState({});
  const [series, updateSeries] = useState(defaultSeries);

  const updateChartState = (sensorGroupsFromAPI) => {
    updateSensorGroups(sensorGroupsFromAPI);
    const sensorGroup = getData(sensorGroups)[groupName];

    if (sensorGroup) {
      sensorGroup.forEach(({ name, yAxis }) => {
        const lastData = series[name].data;
        if (yAxis === [...lastData].pop()) return;

        updateSeries({
          ...series,
          [name]: {
            ...series[name],
            data: getNextData(yAxis, lastData, 50)
          }
        });
      });
    };
  };

  return [{
    sensorGroups,
    options: defaultOptions,
    series: Object.values(series)
  }, updateChartState];
};