import React from 'react';
import {Bar, Line, Pie, Doughnut} from 'react-chartjs-2';

function MacroNutrientChart({ nutrientDetails }) {
  console.log('DETAils: ', nutrientDetails);
    return (
        <>
          <Pie 
            data={{
              labels: ['Target Energie', 'Your Level'],
              datasets: [
                {
                  // label: 'Macronutrients',
                  data: [nutrientDetails.details.kcal_week_goal, nutrientDetails.details.kcaltotal],
                  backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                  borderWidth: 1
                },
              ]
            }}
            height={100}
            width={200}
            // options={{
            //   maintainAspectRatio: false,
            //   scales: {
            //     yAxes: [{
            //         ticks: {
            //             beginAtZero: true
            //         }
            //     }]
            // }
            // }}
          />  

          <Bar 
            data={{
              labels: ['Graisses', 'Graisses saturées', 'Gras trans'],
              datasets: [
                {
                  label: 'Macronutrients',
                  data: [nutrientDetails.details.Fattotal, nutrientDetails.details.Sat_Fattotal, nutrientDetails.details.Trans_Fattotal],
                  backgroundColor: [
                    ['rgba(255, 99, 132, 0.2)', 'red'],
                    ['rgba(75, 192, 192, 0.2)', 'yellow'],
                    ['rgba(153, 102, 255, 0.2)', 'blue'],
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                  borderWidth: 1
                },
                {
                  label: "Target",
                  data: [3, 2, 4],
                  backgroundColor: 'green',
                  borderColor: 'red',
                }
              ]
            }}
            height={300}
            width={600}
            // options={{
            //   maintainAspectRatio: false,
            //   scales: {
            //     yAxes: [{
            //         ticks: {
            //             // beginAtZero: true
            //         }
            //     }]
            // }
            // }}
          />  
        </>
    )
}

export default MacroNutrientChart;
