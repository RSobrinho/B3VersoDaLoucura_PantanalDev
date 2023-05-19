import React from "react";
import ReactApexChart from "react-apexcharts";

export default function PieChart() {
  const chartData = {
    series: [300, 140, 700],
    options: {
      chart: {
        offsetX: 0,
        width: 400,
        type: 'pie',
      },
      labels: ['Negativo', 'Neutro', 'Positivo'],
      colors: ['#D21312', '#FFD93D', '#54B435'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  return (
    <div style={{ textAlign: 'right' }}>
      <div style={{ display: 'inline-block', textAlign: 'left' }}>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={450}
        />
      </div>
    </div>
  );
}


