import React from 'react'
import { Line } from 'react-chartjs-2'



function LineChart(props){
  const { growth_2015: growth2015,
    growth_2016: growth2016, 
    growth_2017: growth2017,
    growth_2018: growth2018, 
    growth_2019: growth2019,
    growth_2020: growth2020 } = props
  const data = {
    labels: [2015,2016,2017,2018,2019,2020],
    datasets: [
      {
        label: 'Five Year Area Average Growth',
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
        data: [growth2015, growth2016, growth2017, growth2018, growth2019, growth2020]
      }
    ]
  }

  return (
    <div style={{ margin: '10px', textAlign: 'center', marginTop: '25px' }}>
      <h3 className='font-14' style={{ fontWeight: 700 }}>Average Growth Chart for {props.postcode}</h3>
      <p className='font-14'>This chart represents the overall growth of the area accouting for all property types and finishes. This does not necessarily reflect the growth of this property</p>
      <Line data={data} />
      
    </div>
    
  )
}

export default LineChart