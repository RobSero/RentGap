import React from 'react'
import Button from '@material-ui/core/Button'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
 

function ReactImagePinch(props) {

  return (
    <TransformWrapper
      defaultScale={1}
      defaultPositionX={200}
      defaultPositionY={100}
    >
      {({ zoomIn, zoomOut }) => (
        <React.Fragment>
          <div className="tools" style={{ marginBottom: '8px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={zoomIn}
            >+</Button>
            <Button
              variant="contained"
              onClick={zoomOut}
            >-</Button>

          </div>
          <TransformComponent>
            <img style={{ width: '100%' }} src={props.floorplan} alt="test" />
             
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  )
  
}

export default ReactImagePinch