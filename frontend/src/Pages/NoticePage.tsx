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
const NoticePage = () => {
  return (
    <>
      <PageContainer>
        <NavigationBar />
        <PageSpace />
        <div>NoticePage</div>
      </PageContainer>
    </>
  );
};

export default NoticePage;
