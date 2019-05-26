import React from 'react';
import { Select } from 'rebass';

import readFromFile from '../utils/readFromFile';
import getLocation from '../utils/getLocation';
import { SensorGroup } from '../utils/enums';

export default ({ onChange }) => {
  const sensorGroupLocations = readFromFile(getLocation);

  return (
    <Select
      onChange={onChange}
      style={{
        marginLeft: 'auto',
        width: '120px',
        padding: '10px',
        border: '0',
      }}>
      {sensorGroupLocations.map(({ name }, key) =>
        <option
          key={key}
          value={name}>
          {SensorGroup[name]}
        </option>
      )}
    </Select>
  );
}