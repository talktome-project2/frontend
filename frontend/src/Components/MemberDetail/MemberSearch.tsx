import styled from "styled-components";
import { useForm } from "react-hook-form";
import { memberInfo } from "../../Recoils/atoms/MemberDeatilAtom";
import { useRecoilState } from "recoil";
const SearchContainer = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
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

  const [state, setState] = useRecoilState(memberInfo);

  const onSubmit = (data: any) => {
    setState((prevState) => ({
      ...prevState,
      id: data.id,
    }));
  };
  return (
    <SearchContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchItem>
          <label> Id</label>
          <input
            placeholder="enter Id"
            {...register("id", { required: true })}
          />
        </SearchItem>
        <button>검색</button>
      </form>
    </SearchContainer>
  );
};
export default MemberSearchBar;
