import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavBar = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 20px;
  gap: 20px;
  position: fixed;
`;

const Button = styled.button`
  background-color: #444;
  color: white;
  border: none;
  padding: 15px 30px;
  margin: 100px 0;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <NavBar>
      <button onClick={() => navigate("/memberDB")}>회원 DB</button>
      <button onClick={() => navigate("/memberDetail")}>회원 상세</button>
      <button onClick={() => navigate("/statistics")}>통계</button>
      <button onClick={() => navigate("/reports")}>신고 접수</button>
      <button onClick={() => navigate("/noticeBoard")}>공지사항</button>
    </NavBar>
  );
};

export default NavigationBar;
