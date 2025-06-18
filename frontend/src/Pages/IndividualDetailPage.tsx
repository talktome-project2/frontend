import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MemberDetailDBTable from "../Components/MemberDetail/MemeberDetailDBTable";
import BlockedList from "../Components/MemberDetail/Bloked";
import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import { useRecoilState } from "recoil";
import { memberInfo } from "../Recoils/atoms/MemberDeatilAtom";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageSpace = styled.div`
  display: flex;
  margin-left: 300px; 
`;

const IndividualDetailPage = () => {
  const id = useParams().id;
  const [state, setState] = useRecoilState(memberInfo);

  useEffect(() => {
    if (id) {
      setState((prevState) => ({
        ...prevState,
        id: id,
      }));
    }
  }, [id, setState]);

  return (
    <PageContainer>
      <NavigationBar />
      <PageSpace />
      <MemberDetailDBTable SearchId={id} />
      <BlockedList SearchId={id} />
    </PageContainer>
  );
};

export default IndividualDetailPage;
