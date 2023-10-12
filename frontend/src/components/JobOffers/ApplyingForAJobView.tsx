import React, { useRef, useContext, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Input,
} from "@mui/material";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";
import { ThemeContext } from "../../styles/ThemeProvider";
import {
  getInputPlaceholdersStyling,
  getButtonStyling,
  getPaperStyling,
} from "../Layout/inputStylingForFormLoginRegistration";
import { Link, useNavigate } from "react-router-dom";
import { useAlertContext } from "../../utlis/AlertHandlingContext";
import AlertLayout from "../../utlis/Alerts";

import Dropzone from "react-dropzone";

interface ApplicationViewProps {
  isOpen: boolean;
  onClose: () => void;
  offerId: string;
}

export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  coverLetter?: string;
  cv: File | null;
}

const ApplyingForAJobView: React.FC<ApplicationViewProps> = ({
  isOpen,
  onClose,
  offerId,
}) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const coverLetterRef = useRef<HTMLTextAreaElement>(null);
  const cvFileRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { isLoggedIn, roles } = useContext(IsLoggedInContext); // Get the user's login status from the context
  const { themeMode } = useContext(ThemeContext); // Get the themeMode from the context
  const [hideButton, setHideButton] = useState(false);
  const inputPlaceholdersStyling = getInputPlaceholdersStyling(themeMode);
  const paperStyling = getPaperStyling(themeMode);
  const buttonStyling = getButtonStyling(themeMode);

  const isEmployee = isLoggedIn && roles.includes("Employee");
  const { dispatch } = useAlertContext();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append form field values to the FormData
    formData.append("firstName", firstNameRef.current?.value || "");
    formData.append("lastName", lastNameRef.current?.value || "");
    formData.append("email", emailRef.current?.value || "");
    formData.append("phoneNumber", phoneNumberRef.current?.value || "");
    formData.append("coverLetter", coverLetterRef.current?.value || "");

    // Append the selected file (cv) to the FormData
    if (selectedFiles.length > 0) {
      formData.append("cv", selectedFiles[0]);
    }

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
          payload: `Something went wrong here!`,
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
  const inputStylingForModalOfApplying = {
    margin: "10px 10px",
    "& input::placeholder": {
      color: themeMode === "dark" ? "#2feb00" : "", // Green placeholder text in dark mode
    },
    "& input": {
      color: themeMode === "dark" ? "#2feb00" : "", // Green text color in dark mode
      border: `1px solid ${themeMode === "dark" ? "#2feb00" : ""}`, // Green border in dark mode
      "&::placeholder": {
        color: themeMode === "dark" ? "#2feb00" : "", // Explicitly set placeholder color
      },
      "&:focus": {
        outlineColor: themeMode === "dark" ? "#2feb00" : "", // Set outline color on focus
      },
    },
    "& textarea::placeholder": {
      color: themeMode === "dark" ? "#2feb00" : "", // Green placeholder text in dark mode for textarea
    },
    "& textarea": {
      color: themeMode === "dark" ? "#2feb00" : "", // Green text color in dark mode for textarea
      border: `1px solid ${themeMode === "dark" ? "#2feb00" : ""}`, // Green border in dark mode for textarea
      "&::placeholder": {
        color: themeMode === "dark" ? "#2feb00" : "", // Explicitly set placeholder color
      },
      "&:focus": {
        outlineColor: themeMode === "dark" ? "#2feb00" : "", // Set outline color on focus
      },
    },
  };

  const dialogContentStyling = {
    ...modalStyling, // Apply modal styling to the dialog content
  };

  useEffect(() => {
    setTimeout(() => {
      setHideButton(false);
    }, 1500);
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
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
                paddingRight: "20px",
              }}
            >
              <TextField
                label="First Name"
                inputRef={firstNameRef}
                fullWidth
                sx={inputStylingForModalOfApplying}
              />
              <TextField
                label="Last Name"
                inputRef={lastNameRef}
                fullWidth
                sx={inputStylingForModalOfApplying}
              />
              <TextField
                label="Email"
                inputRef={emailRef}
                fullWidth
                sx={inputStylingForModalOfApplying}
              />
              <TextField
                label="Phone Number"
                inputRef={phoneNumberRef}
                fullWidth
                sx={inputStylingForModalOfApplying}
              />
              <TextField
                label="Cover Letter"
                inputRef={coverLetterRef}
                fullWidth
                rows={4}
                sx={inputStylingForModalOfApplying}
              />
              {/* <TextField
                label="CV"
                inputRef={cvFileRef}
                fullWidth
                sx={inputStylingForModalOfApplying}
              /> */}
              <Dropzone onDrop={(acceptedFiles) => setSelectedFiles(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </Box>
          ) : (
            ""
          )}
          {!isLoggedIn && (
            <p>
              Please{" "}
              <Link
                to="/register-user"
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
