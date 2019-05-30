import React from 'react';
import { Box, Flex, Dot, Text } from 'rebass';

import { Element } from '../utils/enums';

const BoxStyle = { padding: '10px' };
const FlexStyle = { marginBottom: '10px' };
const DotStyle = (color) => ({
  background: color,
  marginRight: '10px'
});

export default ({ sensorGroup }) =>
  <Box style={BoxStyle}>
    {
      Object.values(Element).map(({ text, unit, color }, key) => {
        const reading = sensorGroup[text.toLowerCase()] || '';

        return (
          <Flex key={key} style={FlexStyle}>
            <Dot style={DotStyle(color)} />
            <Text>{`${text}: ${reading} ${unit}`}</Text>
          </Flex>
        )
      })
    }
  </Box>;