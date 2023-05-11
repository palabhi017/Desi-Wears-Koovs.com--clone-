import React from 'react'
import { Pie } from 'react-chartjs-2'
const PieChart = ({chartData}) => {
  return (
    <div style={{width:"550px",height:"250px",float:"right"}}>
    <Pie data={chartData} width={50} height={20} options={{plugins:{title:{display:true,text:"category wise products avalible"}}}} />
    </div>
  )
}

export default PieChart