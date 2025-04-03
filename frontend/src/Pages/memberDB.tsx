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

const DBPage = () => {
  return (
    <PageContainer>
      <NavigationBar />
      <ContentWrapper>
        <DBSearchBar />
        <TotalMember />
        <MemberDBTable />
      </ContentWrapper>
    </PageContainer>
  );
};

export default DBPage;
