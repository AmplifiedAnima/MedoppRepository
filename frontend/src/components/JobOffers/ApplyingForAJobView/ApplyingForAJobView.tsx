import React, { useContext, useState, useEffect, useReducer } from "react";
import {
  Link,
  Button,
  Box,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import { getButtonStyling } from "../../../styles/formStyling";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../utlis/AlertHandlingContext";
import AlertLayout from "../../../utlis/Alerts";
import { JobApplicationViewReducer } from "../../../utlis/Form Reducers/FormReducer";
import { initialApplicationViewState } from "../../../utlis/Form Reducers/initialStatesForForms";
import { handleInputFieldForJobApplication } from "./FunctionToHandleInputJobApplication";
import JobApplicationFormInputs from "./ApplyingForAJobViewInputs";
import MyDropzoneForCV from "../../../utlis/MyDropzone";

interface ApplicationViewProps {
  offerId: string;
}

const ApplyingForAJobView: React.FC<ApplicationViewProps> = ({ offerId }) => {
  const [formState, formDispatch] = useReducer(
    JobApplicationViewReducer,
    initialApplicationViewState
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [IsSubmitted, setIsSubmitted] = useState(false);
  const {
    isLoggedIn,
    roles,
    firstName,
    lastName,
    email,
    phoneNumber,
    cv: CvFilePath,
  } = useContext(IsLoggedInContext);
  const { themeMode } = useContext(ThemeContext);
  const [hideButton, setHideButton] = useState(false);

  const buttonStyling = getButtonStyling(themeMode);

  const isEmployee = isLoggedIn && roles.includes("Employee");
  const { dispatch } = useAlertContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && isEmployee) {
      formDispatch({
        type: "UPDATE_FIELD",
        fieldName: "firstName",
        fieldValue: firstName,
      });
      formDispatch({
        type: "UPDATE_FIELD",
        fieldName: "lastName",
        fieldValue: lastName,
      });
      formDispatch({
        type: "UPDATE_FIELD",
        fieldName: "email",
        fieldValue: email,
      });
      formDispatch({
        type: "UPDATE_FIELD",
        fieldName: "phoneNumber",
        fieldValue: phoneNumber,
      });
    }
  }, [isLoggedIn, isEmployee, firstName, lastName, email, phoneNumber]);

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("firstName", formState.firstName || "");
    formData.append("lastName", formState.lastName || "");
    formData.append("email", formState.email || "");
    formData.append("phoneNumber", formState.phoneNumber || "");
    formData.append("coverLetter", formState.coverLetter || "");
    formData.append("offerId", offerId);

    if (selectedFiles.length > 0) {
      formData.append("cv", selectedFiles[0]);
    } else if (CvFilePath) {
      formData.append("cv", CvFilePath);
    }

    console.log(
      formState.firstName,
      formState.lastName,
      formState.email,
      formState.phoneNumber,
      formState.coverLetter,
      CvFilePath,
      offerId
    );
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/job-applications`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        dispatch({
          type: "SHOW_SUCCESS",
          payload: `Application went forward`,
        });

        setIsSubmitted(true);
        setHideButton(true);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      }

      if (!response.ok) {
        const errorMessage = await response.json();

        dispatch({
          type: "SHOW_ERROR",
          payload: `${errorMessage.message}`,
        });
      }
    } catch (error) {
      dispatch({
        type: "SHOW_ERROR",
        payload: ` Error : ${error}`,
      });
      console.log("Error occurred while submitting the application:", error);
    }
  };

  const formStyling = {
    backgroundColor: "transparent",
    color: themeMode === "dark" ? "#2feb00" : "white",
    borderRadius: "8px",
  };

  const dialogContentStyling = {
    ...formStyling,
    marginBottom: "20px",
  };
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch({
        type: "SHOW_INFO",
        payload: "you have to be logged in to apply",
      });
    }
  }, [!isLoggedIn]);

  return (
    <>
      <DialogTitle
        sx={{
          color: themeMode === "dark" ? "#2feb00" : "white",
        }}
      >
        {isLoggedIn && isEmployee && !hideButton && (
          <> Apply for the job below </>
        )}
      </DialogTitle>
      <AlertLayout />
      <DialogContent sx={dialogContentStyling}>
        {isLoggedIn && isEmployee && !hideButton ? (
          <Box
            sx={{
              color: themeMode === "dark" ? "#2feb00" : "black",
              paddingRight: "0px",
              width: "auto",
            }}
          >
            <JobApplicationFormInputs
              onFirstNameChange={(value) =>
                handleInputFieldForJobApplication(
                  formState,
                  formDispatch,
                  "firstName",
                  value,
                  30,
                  /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/,
                  formState.errorMessages.firstName
                )
              }
              onLastNameChange={(value) =>
                handleInputFieldForJobApplication(
                  formState,
                  formDispatch,
                  "lastName",
                  value,
                  30,
                  /[^a-zA-Z0-9\s/-żźćńó]/,
                  formState.errorMessages.lastName
                )
              }
              onEmailChange={(value) =>
                handleInputFieldForJobApplication(
                  formState,
                  formDispatch,
                  "email",
                  value,
                  40,
                  /[^a-zA-Z0-9\s@._/-]/,
                  formState.errorMessages.email
                )
              }
              onPhoneNumberChange={(value) =>
                handleInputFieldForJobApplication(
                  formState,
                  formDispatch,
                  "phoneNumber",
                  value,
                  15,
                  /[^0-9+() -.]/g,
                  formState.errorMessages.phoneNumber
                )
              }
              onCoverLetterChange={(value) =>
                handleInputFieldForJobApplication(
                  formState,
                  formDispatch,
                  "coverLetter",
                  value,
                  400,
                  /[^a-zA-Z0-9\s.,?!/@$#%^&*()-]/,
                  formState.errorMessages.coverLetter
                )
              }
              formState={formState}
              isSubmitted={IsSubmitted}
            />
            {CvFilePath ? (
              <Link
                href={CvFilePath}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: themeMode === "dark" ? "#2feb00" : "white" }}
                underline="none"
              >
                <br></br>
                View CV
              </Link>
            ) : (
              <MyDropzoneForCV setSelectedFiles={setSelectedFiles} />
            )}

            <>
              {isLoggedIn && isEmployee ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ ...buttonStyling, width: "auto" }}
                    disabled={IsSubmitted}
                  >
                    Apply
                  </Button>
                </Box>
              ) : (
                <></>
              )}
            </>
          </Box>
        ) : (
          ""
        )}
      </DialogContent>
    </>
  );
};

export default ApplyingForAJobView;
