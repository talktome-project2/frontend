import React from "react";
import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import ReportedMemberTable from "../Components/Report/ReportedMemberTable";

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
        <ReportedMemberTable />
      </PageContainer>
    </>
  );
};

export default ReportPage;
