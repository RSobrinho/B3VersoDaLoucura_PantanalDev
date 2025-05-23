import React from "react";
import ReactApexChart from "react-apexcharts";

export default function PieChart(props) {
  try {
    let totalPositivo = 0;
    let totalNeutro = 0;
    let totalNegativo = 0;

    if (props) {
      totalPositivo = props.totalPositivo;
      totalNegativo = props.totalNegativo;
      totalNeutro = props.totalNeutro;
    }

    const chartData = {
      series: [totalPositivo || 0, totalNeutro || 0, totalNegativo || 0],
      options: {
        chart: {
          offsetX: 0,
          width: 400,
          type: "pie",
          formatter: function (val) {
            return parseInt(val); // Convert float to integer
          },
        },
        labels: ["Positivo", "Neutro", "Negativo"],
        colors: ["#54B435", "#FFD93D", "#D21312"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: "100%",
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };

    return (
      <div style={{ textAlign: "right" }}>
        <div style={{ display: "inline-block", textAlign: "left" }}>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="pie"
            datalabels="int"
            width={450}
          />
        </div>
      </div>
    );
  } catch (er) {
    console.log(err);
  }
}
