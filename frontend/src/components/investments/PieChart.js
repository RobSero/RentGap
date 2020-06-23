import React from 'react'
import { Pie } from 'react-chartjs-2'



function PieChart(props){
  // console.log(props.orders)
  const propertyTypes = {
    'Detached house': 0,
    Flat: 0,
    Terrace: 0,
    'Semi-detached house': 0
  }
  if (props.orders){
    props.orders.forEach(order => {
      propertyTypes[order.property_detail.prop_type] += 1
    })
  }
  
  
  const data = {
    labels: [
      'Detached',
      'Flat',
      'Terrace',
      'Semi-Detached'
    ],
    datasets: [{
      data: [propertyTypes['Detached house'],propertyTypes['Flat'],propertyTypes['Semi-detached house'],propertyTypes['Terrace']],
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
      <h1>Your Invested Property Types</h1>
      <Pie data={data} />
    </>
  )
}

export default PieChart