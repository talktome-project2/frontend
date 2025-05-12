import React from "react";
import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import { useForm, SubmitHandler } from "react-hook-form";

const PageContainer = styled.div`
  display: flex;
`;

const PageSpace = styled.div`
  display: flex;
  margin-left: 300px;
  flex-direction: column;
  flex: 1;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 40px auto;
  font-family: sans-serif;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  font-size: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const StyledCheckbox = styled.input`
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  background-color: #00bfff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1e90ff;
  }
`;

type FormData = {
  title: string;
  message: string;
  open: boolean;
};

export const NoticePostingPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      message: "",
      open: false,
    },
  });

  const handleClick: SubmitHandler<FormData> = async (data) => {
    const requestData = {
      title: data.title,
      content: data.message,
      open: data.open ? 1 : 0,
    };

    try {
      const response = await fetch(
        "http://3.37.213.52:3000/manager/notice/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }

      alert("공지사항이 성공적으로 등록되었습니다!");
      reset(); // 입력값 초기화
    } catch (error) {
      console.error("공지사항 등록 실패:", error);
      alert("공지사항 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <PageContainer>
      <NavigationBar />
      <PageSpace>
        <FormWrapper onSubmit={handleSubmit(handleClick)}>
          <Field>
            <Label htmlFor="title">주제 :</Label>
            <Input id="title" {...register("title", { required: true })} />
          </Field>

          <Field>
            <Label htmlFor="message">내용 :</Label>
            <TextArea
              id="message"
              {...register("message", { required: true })}
            />
          </Field>

          <Field>
            <CheckboxLabel>
              <StyledCheckbox type="checkbox" {...register("open")} />
              공개하기
            </CheckboxLabel>
          </Field>

          <SubmitButton type="submit">공지 올리기</SubmitButton>
        </FormWrapper>
      </PageSpace>
    </PageContainer>
  );
};
