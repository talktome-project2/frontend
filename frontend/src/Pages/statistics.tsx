import NavigationBar from "../Components/NavigationBar";
import styled from "styled-components";
import NewUserChart from "../Components/NewUserChart";
import PieCharts from "../Components/PieCharts";
import RegionStaticTable from "../Components/MemberRegionTable";

const ContentWrapper = styled.div`
  padding: 20px;
  z-index: 1;
  position: relative;
  flex: 1;
`;

const PageContainer = styled.div`
  display: flex;
`;
const StatisticsPage = () => {
  return (
    <>
      <PageContainer>
        <NavigationBar />
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
