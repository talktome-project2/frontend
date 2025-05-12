import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Styled components
const PageWrapper = styled.div`
  padding: 40px;
  font-family: sans-serif;
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

const StyledInput = styled.input`
  width: 600px;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 4px;
`;

const StyledTextarea = styled.textarea`
  width: 600px;
  height: 200px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 4px;
  resize: vertical;
`;
const Field = styled.div`
  margin-bottom: 30px;
  position: relative; /* 라벨을 상대적으로 배치하기 위한 기준 */
`;

const TopLeftLabel = styled.label`
  position: absolute;
  top: -20px;
  left: 0;
  font-weight: bold;
  font-size: 1.1rem;
`;
export const IndividualNoticePage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reportId, setReportId] = useState<number | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();
  const [originalOpen, setOriginalOpen] = useState<boolean | undefined>(
    undefined
  );

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
          const openValue = detail.open === 1;
          setIsOpen(openValue);
          setOriginalOpen(openValue);
          setReportId(detail.id);
          setTitle(detail.title);
          setMessage(detail.content);
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

    if (originalOpen !== undefined && isOpen === originalOpen) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      const response = await fetch(
        `http://3.37.213.52:3000/manager/notice/update/${reportId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            content: message, // 기존 message를 content로 전송
            open: isOpen ? 1 : 0,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("공지사항이 성공적으로 저장되었습니다.");
        setOriginalOpen(isOpen); // 업데이트된 상태 저장
      } else {
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
        <Label>ID :</Label>
        <StyledInput
          type="number"
          value={reportId ?? ""}
          onChange={(e) => setReportId(Number(e.target.value))}
        />
      </Field>

      <Field>
        <Label>주제 :</Label>
        <StyledInput
          type="text"
          value={title ?? ""}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>

      <Field>
        <Label>내용 :</Label>
        <StyledTextarea
          value={message ?? ""}
          onChange={(e) => setMessage(e.target.value)}
        />
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
