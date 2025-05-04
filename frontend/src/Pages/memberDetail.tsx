import NavigationBar from "../Components/NavigationBar";
import styled from "styled-components";
import MemberSearchBar from "../Components/MemberDetail/MemberSearch";
import MemberDetailDBTable from "../Components/MemberDetail/MemeberDetailDBTable";
import UserInfo from "../Components/MemberDetail/MemberDetailInfo";
import BlockedList from "../Components/MemberDetail/Bloked";
import PhotoContainer from "../Components/MemberDetail/PhotoContainer";

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
const DetailPage = () => {
  return (
    <PageContainer>
      <NavigationBar />
      <PageSpace />
      <ContentWrapper>
        <MemberSearchBar />
        <PhotoContainer />
        <UserInfo />
        <MemberDetailDBTable />
        <BlockedList />
      </ContentWrapper>
    </PageContainer>
  );
};

export default DetailPage;
