import React, { Fragment, useContext } from 'react';
import {
  Box,
  Subhead,
  Text,
  Row,
  Column
} from 'rebass';

import { AppContext } from './App';

export default () => {
  const { sensorGroups } = useContext(AppContext);
  const sensorGroup = sensorGroups.group_all;

  if (sensorGroup) {
    return (
      <Fragment>
        <Subhead py={'10px'}>All groups</Subhead>
        <Box width={'fit-content'}>
          <Row width={'max-content'}>
            <Column>Light: {sensorGroup.light}</Column>
            <Column>Humidity: {sensorGroup.humidity}</Column>
            <Column>Radiation: {sensorGroup.radiation}</Column>
            <Column>Temperature: {sensorGroup.temperature}</Column>
          </Row>
        </Box>
      </Fragment>
    )
  };

  return <Text py={'10px'}>Loading...</Text>
};