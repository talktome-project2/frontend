import NavigationBar from "../Components/NavigationBar";
import styled from "styled-components";
import MemberSearchBar from "../Components/MemberSearch";
import { useEffect, useState } from "react";
import MemberDetailDBTable from "../Components/MemeberDetailDBTable";
import TotalFriends from "../Components/TotalFriends";

const ContentWrapper = styled.div`
  padding: 20px; /* 내용에 여백 추가 */
  z-index: 1;
  position: relative;
  flex: 1;
`;

const PageContainer = styled.div`
  display: flex; /* Flexbox 사용 */
`;

const DetailPage = () => {
  const [count, setCount] = useState(null); // count 상태
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://54.180.234.254:3000/manager/count/man")
      .then((response) => response.json())
      .then((data) => {
        const MaleCount = data.data[0]["count(*)"];
        console.log(MaleCount);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (count !== null) {
      console.log(data); // count 값이 변경된 후 콘솔에 출력
    }
  }, [count]);

  // 버튼 클릭 시 API 호출 및 데이터 출력 함수
  const handleButtonClick = () => {
    console.log("Button clicked!"); // 버튼 클릭 확인 로그
    fetch("http://54.180.234.254:3000/manager/count/man") // API 다시 호출
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched on button click:", data); // 버튼 클릭 시 가져온 데이터를 콘솔에 출력
      })
      .catch((error) => {
        console.error("Error fetching data on button click:", error);
      });
  };

  return (
    <PageContainer>
      <NavigationBar />
      <ContentWrapper>
        <MemberSearchBar />
        <TotalFriends />
        <MemberDetailDBTable />
        <button onClick={handleButtonClick}>DB Loading</button>{" "}
      </ContentWrapper>
    </PageContainer>
  );
};

export default DetailPage;
