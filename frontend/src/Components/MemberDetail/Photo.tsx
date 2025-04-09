import React from "react";
import styled from "styled-components";

interface PhotoProps {
  imageId: number;
  altText?: string;
}

const SeperatePhoto = styled.img`
  width: 100px;
  height: 100px;
  margin: 8px;
  object-fit: cover;
`;

const Photo: React.FC<PhotoProps> = ({ imageId, altText = "사진" }) => {
  if (!imageId) return <div></div>;

  return (
    <SeperatePhoto
      src={`http://54.180.234.254:3000/file/${imageId}`}
      alt={altText}
    />
  );
};

export default Photo;
