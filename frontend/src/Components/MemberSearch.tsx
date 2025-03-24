import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SearchContainer = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 200px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
const SearchItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;
const Label = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const MemberSearchBar = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    console.log(data.id);
    console.log(data.pw);
  };
  return (
    <SearchContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchItem>
          <label>id</label>
          <input placeholder="enterId" {...register("id")} />
        </SearchItem>
        <SearchItem>
          <label>pw</label>
          <input placeholder="enterPw" {...register("pw")} />
        </SearchItem>
      </form>
    </SearchContainer>
  );
};
export default MemberSearchBar;
