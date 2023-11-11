import React from "react";
import Dropzone from "react-dropzone";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { ThemeContext } from "../styles/ThemeProviderContext";
import { useContext } from "react";

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
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  cursor: grab;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

interface MyDropzoneProps {
  setSelectedFiles: (files: File[]) => void;
}

const MyDropzoneForCV = ({ setSelectedFiles }: MyDropzoneProps) => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <Dropzone onDrop={setSelectedFiles} accept={ACCEPTED_CV_FILES}>
      {({ getRootProps, getInputProps }) => (
        <StyledDropzoneContainer
          style={{
            backgroundColor: "transparent",
            color: themeMode === "dark" ? "#2feb00" : "black",
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Typography variant="h5" >
            You can drag CV here, or select it
          </Typography>
        </StyledDropzoneContainer>
      )}
    </Dropzone>
  );
};

export const MyDropzoneForAvatarImage = ({
  setSelectedFiles,
}: MyDropzoneProps) => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <Dropzone onDrop={setSelectedFiles} accept={IMAGE_MIME_TYPE}>
      {({ getRootProps, getInputProps }) => (
        <StyledDropzoneContainer
          style={{
            backgroundColor: "transparent",
            color: themeMode === "dark" ? "#2feb00" : "black",
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Typography variant="h5">
            You can drag Image here, or select it
          </Typography>
        </StyledDropzoneContainer>
      )}
    </Dropzone>
  );
};

export default MyDropzoneForCV;
