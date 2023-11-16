import { MenuItem, TextField } from "@mui/material";
import { RegistrationFormState } from "../../../../utlis/Form Reducers/initialStatesForForms";
import { useContext } from "react";
import { ThemeContext } from "../../../../styles/ThemeProviderContext";
import { getInputPlaceholdersStyling } from "../../../../styles/formStyling";

interface NewRegistrationFormInputProps {
  onUserNameChange: (value: string) => void;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onCitychange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  confirmPassword: string;
  onSubmit: boolean;
  formState: RegistrationFormState;
  arePasswordsMatching: boolean;
}

export const NewRegistrationFormInput: React.FC<
  NewRegistrationFormInputProps
> = ({
  onUserNameChange,
  onFirstNameChange,
  onLastNameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  confirmPassword,
  onEmailChange,
  onCitychange,
  onPhoneNumberChange,
  onAddressChange,
  onRoleChange,
  formState,
  arePasswordsMatching,
  onSubmit,
}) => {
  const { themeMode } = useContext(ThemeContext);
  const inputPlaceholdersStyling = getInputPlaceholdersStyling(themeMode);

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
        label="Password"
        fullWidth
        type="password"
        value={formState.password}
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => onPasswordChange(e.target.value)}
        onBlur={() => onPasswordChange(formState.password)}
        error={!!formState.errorMessages.password}
        helperText={formState.errorMessages.password}
        disabled={onSubmit}
      />
      <TextField
        label="Confirm Password"
        fullWidth
        type="password"
        value={confirmPassword}
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        error={arePasswordsMatching}
        helperText={arePasswordsMatching ? "Passwords do not match" : ""}
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
        label="email"
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
        onChange={(e) => onCitychange(e.target.value)}
        onBlur={() => onCitychange(formState.city)}
        error={!!formState.errorMessages.city}
        helperText={formState.errorMessages.city}
        disabled={onSubmit}
      />
      <TextField
        select
        fullWidth
        label="role"
        value={formState.role}
        onChange={(e) => onRoleChange(e.target.value)}
        onBlur={() => onRoleChange(formState.role)}
        margin="normal"
        required
        sx={inputPlaceholdersStyling}
        error={!!formState.errorMessages.role}
        helperText={formState.errorMessages.role}
        disabled={onSubmit}
      >
        <MenuItem value="Employee"> Employee</MenuItem>
        <MenuItem value="Employer"> Employer</MenuItem>
      </TextField>
    </>
  );
};
