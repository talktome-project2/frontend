import styled from "styled-components";
import React, { useState } from "react";

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

// 나이대 & 지역 목록
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
const ios = ["전체", "아이폰", "안드로이드"];

type SearchItemProps = {
  label: string;
  array: string[];
  selected: string;
  field: string;
  handler: (props: string) => void;
};

/*const CustomItem = ({
  label,
  array,
  selected,
  field,
  handler,
}: SearchItemProps) => {
  return (
    <SearchItem>
      <label>{label}</label>
      {array.map((element) => (
        <Label key={element}>
          <Checkbox
            type="checkbox"
            checked={selected === element}
            onChange={() => {
              handler(element);
              handleChange(field, element);
            }}
          />
          {element}
        </Label>
      ))}
    </SearchItem>
  );
};*/

const DBSearchBar = () => {
  const [selectedAge, setSelectedAge] = useState<string>("전체");
  const [selectedLocation, setSelectedLocation] = useState<string>("전체");
  const [selectedGender, setSelectedGender] = useState<string>("전체");
  const [selectedIos, setselectedIos] = useState<string>("전체");

  const today = new Date().toISOString().split("T")[0]; // 오늘 날짜 (YYYY-MM-DD)
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [startDate, setStartDate] = useState(today); // 기본값: 오늘 날짜
  const [endDate, setEndDate] = useState(today); // 기본값: 오늘 날짜
  const [filters, setFilters] = useState({
    age: "", // 선택된 연령대 (예: "20대")
    location: "",
    gender: "", // 선택된 지역
    platform: "",
    startDate: today, // 기본값: 오늘 날짜
    endDate: today, // 기본값: 오늘 날짜
  });
  // ✅ 체크박스 클릭 시 하나만 선택되도록 설정
  const handleAgeCheckboxChange = (age: string) => {
    setSelectedAge(age);
  };

  const handleGenderCheckboxChange = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleIosCheckboxChange = (ios: string) => {
    setselectedIos(ios);
  };
  const handleAllCheck = () => {
    setIsAllSelected(!isAllSelected);
    setIsDateSelected(false);
  };

  const handleDateCheck = () => {
    setIsDateSelected(!isDateSelected);
    setIsAllSelected(false);
  };
  // ✅ 지역 선택 시 상태 업데이트
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };
  const handleChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };
  const handleSearch = () => {
    console.log("현재 선택된 검색 조건:", filters);
    // 여기서 API 호출 or 검색 로직 실행
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
              checked={selectedAge === age}
              onChange={() => {
                handleAgeCheckboxChange(age);
                handleChange("age", age);
              }}
            />
            {age}
          </Label>
        ))}
      </SearchItem>
      <SearchItem>
        <label>지역</label>
        <Select
          value={selectedLocation}
          onChange={(location) => {
            handleOptionChange(location);
            handleChange("location", location.target.value);
          }}
        >
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </Select>
      </SearchItem>
      <SearchItem>
        <label>성별</label>
        {gender.map((gender) => (
          <Label key={gender}>
            <Checkbox
              type="checkbox"
              checked={selectedGender === gender}
              onChange={() => {
                handleGenderCheckboxChange(gender);
                handleChange("gender", gender);
              }}
            />
            {gender}
          </Label>
        ))}
      </SearchItem>
      <SearchItem>
        <label>플랫폼</label>
        {ios.map((ios) => (
          <Label key={ios}>
            <Checkbox
              type="checkbox"
              checked={selectedIos === ios}
              onChange={() => {
                handleIosCheckboxChange(ios);
                handleChange("platform", ios);
              }}
            />
            {ios}
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
          onChange={(e) => {
            handleDateCheck();
            handleChange("startDate", e.target.value);
          }}
        />
        <label>날짜 선택 :</label>

        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            handleChange("endDate", e.target.value);
          }}
        />
        <span> ~ </span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </SearchItem>
      <button onClick={handleSearch}>검색</button>
    </SearchContainer>
  );
};

export default DBSearchBar;
