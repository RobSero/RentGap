import React from 'react'
import { Bar } from 'react-chartjs-2'



function BarChartRental(props){
  const propertyTypes = {
    'Detached house': 0,
    Flat: 0,
    Terrace: 0,
    'Semi-detached house': 0
  }
  if (props.orders){
    props.orders.forEach(order => {
      propertyTypes[order.property_detail.prop_type] += order.property_detail.rental_value * order.ownership
    })
  }
  





  const data = {
    labels: [
      'Detached',
      'Flat',
      'Terrace',
      'Semi-Detached'
    ],
    datasets: [
      {
        label: 'Investment (£)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [propertyTypes['Detached house'],propertyTypes['Flat'],propertyTypes['Semi-detached house'],propertyTypes['Terrace']]
      }
    ]
  }

  return (
    <>
      <h1>Investment Distribution</h1>
      <Bar data={data} />
    </>
  )
}

export default BarChartRental