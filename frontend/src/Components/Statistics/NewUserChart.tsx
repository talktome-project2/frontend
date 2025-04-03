import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { newUserGroupCount } from "../../Recoils/selectors/SetStatisticAtom";
import { useRecoilValue } from "recoil";

const NewUserChart = () => {
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // 2025-03-31

  const dates: string[] = []; // 1주일 날짜 배열

  for (let i = 6; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);

    const month = (pastDate.getMonth() + 1).toString().padStart(2, "0");
    const day = pastDate.getDate().toString().padStart(2, "0");
    dates.push(`${month}.${day}`);
  }

  // Recoil selector에서 신규 유입자 데이터를 가져오기
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
            data: dates.map((date) => newUserCounts[date] || 0), // 날짜에 맞는 데이터
          },
        ],
      }));
    }
    // 빈 배열을 의존성 배열로 전달하여 처음 렌더링될 때만 실행되도록 설정
  }, [newUserCounts]); // newUserCounts가 변경될 때만 실행되도록

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
