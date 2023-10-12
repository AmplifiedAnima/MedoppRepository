import React, { useContext, useState, useEffect, useReducer } from "react";
import {
  TextField,
  Link,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormHelperText,
} from "@mui/material";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";
import { ThemeContext } from "../../../styles/ThemeProvider";
import { getButtonStyling } from "../../Layout/inputStylingForFormLoginRegistration";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../utlis/AlertHandlingContext";
import AlertLayout from "../../../utlis/Alerts";
import { JobApplicationViewReducer } from "../../../utlis/FormReducer";
import { initialApplicationViewState } from "../../../utlis/initialStatesForForms";
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

  const {
    isLoggedIn,
    roles,
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    city,
    cv,
  } = useContext(IsLoggedInContext); // Get the user's login status from the context
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

    // Append form field values to the FormData
    formData.append("firstName", formState.firstName || "");
    formData.append("lastName", formState.lastName || "");
    formData.append("email", formState.email || "");
    formData.append("phoneNumber", formState.phoneNumber || "");
    formData.append("coverLetter", formState.coverLetter || "");

    // Append the selected file (cv) to the FormData
    if (selectedFiles.length > 0) {
      formData.append("cv", selectedFiles[0]);

    } else if (cv) {
      // If cv is available, send it as a string (URL or file path)
      formData.append("cv", cv);
    }

    console.log(
      formState.firstName,
      formState.lastName,
      formState.email,
      formState.phoneNumber,
      formState.coverLetter,
      cv,
    )
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/job-applications`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send the FormData object with all form data and the file
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
      <Dialog open={isOpen} onClose={onClose} maxWidth="xl">
        <DialogTitle
          maxWidth="xl"
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
                paddingRight: "20px",
              }}
            >
              <JobApplicationFormInputs
                onFirstNameChange={(value) =>
                  handleInputFieldForJobApplication(
                    formState,
                    formDispatch,
                    "firstName",
                    value,
                    30, // Max length for "First Name" is 30 characters.
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
                    30, // Max length for "Last Name" is 30 characters.
                    /[^a-zA-Z0-9\s/-żźćńó]/, // Updated regex pattern
                    formState.errorMessages.lastName
                  )
                }
                onEmailChange={(value) =>
                  handleInputFieldForJobApplication(
                    formState,
                    formDispatch,
                    "email",
                    value,
                    40, // Max length for "Email" is 40 characters.
                    /[^a-zA-Z0-9\s@._/-]/, // Updated regex pattern for Email
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
                    400, // Max length for "Cover Letter" is 200 characters.
                    /[^a-zA-Z0-9\s.,?!/@$#%^&*()-]/, // Updated regex pattern for Cover Letter
                    formState.errorMessages.coverLetter
                  )
                }
                formState={formState} // Replace with your actual form state
              />
              {cv ? (
                <Box>
                  <Typography>Uploaded CV:</Typography>
                  <Link href={cv} target="_blank" rel="noopener noreferrer">
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
