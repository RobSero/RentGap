import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
 

function ReactImagePinch(props) {

  return (
    <TransformWrapper
      defaultScale={1}
      defaultPositionX={200}
      defaultPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <Button
              variant="contained"
              color="primary"
              onClick={zoomIn}
            >+</Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={zoomOut}
            >-</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={resetTransform}
            >x</Button>
              
            
             
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