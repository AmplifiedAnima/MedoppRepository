import { EditProfileFormState } from "../../../utlis/Form Reducers/initialStatesForForms";
import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import { getInputPlaceholdersStyling } from "../../../styles/formStyling";

interface EditProfileFormInputProps {
  onUserNameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onCityChange: (value: string) => void;
  formState: EditProfileFormState;
}

export const EditProfileFormInput: React.FC<EditProfileFormInputProps> = ({
  onUserNameChange,
  onPasswordChange,
  onFirstNameChange,
  onLastNameChange,
  onPhoneNumberChange,
  onEmailChange,
  onAddressChange,
  onCityChange,
  formState,
}) => {
  const { themeMode } = useContext(ThemeContext);
  const inputPlaceholdersStyling = getInputPlaceholdersStyling(themeMode);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);

    if (formState.password !== value) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  return (
    <>
      <TextField
        label="Username"
        fullWidth
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => onUserNameChange(e.target.value)}
        onBlur={() => onUserNameChange(formState.username)}
        value={formState.username}
        error={!!formState.errorMessages.username}
        helperText={formState.errorMessages.username}
      />
      <TextField
        label="Password"
        type='password'
        fullWidth
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => onPasswordChange(e.target.value)}
        onBlur={() => onPasswordChange(formState.password)}
        value={formState.password}
        error={!!formState.errorMessages.password}
        helperText={formState.errorMessages.password}
      />
     <TextField
        label="Confirm Password"
        fullWidth
        type="password"
        value={confirmPassword}
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
        error={passwordMatchError}
        helperText={passwordMatchError ? "Passwords do not match" : ""}
      />
      <TextField
        label="First name"
        fullWidth
        variant="outlined"
        margin="normal" 
        sx={inputPlaceholdersStyling}
        onChange={(e) => onFirstNameChange(e.target.value)}
        onBlur={() => onFirstNameChange(formState.firstName)}
        value={formState.firstName}
        error={!!formState.errorMessages.firstName}
        helperText={formState.errorMessages.firstName}
      />
      <TextField
        label="Last name"
        fullWidth
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => onLastNameChange(e.target.value)}
        onBlur={() => onLastNameChange(formState.lastName)}
        value={formState.lastName}
        error={!!formState.errorMessages.lastName}
        helperText={formState.errorMessages.lastName}
      />
      <TextField
        label="Phone Number"
        fullWidth
        value={formState.phoneNumber}
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => onPhoneNumberChange(e.target.value)}
        onBlur={() => onPhoneNumberChange(formState.phoneNumber)}
        error={!!formState.errorMessages.phoneNumber}
        helperText={formState.errorMessages.phoneNumber}
      />
      <TextField
        label="Email"
        fullWidth
        value={formState.email}
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => onEmailChange(e.target.value)}
        onBlur={() => onEmailChange(formState.email)}
        error={!!formState.errorMessages.email}
        helperText={formState.errorMessages.email}
      />
      <TextField
        label="Address"
        fullWidth
        value={formState.address}
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => onAddressChange(e.target.value)}
        onBlur={() => onAddressChange(formState.address)}
        error={!!formState.errorMessages.address}
        helperText={formState.errorMessages.address}
      />
      <TextField
        label="City"
        fullWidth
        value={formState.city}
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => onCityChange(e.target.value)}
        onBlur={() => onCityChange(formState.city)}
        error={!!formState.errorMessages.city}
        helperText={formState.errorMessages.city}
      />
    </>
  );
};
