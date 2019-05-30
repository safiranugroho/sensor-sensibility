import { useState } from 'react';

import getData from './getData';
import { Element } from './enums';

const { TEMPERATURE, LIGHT, RADIATION, HUMIDITY } = Element;
const colors = Object.values(Element).map(({ color }) => color);

const defaultSeries = {
  [TEMPERATURE.text]: {
    name: TEMPERATURE.text,
    type: 'line',
    data: []
  },
  [LIGHT.text]: {
    name: LIGHT.text,
    type: 'line',
    data: []
  },
  [RADIATION.text]: {
    name: RADIATION.text,
    type: 'line',
    data: []
  },
  [HUMIDITY.text]: {
    name: HUMIDITY.text,
    type: 'line',
    data: []
  },
};

const defaultOptions = {
  colors,
  chart: {
    toolbar: { show: false },
    animations: { enabled: false }
  },
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
    enabled: false,
    x: { show: false }
  },
  legend: { show: 'false' },
  xaxis: {
    tooltip: { enabled: false },
    axisBorder: { show: false },
    labels: { show: false }
  },
  yaxis: [
    { seriesName: TEMPERATURE.text, range: 5, labels: { show: false } },
    { seriesName: LIGHT.text, range: 20, labels: { show: false } },
    { seriesName: RADIATION.text, range: 1, labels: { show: false } },
    { seriesName: HUMIDITY.text, range: 1, labels: { show: false } },
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

export default () => {
  const [sensorGroup, updateSensorGroup] = useState({});
  const [series, updateSeries] = useState(defaultSeries);

  const updateGraphState = (sensorGroupFromAPI) => {
    updateSensorGroup(sensorGroupFromAPI);
    const sensorGroupData = getData(sensorGroup);

    if (sensorGroupData) {
      sensorGroupData.forEach(({ name, yAxis }) => {
        const lastData = series[name].data;
        if (yAxis === [...lastData].pop()) return;

        updateSeries({
          ...series,
          [name]: {
            ...series[name],
            data: getNextData(yAxis, lastData, 30)
          }
        });
      });
    };
  };

  return [{
    options: defaultOptions,
    series: Object.values(series)
  }, updateGraphState];
};