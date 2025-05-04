import React from "react";
import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";

const PageContainer = styled.div`
  display: flex;
`;
const PageSpace = styled.div`
  display: flex;
  margin-left: 250px;
`;
const ReportPage = () => {
  return (
    <>
      <PageContainer>
        <NavigationBar />
        <PageSpace />
      </PageContainer>
    </>
  );
};

export default ReportPage;
