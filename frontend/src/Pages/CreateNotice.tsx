import styled from "styled-components";
import { useState } from "react";

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #4a90e2;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  background-color: white;

  &:checked {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(72, 160, 226, 0.5);
  }
`;

export const CreateNotice = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e: any) => {
    setChecked(e.target.checked);
  };
  return (
    <CheckboxWrapper>
      <CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
    </CheckboxWrapper>
  );
};
