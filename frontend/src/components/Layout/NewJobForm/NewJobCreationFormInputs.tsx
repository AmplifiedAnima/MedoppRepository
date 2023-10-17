import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";
import ReactQuill from "react-quill";
import {
  getInputPlaceholdersStyling,
  getReactQuillStyling,
} from "../../../styles/formStyling";
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import { NewJobFormReducer } from "../../../utlis/Form Reducers/FormReducer";
import {
  NewJobFormState,
  initialStateNewJobForm,
} from "../../../utlis/Form Reducers/initialStatesForForms";
import { handleInputFieldForNewJobForm } from "./FunctionsToHandleInputNewJobForm";
import { useLocation } from "react-router";
import specialties from "../../Specialities";

interface NewJobCreationFormInputsProps {
  onJobTitleChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onSalaryChange: (value: string) => void;
  onTypeOfEmploymentChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onLabelChange: (value: string) => void;
  onSpecialtyChange: (value: string) => void;
  isSecondStep: boolean,
  formState: NewJobFormState;
}

const NewJobCreationFormInputs: React.FC<NewJobCreationFormInputsProps> = ({
  onJobTitleChange,
  onCompanyChange,
  onSalaryChange,
  onTypeOfEmploymentChange,
  onDescriptionChange,
  onLabelChange,
  onSpecialtyChange,
  isSecondStep,
  formState,
}) => {
  const { themeMode } = useContext(ThemeContext);
  const inputPlaceholdersStyling = getInputPlaceholdersStyling(themeMode);
  const quillStyling = getReactQuillStyling(themeMode);

  const [state, formDispatch] = useReducer(
    NewJobFormReducer,
    initialStateNewJobForm
  );

  const location = useLocation();
  const conditionForUseEffectFunctionality =
    location.pathname === "/new-job-offer";

  useEffect(() => {
    if (conditionForUseEffectFunctionality) {
      formDispatch({ type: "CLEAR_ALL_ERRORS_NEWJOBFORM" });
    }
  }, [conditionForUseEffectFunctionality]);

  return (
    <>
      <TextField
        label="title"
        fullWidth
        variant="outlined"
        margin="normal"
        required
        sx={inputPlaceholdersStyling}
        onChange={(e) => onJobTitleChange(e.target.value)}
        onBlur={() => onJobTitleChange(formState.title)}
        value={formState.title}
        error={!!formState.errorMessages.title}
        helperText={formState.errorMessages.title}
        disabled={isSecondStep}
      />

      <TextField
        label="Company"
        fullWidth
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        required
        onChange={(e) => onCompanyChange(e.target.value)}
        onBlur={() => onCompanyChange(formState.company)}
        value={formState.company}
        error={!!formState.errorMessages.company}
        helperText={formState.errorMessages.company}
        disabled={isSecondStep}
      />

      <TextField
        label="Salary per month"
        fullWidth
        variant="outlined"
        margin="normal"
        sx={inputPlaceholdersStyling}
        required
        onChange={(e) => onSalaryChange(e.target.value)}
        onBlur={() => onSalaryChange(formState.salary)}
        value={formState.salary}
        error={!!formState.errorMessages.salary}
        helperText={formState.errorMessages.salary}
        disabled={isSecondStep}
      />

      <TextField
        select
        fullWidth
        label="Type of Employment"
        value={formState.selectedTypeOfEmployment}
        onChange={(e) => onTypeOfEmploymentChange(e.target.value)}
        onBlur={() =>
          onTypeOfEmploymentChange(formState.selectedTypeOfEmployment)
        }
        margin="normal"
        required
        sx={inputPlaceholdersStyling}
        error={!!formState.errorMessages.selectedTypeOfEmployment}
        helperText={formState.errorMessages.selectedTypeOfEmployment}
        disabled={isSecondStep}
      >
        <MenuItem value="full-time">Full-Time</MenuItem>
        <MenuItem value="part-time">Part-Time</MenuItem>
        <MenuItem value="B2B">Contract B2B</MenuItem>
      </TextField>

      <Typography variant="subtitle1">Description:</Typography>
      <ReactQuill
        value={formState.description}
        onChange={(value) => onDescriptionChange(value)}
        style={quillStyling}
        theme="snow"
        readOnly={isSecondStep}
      />
      {formState.errorMessages.description && (
        <Typography variant="body2" color="error">
          {formState.errorMessages.description}
        </Typography>
      )}
      <Box mt={4} />
      <FormControl variant="outlined" fullWidth sx={inputPlaceholdersStyling}>
        <InputLabel>Profession</InputLabel>
        <Select
          label="Profession"
          value={formState.selectedLabel}
          onChange={(e) => onLabelChange(e.target.value)}
          error={!!formState.errorMessages.selectedLabel}
          onBlur={() => onLabelChange(formState.selectedLabel)}
          disabled={isSecondStep}
        >
          {specialties.map((category) => (
            <MenuItem key={category.label} value={category.label}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
        {!!formState.errorMessages.selectedLabel && (
          <Typography variant="body2" color="error">
            {formState.errorMessages.selectedLabel}
          </Typography>
        )}
      </FormControl>

      {formState.selectedLabel && (
        <FormControl
          variant="outlined"
          fullWidth
          sx={{ ...inputPlaceholdersStyling, marginBottom: "20px" }}
        >
          <InputLabel>Specialty</InputLabel>
          <Select
            label="Specialty"
            value={formState.selectedSpecialty}
            onChange={(e) => onSpecialtyChange(e.target.value)}
            error={!!formState.errorMessages.selectedSpecialty}
            onBlur={() => onSpecialtyChange(formState.selectedSpecialty)}
            disabled={isSecondStep}
          >
            {specialties
              .find((category) => category.label === formState.selectedLabel)
              ?.specialties.map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  {specialty}
                </MenuItem>
              ))}
          </Select>
          {!!formState.errorMessages.selectedSpecialty && (
            <Typography variant="body2" color="error">
              {formState.errorMessages.selectedSpecialty}
            </Typography>
          )}
        </FormControl>
      )}
    </>
  );
};
export default NewJobCreationFormInputs;
