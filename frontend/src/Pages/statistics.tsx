import NavigationBar from "../Components/NavigationBar";
import styled from "styled-components";

const ContentWrapper = styled.div`
  padding: 20px; /* 내용에 여백 추가 */
  z-index: 1;
  position: relative;
  flex: 1;
`;

const PageContainer = styled.div`
  display: flex; /* Flexbox 사용 */
`;
const StatisticsPage = () => {
  return (
    <>
      <PageContainer>
        <NavigationBar />
        <ContentWrapper>
          <div>This is statistics Page</div>
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default StatisticsPage;
