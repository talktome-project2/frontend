import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";

// Styled Components
const PageWrapper = styled.div`
  padding: 40px;
  font-family: sans-serif;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 10px;
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
`;

export const IndividualNoticePage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState<any>(null);
  const [reportId, setReportId] = useState<number | undefined>();
  const [originalValues, setOriginalValues] = useState({
    title: "",
    content: "",
    open: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      open: false,
    },
  });

  const watchValues = watch();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch(
          `http://3.37.213.52:3000/manager/notice/detail/${id}`
        );
        const result = await response.json();
        if (result.result === "ok" && result.data.length > 0) {
          const detail = result.data[0];
          const openValue = detail.open === 1;
          setNotice(detail);
          setReportId(detail.id);
          setOriginalValues({
            title: detail.title,
            content: detail.content,
            open: openValue,
          });

          // form에 값 세팅
          setValue("title", detail.title);
          setValue("content", detail.content);
          setValue("open", openValue);
        }
      } catch (error) {
        console.error("공지사항 상세 정보를 불러오는 중 에러 발생:", error);
      }
    };

    if (id) fetchNotice();
  }, [id, setValue]);

  if (!notice) return <PageWrapper>로딩 중...</PageWrapper>;

  const onSubmit = async (data: any) => {
    const confirmSave = window.confirm("저장하시겠습니까?");
    if (!confirmSave) return;

    // 변경된 내용이 없는 경우
    const noChange =
      data.title === originalValues.title &&
      data.content === originalValues.content &&
      data.open === originalValues.open;

    if (noChange) {
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
            title: data.title,
            content: data.content,
            open: data.open ? 1 : 0,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("공지사항이 성공적으로 저장되었습니다.");
        setOriginalValues({
          title: data.title,
          content: data.content,
          open: data.open,
        });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label>ID :</Label>
          <StyledInput type="number" value={reportId ?? ""} disabled />
        </Field>

        <Field>
          <Label>주제 :</Label>
          <StyledInput type="text" {...register("title")} />
        </Field>

        <Field>
          <Label>내용 :</Label>
          <StyledTextarea {...register("content")} />
        </Field>

        <CheckboxLabel>
          <StyledCheckbox type="checkbox" {...register("open")} />
          공개하기
        </CheckboxLabel>

        <ButtonWrapper>
          <StyledButton type="button" onClick={() => window.close()}>
            창닫기
          </StyledButton>
          <StyledButton type="submit">저장</StyledButton>
        </ButtonWrapper>
      </form>
    </PageWrapper>
  );
};
