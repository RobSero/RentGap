import React from 'react'
import MapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import RoomIcon from '@material-ui/icons/Room'


function Map(props) {

  return (
    <div style={{ width: '100%', height: '350px', backgroundColor: 'blue' }}>
      <MapGL 
        mapboxApiAccessToken={process.env.REACT_APP_MAP_API}
        height={'100%'} // size
        width={'100%'} // size
        mapStyle={'mapbox://styles/mapbox/light-v10'} //check docs for other styles
        latitude={props.lat} //position
        longitude={props.lon} //position
        zoom={14} //higher number, higher the zoom
      >
      
        <Marker latitude={props.lat}  longitude={props.lon}>
          <RoomIcon />
        </Marker>
     
      </MapGL>
    </div>
    
  )
}


export default Map
