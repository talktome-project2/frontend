import ReactApexChart from "react-apexcharts";
import { useState } from "react";

const NewUserChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "신규 유입자",
        data: [10, 41, 35, 51, 49, 62, 69],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line" as const, // 'line'을 명시적으로 타입으로 지정
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight" as "straight", // 'smooth'를 명시적으로 타입으로 설정
      },
      title: {
        text: "10일간 신규 유입자 추이",
        align: "left" as "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // 반복되는 컬럼에 색상 적용
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7"],
      },
      yaxis: {
        min: 0,
        max: 70,
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default NewUserChart;
