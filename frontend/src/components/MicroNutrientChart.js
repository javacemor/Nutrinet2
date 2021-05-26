import React from 'react';
import {Pie, Bar} from 'react-chartjs-2';

function MicroNutrientChart({ nutrientDetails }) {
    return (
      <>
      <Bar 
        data={{
          labels: ['Sucres', 'Graisses saturées', 'Sels', 'Fibres'],
          datasets: [
            {
              label: '# Your Progress',
              data: [nutrientDetails.details.Sugartotalt, nutrientDetails.details.Proteintotal, nutrientDetails.details.Salttotal, nutrientDetails.details.Fiberstotal],
              backgroundColor: [
                ['rgba(255, 99, 132, 0.2)', 'red'],
                ['rgba(75, 192, 192, 0.2)', 'yellow'],
                ['rgba(153, 102, 255, 0.2)', 'blue'],
                ['rgba(153, 102, 255, 0.2)', 'blue'],
                // 'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
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
              label: "# Your Target",
              data: [2, 1, 1, 2],
              backgroundColor: '#28a745',
              borderColor: 'red',
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
