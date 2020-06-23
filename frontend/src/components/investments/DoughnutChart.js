import React from 'react'
import { Doughnut } from 'react-chartjs-2'



function DoughnutChart(props){
  // console.log(props.orders)
  const propertyLocations = {
    london: 0,
    southeast: 0,
    southwest: 0,
    midlands: 0,
    northwest: 0
  }
  if (props.orders){
    props.orders.forEach(order => {
      propertyLocations[order.property_detail.region] += 1
    })
  }
  
  
  const data = {
    labels: [
      'London',
      'South-East',
      'South-West',
      'Midlands',
      'North-West'
    ],
    datasets: [{
      data: [propertyLocations['london'],propertyLocations['southeast'],propertyLocations['southwest'],propertyLocations['midlands'],propertyLocations['northwest']],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4F7E16'
      ],
      hoverBackgroundColor: [
        'red',
        '#36A2EB',
        '#FFCE56',
        '#427711'
      ]
    }]
  }

  return (
    <>
      <h1>Your Invested Locations</h1>
      <Doughnut data={data} />
    </>
  )
}

export default DoughnutChart