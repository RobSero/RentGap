import React from 'react'
import { Line } from 'react-chartjs-2'



function LineChart(props){
  const data = {
    labels: [2015,2016,2017,2018,2019,2020],
    datasets: [
      {
        label: 'Five Year Growth',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [292733, 330306, 349382, 357989, 364399, 370741]
      }
    ]
  }

  return (
    <div style={{ margin: '10px', textAlign: 'center', marginTop: '25px' }}>
      <h3>Growth Chart for !!POSTCODE!!</h3>
      <p>This chart represents the overall growth of the area accouting for all property types and finishes. This does not necessarily reflect the growth of this property</p>
      <Line data={data} />
      
    </div>
    
  )
}

export default LineChart