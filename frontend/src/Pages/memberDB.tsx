import NavigationBar from "../Components/NavigationBar";
import React from "react";
import styled from "styled-components";
import DBSearchBar from "../Components/DBSerach";
import TotalMember from "../Components/TotalMembers";
import MemberTable from "../Components/MemberDBTable";
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
        <MemberTable />
      </ContentWrapper>
    </PageContainer>
  );
};

export default DBPage;
