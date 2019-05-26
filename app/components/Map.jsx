import React from 'react';
import GoogleMap from 'google-map-react';
import { Box, Circle } from 'rebass';

import getMapStyles from '../utils/getMapStyles';

const mapOptions = {
  fullscreenControl: false,
  styles: getMapStyles()
};

const BoxStyle = {
  left: 0,
  top: 0,
  height: '100vh',
  width: '100vw',
  position: 'fixed',
  zIndex: '-99'
};

export default ({ location }) => {
  let marker;
  if (location.latitude) {
    marker = <Circle
      style={{ background: 'black' }}
      lat={location.latitude}
      lng={location.longitude} />
  };

  return (
    <Box style={BoxStyle}>
      <GoogleMap
        bootstrapURLKeys={{ key: 'AIzaSyBDt751gCioCA8kHVZQmWwUj8-HkvaK5hY' }}
        defaultCenter={[-25.356489, 134.207020]}
        defaultZoom={5}
        options={mapOptions}>
        {marker}
      </GoogleMap>
    </Box>
  )
};