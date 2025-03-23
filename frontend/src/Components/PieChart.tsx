import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import React from "react";
type PieChartProps = {
  data: {
    series: number[];
    labels: string[];
  };
};

const PieChart = ({ data }: PieChartProps) => {
  const [state, setState] = useState({
    series: data.series, // props에서 가져오기
    options: {
      chart: {
        width: 200,
        type: "pie" as "pie",
      },
      labels: data.labels, // props에서 가져오기
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="pie"
          width={300}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
