import React from 'react';
import { Select } from 'rebass';

import { SensorGroup } from '../utils/enums';

const SelectStyle = {
  backgroundColor: 'white',
  marginLeft: 'auto',
  width: '120px',
  padding: '10px',
  border: '0',
};

export default ({ onChange }) =>
  <Select onChange={onChange} style={SelectStyle}>
    {
      Object.keys(SensorGroup).map((name, key) =>
        <option key={key} value={name}>
          {SensorGroup[name]}
        </option>)
    }
  </Select>;