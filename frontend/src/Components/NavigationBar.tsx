import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavBar = styled.div`
  width: 200px; /* 왼쪽 고정 너비 */
  height: 100vh; /* 화면 전체 높이 */
  background-color: #333; /* 배경색 */
  display: flex;
  flex-direction: column; /* 세로로 버튼 정렬 */
  justify-content: center; /* 버튼들을 세로로 가운데 정렬 */
  align-items: stretch;
  padding: 20px;
  gap: 20px;
`;

const Button = styled.button`
  background-color: #444;
  color: white;
  border: none;
  padding: 15px 30px;
  margin: 100px 0; /* 버튼 사이에 여백 */
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555; /* 호버 시 배경색 변경 */
  }
`;

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <NavBar>
      <button onClick={() => navigate("/memberDB")}>회원 DB</button>
      <button onClick={() => navigate("/memberDetail")}>회원 상세</button>
      <button onClick={() => navigate("/statistics")}>통계</button>
    </NavBar>
  );
};

export default NavigationBar;
