import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { newUserGroupCount } from "../../Recoils/selectors/SetStatisticAtom";
import { useRecoilValue } from "recoil";

const NewUserChart = () => {
  const today = new Date();

  const dates: string[] = []; // 1주일 날짜 배열

  for (let i = 6; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);

    const month = (pastDate.getMonth() + 1).toString().padStart(2, "0");
    const day = pastDate.getDate().toString().padStart(2, "0");
    dates.push(`${month}.${day}`);
  }
  const textDates = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];
  const newUserCounts = useRecoilValue(newUserGroupCount);

  const [state, setState] = useState({
    series: [
      {
        name: "신규 유입자",
        data: Object.values(newUserGroupCount),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line" as const,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight" as "straight",
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
        categories: dates,
      },
      yaxis: {
        min: 0,
        max: 70,
      },
    },
  });

  useEffect(() => {
    if (dates.length === 7) {
      setState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "신규 유입자",
            data: textDates.map((date) => newUserCounts[date] || 0),
          },
        ],
      }));
    }
  }, [newUserCounts]);

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default NewUserChart;
