import React, { useContext, useState, useEffect, useReducer } from "react";
import {
  Link,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  isOpen: boolean;
  onClose: () => void;
  offerId: string;
}

const ApplyingForAJobView: React.FC<ApplicationViewProps> = ({
  isOpen,
  onClose,
  offerId,
}) => {
  const [formState, formDispatch] = useReducer(
    JobApplicationViewReducer,
    initialApplicationViewState
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { isLoggedIn, roles, firstName, lastName, email, phoneNumber, cv: CvFilePath } =
    useContext(IsLoggedInContext); // Get the user's login status from the context
  const { themeMode } = useContext(ThemeContext); // Get the themeMode from the context
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
      CvFilePath
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
        setHideButton(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      }

      if (!response.ok) {
        dispatch({
          type: "SHOW_ERROR",
          payload: `Something went wrong while sending the application!`,
        });
      }
    } catch (error) {
      dispatch({
        type: "SHOW_ERROR",
        payload: "Please make sure the input you put in is valid",
      });
      console.log("Error occurred while submitting the application:", error);
    }
  };

  const cancelButtonStyling = {
    ...buttonStyling,
    width: "auto",
    "&:hover": {
      backgroundColor: "red",
      color: "white",
    },
  };

  const modalStyling = {
    backgroundColor: themeMode === "dark" ? "black" : "white",
    color: themeMode === "dark" ? "#2feb00" : "black",
  };

  const dialogContentStyling = {
    ...modalStyling,
  };

  useEffect(() => {
    setTimeout(() => {
      setHideButton(false);
    }, 1500);
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} maxWidth='md'>
        <DialogTitle
          sx={{
            backgroundColor: themeMode === "dark" ? "black" : "white",
            color: themeMode === "dark" ? "#2feb00" : "black",
          }}
        >
          {isLoggedIn && isEmployee && !hideButton ? (
            <>Job Application</>
          ) : (
            <Typography variant="h5" sx={{ alignContent: "center" }}>
              {" "}
              Applied!{" "}
            </Typography>
          )}
        </DialogTitle>
        <AlertLayout />
        <DialogContent sx={dialogContentStyling}>
          {isLoggedIn && isEmployee && !hideButton ? (
            <Box
              sx={{
                backgroundColor: themeMode === "dark" ? "black" : "white",
                color: themeMode === "dark" ? "#2feb00" : "black",
                paddingRight: "0px",
                width: "400px",
                "@media (max-width: 768px)": {
                  width: "350px",
                },
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
              />
              {CvFilePath ? (
                <Box>
                  <Typography>Uploaded CV:</Typography>
                  <Link href={CvFilePath} target="_blank" rel="noopener noreferrer">
                    View CV
                  </Link>
                </Box>
              ) : (
                <MyDropzoneForCV setSelectedFiles={setSelectedFiles} />
              )}
            </Box>
          ) : (
            ""
          )}
          {!isLoggedIn && (
            <p>
              Please{" "}
              <Link
                href="/register-user"
                onClick={() => navigate("/register-user")}
              >
                log in or sign up
              </Link>{" "}
              to apply for this job.
            </p>
          )}
        </DialogContent>
        <DialogActions sx={modalStyling}>
          {!hideButton && (
            <>
              {isLoggedIn ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ ...buttonStyling, width: "auto" }}
                >
                  Apply
                </Button>
              ) : (
                <></>
              )}
              <Button onClick={onClose} sx={cancelButtonStyling}>
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApplyingForAJobView;
