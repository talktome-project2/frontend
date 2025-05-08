import styled from "styled-components";
import { useParams } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import ReportedMemberTable from "../Components/Report/ReportedMemberTable";
import { useState, useEffect } from "react";
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageSpace = styled.div`
  display: flex;
  margin-left: 300px;
`;

type inputType = {
  inputId?: String;
};

const StyledButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ContentContainer = styled.div`
  margin: 20px 300px;
`;

const ReasonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 10px;
`;

const ReasonBox = styled.div`
  width: 500px;
  height: 150px;
  background-color: #165d7a;
  color: white;
  padding: 10px;
  border: 1px solid black;
  white-space: pre-wrap;
`;

const IndividualReportPage = ({ inputId }: inputType) => {
  const id = useParams().id;
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const response = await fetch(
          `http://3.37.213.52:3000/manager/notify/detail/${id}`
        );
        const result = await response.json();
        if (result.result === "ok" && result.data.length > 0) {
          setReason(result.data[0].reason);
        }
      } catch (error) {
        console.error("신고 상세 정보를 불러오는 중 에러 발생:", error);
      }
    };

    if (id) {
      fetchReportDetail();
    }
  }, [id]);

  return (
    <PageContainer>
      <NavigationBar />
      <PageSpace />
      <ContentContainer>
        <ReasonContainer>
          <Label>신고이유 :</Label>
          <ReasonBox>{reason}</ReasonBox>
        </ReasonContainer>
        <StyledButton>완전 차단하기</StyledButton>
        <StyledButton>닫기</StyledButton>
      </ContentContainer>
    </PageContainer>
  );
};

export default IndividualReportPage;
