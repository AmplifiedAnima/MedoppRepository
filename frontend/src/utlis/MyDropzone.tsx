import React from "react";
import Dropzone from "react-dropzone";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
const IMAGE_MIME_TYPE = {
  "image/jpeg": [],
  "image/png": [],
};

const ACCEPTED_CV_FILES = {
  "application/pdf": [],
  "application/msword": [],
  "text/csv": [],
};
const StyledDropzoneContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px dashed #eeeeee;
  border-radius: 2px;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;

  &:focus {
    border-color: #2196f3;
  }

  &:active {
    border-color: #00e676;
  }

  &:hover {
    border-color: #00e676;
  }
`;
interface MyDropzoneProps {
  setSelectedFiles: (files: File[]) => void; // Specify the type for setSelectedFiles
}
export const MyDropzoneForCV = ({ setSelectedFiles }: MyDropzoneProps) => {
  return (
    <Dropzone onDrop={setSelectedFiles} accept={ACCEPTED_CV_FILES}>
      {({ getRootProps, getInputProps }) => (
        <StyledDropzoneContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <Typography variant="h5">
            You can drag CV here , or select it
          </Typography>
        </StyledDropzoneContainer>
      )}
    </Dropzone>
  );
};

export const MyDropzoneForAvatarImage = ({
  setSelectedFiles,
}: MyDropzoneProps) => {
  return (
    <Dropzone onDrop={setSelectedFiles} accept={IMAGE_MIME_TYPE}>
      {({ getRootProps, getInputProps }) => (
        <StyledDropzoneContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <Typography variant="h5">
            You can drag Image here , or select
          </Typography>
        </StyledDropzoneContainer>
      )}
    </Dropzone>
  );
};
export default MyDropzoneForCV;
