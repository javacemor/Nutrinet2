import React from 'react';
import {Bar} from 'react-chartjs-2';

function MicroNutrientChart({ nutrientDetails }) {
    return (
      <>
      <Bar 
        data={{
          labels: ['Sucres (g)', 'Graisses saturées (g)','Gras trans (g)', 'Sels (g)', 'Fibres (g)'],
          datasets: [
            {
              label: '# Your Progress',
              data: [nutrientDetails.details.Sugartotalt,nutrientDetails.Trans_Fattotal, nutrientDetails.details.Sat_Fattotal, nutrientDetails.details.Salttotal, nutrientDetails.details.Fiberstotal],
              backgroundColor: [
                'rgb(19, 159, 46)',
                'rgb(19, 159, 46)',
                'rgb(19, 159, 46)',
                'rgb(19, 159, 46)',
                'rgb(19, 159, 46)',
              ],
              borderColor: [
                // 'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
            },
            {
              label: "#Max Target",
              data: [nutrientDetails.details.sugars_max,nutrientDetails.transfats_max, nutrientDetails.details.satfats_max, nutrientDetails.details.salt_max, nutrientDetails.details.fibers_min],
              backgroundColor: [
                'rgb(237, 85, 85)',
                'rgb(237, 85, 85)',
                'rgb(237, 85, 85)',
                'rgb(237, 85, 85)',
                '#5F5D53',
              ],
              borderColor: 'red',
            },
            {
              label: "#Min Target",
              data: [0,0,0,0,0],
              backgroundColor: '#5F5D53',
              borderColor: '#5F5D53',
            }
          ]
        }}
        height={400}
        width={200}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
        }}
      />  
    </>
    )
}

export default MicroNutrientChart;
