import React from 'react';
import GoogleMap from 'google-map-react';
import { Circle } from 'rebass';

import getMapStyles from '../utils/getMapStyles';

export default ({ location }) => {
  const options = {
    fullscreenControl: false,
    styles: getMapStyles()
  };

  let marker;
  if (location.latitude) {
    marker = <Circle
      style={{ background: 'black' }}
      lat={location.latitude}
      lng={location.longitude} />
  };

  return (
    <div style={{
      left: 0,
      top: 0,
      height: '100vh',
      width: '100%',
      position: 'fixed',
      zIndex: '-99'
    }}>
      <GoogleMap
        bootstrapURLKeys={{ key: 'AIzaSyBDt751gCioCA8kHVZQmWwUj8-HkvaK5hY' }}
        defaultCenter={[-25.356489, 134.207020]}
        defaultZoom={5}
        options={options}
      >
        {marker}
      </GoogleMap>
    </div>
  )
};