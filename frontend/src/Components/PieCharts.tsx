import React from "react";
import PieChart from "./PieChart";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import {
  ageGroupCount,
  genderGroupCount,
  platformGroupCount,
} from "../Recoils/selectors/SetStatisticAtom";
const PieBoard = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

type PieChartProps = {
  series: number[];
  labels: string[];
};

const PieCharts = () => {
  const platformAtom = useRecoilValue(platformGroupCount);
  const platformData: PieChartProps = {
    series: Object.values(platformAtom),
    labels: ["아이폰", "안드로이드"],
  };

  const genderAtom = useRecoilValue(genderGroupCount);
  const genderData: PieChartProps = {
    series: Object.values(genderAtom),
    labels: ["남성", "여성"],
  };

  const ageAtom = useRecoilValue(ageGroupCount);
  const ageData: PieChartProps = {
    series: Object.values(ageAtom),
    labels: ["20대", "30대", "40대", "50대", "60대"],
  };

  return (
    <PieBoard>
      <PieChart data={platformData} />
      <PieChart data={genderData} />
      <PieChart data={ageData} />
    </PieBoard>
  );
};

export default PieCharts;
