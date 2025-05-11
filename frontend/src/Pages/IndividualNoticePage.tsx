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
  const [notice, setNotice] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reportId, setReportId] = useState<number | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();

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

  const handleSave = async () => {
    const confirmSave = window.confirm("저장하시겠습니까?");
    if (!confirmSave) return;
    console.log("저장 버튼이 클릭되었습니다."); // 버튼 클릭 확인

    const newOpenValue = isOpen ? 1 : 0; // 체크박스 상태에 맞춰 open 값 결정

    try {
      const response = await fetch(
        `http://3.37.213.52:3000/manager/notice/update/${reportId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content: message,
            open: newOpenValue,
          }),
        }
      );

      // 응답 상태 확인
      console.log("응답 상태:", response.status); // 응답 상태 코드 확인
      const result = await response.json(); // 응답 결과 확인
      console.log("응답 내용:", result); // 응답 내용 콘솔에 출력

      if (response.ok) {
        // 응답이 정상적으로 온 경우
        alert("공지사항이 성공적으로 저장되었습니다.");
      } else {
        // 응답이 실패한 경우
        alert("저장 실패. 서버 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("저장 중 에러 발생:", error);
      alert("저장 중 에러 발생! 다시 시도해주세요.");
    }
  };

  return (
    <PageWrapper>
      <Field>
        <Label>id :</Label> {reportId}
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
        <StyledButton onClick={() => window.close()}>창닫기</StyledButton>
        <StyledButton onClick={handleSave}>저장</StyledButton>
      </ButtonWrapper>
    </PageWrapper>
  );
};
