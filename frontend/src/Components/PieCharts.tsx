import React from "react";
import PieChart from "./PieChart";
import styled from "styled-components";

const PieBoard = styled.div`
  display: flex; // ✅ 가로 정렬
  justify-content: space-around; // ✅ 여백을 균등하게 배치 (원하는 값으로 변경 가능)
  align-items: center; // ✅ 세로 중앙 정렬
  flex-wrap: wrap; // ✅ 화면이 작을 때 줄바꿈 (필요 없으면 제거)
  gap: 20px; // ✅ 컴포넌트 간 여백 추가
`;

type PieChartProps = {
  series: number[];
  labels: string[];
};

const platformData: PieChartProps = {
  series: [10, 90],
  labels: ["아이폰", "안드로이드"],
};

const genderData: PieChartProps = {
  series: [60, 40],
  labels: ["남성", "여성"],
};
const ageData: PieChartProps = {
  series: [30, 30, 10, 20, 10],
  labels: ["20대", "30대", "40대", "50대", "60대"],
};
const loctionData: PieChartProps = {
  series: [10, 20, 30],
  labels: ["서울", "경기", "제주"],
};

const PieCharts = () => {
  return (
    <PieBoard>
      <PieChart data={platformData} />
      <PieChart data={genderData} />
      <PieChart data={ageData} />
      <PieChart data={loctionData} />
    </PieBoard>
  );
};

export default PieCharts;
