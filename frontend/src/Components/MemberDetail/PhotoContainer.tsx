import { useEffect, useState } from "react";
import Photo from "./Photo";
import { memberInfo } from "../../Recoils/atoms/MemberDeatilAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Container = styled.div`
  display: "flex";
`;
//get profile id and push to the array -> call photo with these numbers
const PhotoContainer = () => {
  const memberId = useRecoilValue(memberInfo);
  const [profileIds, setProfileIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchAllImages = async () => {
      const ids: number[] = [];

      try {
        const resProfile = await fetch(
          `http://3.37.213.52:3000/file/member/${encodeURIComponent(
            memberId.id
          )}/profile`
        );
        const resultProfile = await resProfile.json();
        ids[0] = resultProfile.data[0].profile_id;
      } catch (err) {
        console.error("Failed to fetch profile image", err);
        ids[0] = 0;
      }

      for (let i = 1; i <= 3; i++) {
        try {
          const res = await fetch(
            `http://3.37.213.52:3000/file/member/${encodeURIComponent(
              memberId.id
            )}/seq?seq=${i - 1}`
          );
          const result = await res.json();
          ids[i] = result.data[0].image_id;
        } catch (err) {
          console.error(`Failed to fetch image ${i - 1}`, err);
          ids[i] = 0;
        }
      }

      setProfileIds(ids);
    };

    fetchAllImages();
  }, [memberId]);
  return (
    <Container>
      {profileIds.map((id, idx) => (
        <Photo key={idx} imageId={id} altText={`사진 ${idx}`} />
      ))}
    </Container>
  );
};

export default PhotoContainer;
