import styled from "styled-components";
import { useParams } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import ReportedMemberTable from "../Components/Report/ReportedMemberTable";
import { useState, useEffect } from "react";
import { handleApply } from "../Components/Report/ReportedMemberTable";
import { useNavigate } from "react-router-dom";
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageSpace = styled.div`
  display: flex;
  margin-left: 300px;
`;

const StyledButton = styled.button`
  background-color: #00bfff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;

  &:hover {
    background-color: #1e90ff;
  }
`;

const ContentContainer = styled.div`
  margin: 20px 300px;
`;
const MemberInformationWrapper = styled.div`
  display: flex;
`;
const MemberInformationContainer = styled.div`
  display: flex;
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
  background-color: white;
  color: black;
  padding: 10px;
  border: 1px solid black;
  white-space: pre-wrap;
`;

const IndividualReportPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reason, setReason] = useState("");
  const [apply, setApply] = useState(null);
  const [reportSubject, setReportSubject] = useState();
  const [reporter, setReporter] = useState();
  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const response = await fetch(
          `http://3.37.213.52:3000/manager/notify/detail/${id}`
        );
        const result = await response.json();
        if (result.result === "ok" && result.data.length > 0) {
          const report = result.data[0];
          setReason(report.reason);
          setApply(report.apply);
          setReportSubject(report.member_id);
          setReporter(report.request_id);
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
        <MemberInformationContainer>
          <MemberInformationWrapper>
            <Label>신고한 사람 : {reporter}</Label>
            <StyledButton onClick={() => navigate(`/memberDetail/${reporter}`)}>
              상세 보기
            </StyledButton>
          </MemberInformationWrapper>
          <MemberInformationWrapper>
            <Label>신고 당한 사람 :{reportSubject} </Label>
            <StyledButton
              onClick={() => navigate(`/memberDetail/${reportSubject}`)}
            >
              상세 보기
            </StyledButton>
          </MemberInformationWrapper>
        </MemberInformationContainer>

        <ReasonContainer>
          <Label>신고이유 :</Label>
          <ReasonBox>{reason}</ReasonBox>
        </ReasonContainer>

        {apply === 0 ? (
          <StyledButton onClick={() => handleApply(reportSubject)}>
            완전 차단하기
          </StyledButton>
        ) : null}

        <StyledButton>닫기</StyledButton>
      </ContentContainer>
    </PageContainer>
  );
};

export default IndividualReportPage;
