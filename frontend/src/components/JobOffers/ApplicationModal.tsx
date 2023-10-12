import React, { useRef, useContext } from "react";
import {
  Modal,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";
import styles from "./ApplicationModal.module.css"; // Import the CSS module
import { ThemeContext } from "../../styles/ThemeProvider";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (applicationData: ApplicationData) => void;
  offerId: string;
}

export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  coverLetter?: string;
  cvFile: string;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  onApply,
  offerId,
}) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const coverLetterRef = useRef<HTMLTextAreaElement>(null);
  const cvFileRef = useRef<HTMLInputElement>(null);

  const { isLoggedIn } = useContext(IsLoggedInContext); // Get the user's login status from the context
  const { themeMode } = useContext(ThemeContext); // Get the themeMode from the context

  const handleSubmit = async () => {
    // Validate the form fields and handle the application submission
    const applicationData: ApplicationData = {
      firstName: firstNameRef.current?.value || "",
      lastName: lastNameRef.current?.value || "",
      email: emailRef.current?.value || "",
      phoneNumber: phoneNumberRef.current?.value || "",
      coverLetter: coverLetterRef.current?.value || "",
      cvFile: cvFileRef.current?.value || "",
    };
    console.log(applicationData);

    try {
      const response = await fetch(`http://localhost:3000/job-applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.log("Something went wrong while submitting the application.");
      } else {
        // If the submission is successful, call the onApply function
        onApply(applicationData);
        onClose();
      }
    } catch (error) {
      console.log("Error occurred while submitting the application:", error);
    }
  };
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        className={`${styles.h2} ${
          themeMode === "dark" ? styles["dark-mode"] : ""
        }`}
      >
        Job Application
      </DialogTitle>
      <DialogContent
        className={`${styles["dialog-content"]} ${
          themeMode === "dark" ? styles["dark-mode"] : ""
        }`}
      >
        <TextField
          label="First Name"
          inputRef={firstNameRef}
          fullWidth
          className={styles.input}
        />
        <TextField
          label="Last Name"
          inputRef={lastNameRef}
          fullWidth
          className={styles.input}
        />
        <TextField
          label="Email"
          inputRef={emailRef}
          fullWidth
          className={styles.input}
        />
        <TextField
          label="Phone Number"
          inputRef={phoneNumberRef}
          fullWidth
          className={styles.input}
        />
        <TextField
          label="Cover Letter"
          multiline
          rows={2}
          inputRef={coverLetterRef}
          fullWidth
          className={styles.textarea}
        />
        <TextField
          label="CV"
          multiline
          rows={2}
          ref={cvFileRef}
          className={`${styles.input} ${styles["file-input"]}`}
        />
      </DialogContent>
      <DialogActions className={styles["modal-buttons"]}>
        {isLoggedIn ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            className={`${styles.button} ${
              themeMode === "dark" ? styles["apply-button"] : ""
            }`}
          >
            Apply
          </Button>
        ) : (
          <p>Please log in or sign up to apply for this job.</p>
        )}
        <Button onClick={onClose} className={styles.button}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationModal;
