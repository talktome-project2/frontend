import React from "react";
import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import NoticeTable from "../Components/Notice/NoticeTable";

const PageContainer = styled.div`
  display: flex;
`;
const PageSpace = styled.div`
  display: flex;
  margin-left: 250px;
`;
const NoticePage = () => {
  return (
    <>
      <PageContainer>
        <NavigationBar />
        <PageSpace />
        <NoticeTable />
      </PageContainer>
    </>
  );
};

export default NoticePage;
