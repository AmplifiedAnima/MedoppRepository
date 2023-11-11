import { EditProfileFormState } from "../../../../utlis/Form Reducers/initialStatesForForms";
import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../../styles/ThemeProviderContext";
import { getInputPlaceholdersStyling } from "../../../../styles/formStyling";

interface EditProfileFormInputProps {
  onUserNameChange: (value: string) => void;
  onCurrentPasswordChange: (value: string) =>void;
  onPasswordChange: (value: string) => void;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onSubmit: boolean;
  formState: EditProfileFormState;
}

export const EditProfileFormInput: React.FC<EditProfileFormInputProps> = ({
  onUserNameChange,
  onPasswordChange,
  onCurrentPasswordChange,
  onFirstNameChange,
  onLastNameChange,
  onPhoneNumberChange,
  onEmailChange,
  onAddressChange,
  onCityChange,
  onSubmit,
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
        disabled={onSubmit}
      />
        <TextField
        label="Current password"
        type='password'
        fullWidth
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => onCurrentPasswordChange(e.target.value)}
        onBlur={() => onCurrentPasswordChange(formState.currentPassword)}
        value={formState.currentPassword}
        error={!!formState.errorMessages.currentPassword}
        helperText={formState.errorMessages.currentPassword}
        disabled={onSubmit}
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
        disabled={onSubmit}
      />
     {/* <TextField
        label="Confirm password"
        fullWidth
        type="password"
        value={confirmPassword}
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
        error={passwordMatchError}
        helperText={passwordMatchError ? "Passwords do not match" : ""}
        disabled={onSubmit}
      /> */}
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
        disabled={onSubmit}
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
        disabled={onSubmit}
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
        disabled={onSubmit}
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
        disabled={onSubmit}
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
        disabled={onSubmit}
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
        disabled={onSubmit}
      />
    </>
  );
};
