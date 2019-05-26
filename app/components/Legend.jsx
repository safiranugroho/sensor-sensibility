import React from 'react';
import { Box, Flex, Dot, Text } from 'rebass';

import { Color } from '../utils/enums';

const BoxStyle = { padding: '10px' };
const FlexStyle = { marginBottom: '10px' };
const DotStyle = (element) => ({
  background: Color[element],
  marginRight: '10px'
});

export default ({ sensorGroup }) =>
  <Box style={BoxStyle}>
    {
      Object.keys(Color).map((element, key) => {
        const reading = sensorGroup[element.toLowerCase()] || '';

        return (
          <Flex key={key} style={FlexStyle}>
            <Dot style={DotStyle(element)} />
            <Text>{`${element}: ${reading}`}</Text>
          </Flex>
        )
      })
    }
  </Box>;