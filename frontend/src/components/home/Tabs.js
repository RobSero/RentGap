import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TabItemOne from './TabItemOne'
import TabItemTwo from './TabItemTwo'
import TabItemThree from './TabItemThree'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  }
}))

function FullWidthTabs() {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  return (
   
    <div className='sub-section' style={{ backgroudColor: 'red', textAlign: 'center', padding: 0, width: '100%' }}>
      <div className={classes.root} style={{ width: '60%', margin: '0 auto' }}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example" 
            centered
          >
            <Tab label="The Process" {...a11yProps(0)} />
            <Tab label="Properties" {...a11yProps(1)} />
            <Tab label="Investments" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          className='sub-section'
        >
          <TabPanel value={value} index={0} dir={theme.direction} >
            <TabItemOne />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <TabItemTwo />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <TabItemThree />
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>

 

   
  )
}

export default FullWidthTabs