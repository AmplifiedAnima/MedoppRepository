import { TextField, FormHelperText } from "@mui/material";
import { ApplicationViewState } from "../../../utlis/initialStatesForForms";
import { useContext } from "react";
import { ThemeContext } from "../../../styles/ThemeProvider";

interface NewApplicationFormInputsProps {
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onCoverLetterChange: (value: string) => void;

  formState: ApplicationViewState; // Replace with your actual form state type
}

const JobApplicationFormInputs: React.FC<NewApplicationFormInputsProps> = ({
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneNumberChange,
  onCoverLetterChange,
  formState,
}) => {
  const { themeMode } = useContext(ThemeContext);
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

  return (
    <>
      <TextField
        label="First Name"
        fullWidth
        sx={inputStylingForModalOfApplying}
        value={formState.firstName || ""}
        onChange={(e) => onFirstNameChange(e.target.value)}
        onBlur={() => onFirstNameChange(formState.firstName)}
      />
      <FormHelperText error>{formState.errorMessages.firstName}</FormHelperText>

      <TextField
        label="Last Name"
        fullWidth
        sx={inputStylingForModalOfApplying}
        value={formState.lastName || ""}
        onChange={(e) => onLastNameChange(e.target.value)}
        onBlur={() => onLastNameChange(formState.lastName)}
      />
      <FormHelperText error>{formState.errorMessages.lastName}</FormHelperText>

      <TextField
        label="Email"
        fullWidth
        sx={inputStylingForModalOfApplying}
        value={formState.email || ""}
        onChange={(e) => onEmailChange(e.target.value)}
        onBlur={() => onEmailChange(formState.email)}
        error={Boolean(formState.errorMessages.email)}
      />
      <FormHelperText error>{formState.errorMessages.email}</FormHelperText>

      <TextField
        label="Phone Number"
        fullWidth
        sx={inputStylingForModalOfApplying}
        value={formState.phoneNumber || ""}
        onChange={(e) => onPhoneNumberChange(e.target.value)}
        onBlur={() => onPhoneNumberChange(formState.phoneNumber)}
        error={Boolean(formState.errorMessages.phoneNumber)}
      />
      <FormHelperText error>
        {formState.errorMessages.phoneNumber}
      </FormHelperText>

      <TextField
        label="Cover Letter"
        fullWidth
        rows={4}
        sx={inputStylingForModalOfApplying}
        value={formState.coverLetter || ""}
        onChange={(e) => onCoverLetterChange(e.target.value)}
        onBlur={() => onCoverLetterChange(formState.coverLetter)}
        error={Boolean(formState.errorMessages.coverLetter)}
      />
      <FormHelperText error>
        {formState.errorMessages.coverLetter}
      </FormHelperText>
    </>
  );
};

export default JobApplicationFormInputs;
