import NavigationBar from "../Components/NavigationBar";
import styled from "styled-components";
import NewUserChart from "../Components/Statistics/NewUserChart";
import PieCharts from "../Components/Statistics/PieCharts";
import RegionStaticTable from "../Components/Statistics/MemberRegionTable";

const ContentWrapper = styled.div`
  padding: 20px;
  z-index: 1;
  position: relative;
  flex: 1;
`;
const PageSpace = styled.div`
  display: flex;
  margin-left: 300px;
`;
const PageContainer = styled.div`
  display: flex;
`;
const StatisticsPage = () => {
  return (
    <>
      <PageContainer>
        <NavigationBar />
        <PageSpace />
        <ContentWrapper>
          <NewUserChart />
          <PieCharts />
          <RegionStaticTable />
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default StatisticsPage;
