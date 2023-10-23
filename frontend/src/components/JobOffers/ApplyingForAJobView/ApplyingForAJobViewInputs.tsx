import { TextField, FormHelperText } from "@mui/material";
import { ApplicationViewState } from "../../../utlis/Form Reducers/initialStatesForForms";
import { useContext } from "react";
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import { getInputPlaceholdersStylingForJobApply } from "../../../styles/formStyling";

interface NewApplicationFormInputsProps {
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onCoverLetterChange: (value: string) => void;
  formState: ApplicationViewState;
  isSubmitted: boolean;
}

const JobApplicationFormInputs: React.FC<NewApplicationFormInputsProps> = ({
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneNumberChange,
  onCoverLetterChange,
  formState,
  isSubmitted,
}) => {
  const { themeMode } = useContext(ThemeContext);
  const inputStyling = getInputPlaceholdersStylingForJobApply(themeMode);

  return (
    <>
      <TextField
        label="First Name"
        fullWidth
        sx={{ ...inputStyling, margin: "10px 0px" }}
        value={formState.firstName || ""}
        onChange={(e) => onFirstNameChange(e.target.value)}
        onBlur={() => onFirstNameChange(formState.firstName)}
        disabled={isSubmitted}
      />
      <FormHelperText error>{formState.errorMessages.firstName}</FormHelperText>

      <TextField
        label="Last Name"
        fullWidth
        sx={{ ...inputStyling, margin: "10px 0px" }}
        value={formState.lastName || ""}
        onChange={(e) => onLastNameChange(e.target.value)}
        onBlur={() => onLastNameChange(formState.lastName)}
        disabled={isSubmitted}
      />
      <FormHelperText error>{formState.errorMessages.lastName}</FormHelperText>

      <TextField
        label="Email"
        fullWidth
        sx={{ ...inputStyling, margin: "10px 0px" }}
        value={formState.email || ""}
        onChange={(e) => onEmailChange(e.target.value)}
        onBlur={() => onEmailChange(formState.email)}
        error={Boolean(formState.errorMessages.email)}
        disabled={isSubmitted}
      />
      <FormHelperText error>{formState.errorMessages.email}</FormHelperText>

      <TextField
        label="Phone Number"
        fullWidth
        sx={{ ...inputStyling, margin: "10px 0px" }}
        value={formState.phoneNumber || ""}
        onChange={(e) => onPhoneNumberChange(e.target.value)}
        onBlur={() => onPhoneNumberChange(formState.phoneNumber)}
        error={Boolean(formState.errorMessages.phoneNumber)}
        disabled={isSubmitted}
      />
      <FormHelperText error>
        {formState.errorMessages.phoneNumber}
      </FormHelperText>

      <TextField
        label="Cover Letter"
        fullWidth
        multiline
        rows={4}
        sx={{ ...inputStyling, margin: "10px 0px" }}
        value={formState.coverLetter || ""}
        onChange={(e) => onCoverLetterChange(e.target.value)}
        onBlur={() => onCoverLetterChange(formState.coverLetter)}
        error={Boolean(formState.errorMessages.coverLetter)}
        disabled={isSubmitted}
      />
      <FormHelperText error>
        {formState.errorMessages.coverLetter}
      </FormHelperText>
    </>
  );
};

export default JobApplicationFormInputs;
