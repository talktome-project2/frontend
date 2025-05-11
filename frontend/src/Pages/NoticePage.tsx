import React from "react";
import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import NoticeTable from "../Components/Notice/NoticeTable";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
`;

const PageContent = styled.div`
  margin-left: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  align-self: flex-start;
  background-color: #00bfff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1e90ff;
  }
`;

const NoticePage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <NavigationBar />
      <PageContent>
        <NoticeTable />
        <StyledButton onClick={() => navigate(`/noticeBoard/post`)}>
          공지 올리기
        </StyledButton>
      </PageContent>
    </PageContainer>
  );
};

export default NoticePage;
