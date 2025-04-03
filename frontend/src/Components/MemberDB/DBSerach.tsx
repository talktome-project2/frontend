import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  selectedResult,
  IselctionType,
} from "../../Recoils/atoms/MemberDBSelectAtom";

// 스타일 정의
const SearchContainer = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 600px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const Label = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 5px;
  cursor: pointer;
`;

const Select = styled.select`
  margin-left: 8px;
  padding: 5px;
`;
const platformMapping: { [key: string]: string } = {
  아이폰: "iOS",
  안드로이드: "android",
  전체: "전체",
};
const ages = ["전체", "20대", "30대", "40대", "50대", "60대"];
const locations = [
  "전체",
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
  "해외",
];
const gender = ["전체", "남성", "여성"];
const platform = ["전체", "아이폰", "안드로이드"];

const DBSearchBar = () => {
  const [filterAtom, setFilterAtom] = useRecoilState(selectedResult);
  const today = new Date().toISOString().split("T")[0];

  const [filters, setFilters] = useState<IselctionType>({
    age: "전체",
    location: "전체",
    gender: "전체",
    platform: "전체",
    startDate: "2020-01-01",
    endDate: today,
  });

  const [isAllSelected, setIsAllSelected] = useState(true);
  const [isDateSelected, setIsDateSelected] = useState(false);

  // 상태 변경 시 Recoil 반영
  useEffect(() => {
    setFilterAtom(filters);
  }, [filters, setFilterAtom]);

  const handleChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleAllCheck = () => {
    setIsAllSelected(true);
    setIsDateSelected(false);
    setFilters((prev) => ({
      ...prev,
      startDate: "2020-01-01",
      endDate: today,
    }));
  };

  const handleDateCheck = () => {
    setIsDateSelected(true);
    setIsAllSelected(false);
    setFilters((prev) => ({
      ...prev,
      startDate: today,
      endDate: today,
    }));
  };

  return (
    <SearchContainer>
      <h3>검색 항목</h3>
      <SearchItem>
        <label>나이대</label>
        {ages.map((age) => (
          <Label key={age}>
            <Checkbox
              type="checkbox"
              checked={filters.age === age}
              onChange={() => handleChange("age", age)}
            />
            {age}
          </Label>
        ))}
      </SearchItem>
      <SearchItem>
        <label>지역</label>
        <Select
          value={filters.location}
          onChange={(e) => handleChange("location", e.target.value)}
        >
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </Select>
      </SearchItem>
      <SearchItem>
        <label>성별</label>
        {gender.map((g) => (
          <Label key={g}>
            <Checkbox
              type="checkbox"
              checked={filters.gender === g}
              onChange={() => handleChange("gender", g)}
            />
            {g}
          </Label>
        ))}
      </SearchItem>
      <SearchItem>
        <label>플랫폼</label>
        {platform.map((i) => (
          <Label key={i}>
            <Checkbox
              type="checkbox"
              checked={filters.platform === platformMapping[i]}
              onChange={() => handleChange("platform", platformMapping[i])}
            />
            {i}
          </Label>
        ))}
      </SearchItem>
      <SearchItem>
        <label>가입날짜 :</label>
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={handleAllCheck}
        />
        <label>전체</label>
        <input
          type="checkbox"
          checked={isDateSelected}
          onChange={handleDateCheck}
        />
        <label>날짜 선택 :</label>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
        />
        <span> ~ </span>
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => handleChange("endDate", e.target.value)}
        />
      </SearchItem>
    </SearchContainer>
  );
};

export default DBSearchBar;
