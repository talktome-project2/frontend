import NavigationBar from "../Components/NavigationBar";
import React from "react";
import styled from "styled-components";
import DBSearchBar from "../Components/MemberDB/DBSerach";
import TotalMember from "../Components/MemberDB/TotalMembers";
import MemberDBTable from "../Components/MemberDB/MemberDBTable";

const ContentWrapper = styled.div`
  padding: 20px;
  z-index: 1;
  position: relative;
  flex: 1;
`;

const PageContainer = styled.div`
  display: flex;
`;
const PageSpace = styled.div`
  display: flex;
  margin-left: 300px;
`;
const DBPage = () => {
  return (
    <PageContainer>
      <NavigationBar />
      <PageSpace />
      <ContentWrapper>
        <DBSearchBar />
        <MemberDBTable />
      </ContentWrapper>
    </PageContainer>
  );
};

export default DBPage;
