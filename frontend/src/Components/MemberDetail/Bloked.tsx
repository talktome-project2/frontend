import BlockedByMe from "./BlockedByMe";
import BlockedMe from "./BlockedMe";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center; // 양쪽 정렬
  gap: 0; // 간격 조정 (원하는 크기로 변경 가능)
  width: 100%; // 전체 너비 사용
`;

const BlockedList = () => {
  return (
    <Container>
      <BlockedByMe />
      <BlockedMe />
    </Container>
  );
};

export default BlockedList;
