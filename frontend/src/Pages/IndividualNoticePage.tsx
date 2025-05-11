import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// Styled components
const PageWrapper = styled.div`
  padding: 40px;
  font-family: sans-serif;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 10px;
`;

const MessageBox = styled.div`
  width: 600px;
  height: 200px;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
  color: black;
  white-space: pre-wrap;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StyledCheckbox = styled.input`
  margin-right: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledButton = styled.button`
  background-color: #00bfff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1e90ff;
  }
`;

export const IndividualNoticePage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ReportId, setReportId] = useState();
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch(
          `http://3.37.213.52:3000/manager/notice/detail/${id}`
        );
        const result = await response.json();
        if (result.result === "ok" && result.data.length > 0) {
          const detail = result.data[0];
          setNotice(detail);
          setIsOpen(detail.open === 1);
          setReportId(detail.id);
          setTitle(detail.title);
          setMessage(detail.message);
        }
      } catch (error) {
        console.error("공지사항 상세 정보를 불러오는 중 에러 발생:", error);
      }
    };

    if (id) fetchNotice();
  }, [id]);

  if (!notice) return <PageWrapper>로딩 중...</PageWrapper>;

  return (
    <PageWrapper>
      <Field>
        <Label>id :</Label> {ReportId}
      </Field>

      <Field>
        <Label>주제 :</Label> {title}
      </Field>

      <Field>
        <Label>내용 :</Label>
        <MessageBox>{message}</MessageBox>
      </Field>

      <CheckboxLabel>
        <StyledCheckbox
          type="checkbox"
          checked={isOpen}
          onChange={(e) => setIsOpen(e.target.checked)}
        />
        공개하기
      </CheckboxLabel>

      <ButtonWrapper>
        <StyledButton>창닫기</StyledButton>
        <StyledButton>저장</StyledButton>
      </ButtonWrapper>
    </PageWrapper>
  );
};
