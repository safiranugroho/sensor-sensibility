import React from 'react';
import { Select } from 'rebass';

import { SensorGroup } from '../utils/enums';

export default ({ sensorGroups, onChange }) => {
  return (
    <Select
      onChange={onChange}
      style={{
        backgroundColor: 'white',
        marginLeft: 'auto',
        width: '120px',
        padding: '10px',
        border: '0',
      }}>
      {sensorGroups.map(({ name }, key) =>
        <option
          key={key}
          value={name}>
          {SensorGroup[name]}
        </option>
      )}
    </Select>
  );
}