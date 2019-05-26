import React from 'react';
import Chart from 'react-apexcharts';

export default ({ options, series }) => {
  return <Chart options={options} series={series} />
};