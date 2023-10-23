import {
  RegistrationFormAction,
  RegistrationFormState,
} from "../../../utlis/Form Reducers/initialStatesForForms";
import { formatFieldName } from "../../JobOffers/ApplyingForAJobView/FunctionToHandleInputJobApplication";

export const handleInputForRegistrationForm = (
  state: RegistrationFormState,
  dispatch: React.Dispatch<RegistrationFormAction>,
  fieldName: keyof RegistrationFormState,
  value: string,
  maxLength: number,
  regexPattern: RegExp,
  customErrorMessage?: string
) => {
  const formattedFieldName = formatFieldName(fieldName)

  if (value.trim().length === 0) {
    dispatch({
      type: "UPDATE_FIELD",
      fieldName: fieldName,
      fieldValue: "",
    });

    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${formattedFieldName} is required.`,
    });
  } else if (!value.trim()) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${formattedFieldName} is required.`,
    });
  } else if (value.length > maxLength) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${formattedFieldName} must not exceed ${maxLength} ${
        fieldName === "phoneNumber" ? "numbers" : "characters"
      }`,
    });
  } else if (fieldName === "phoneNumber" && /[^0-9+() -.]/g.test(value)) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${formattedFieldName} should only contain numbers.`,
    });
  } else if (regexPattern.test(value)) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${formattedFieldName} should only contain letters, numbers, and spaces.`,
    });
  } else {
    dispatch({
      type: "UPDATE_FIELD",
      fieldName: fieldName,
      fieldValue: value,
    });

    dispatch({
      type: "CLEAR_ERROR_MESSAGE",
      fieldName: fieldName,
    });
  }
};

export const handleSelectFieldForRegistrationForm = (
  state: RegistrationFormState,
  dispatch: React.Dispatch<RegistrationFormAction>,
  fieldName: keyof RegistrationFormState,
  value: string,
  customErrorMessage?: string 
) => {
  const formattedFieldName = formatFieldName(fieldName)
  if (!value) {
    const errorMessage = customErrorMessage
      ? customErrorMessage // Use the custom error message if provided
      : `${formattedFieldName} is required.`; // Otherwise, use the default error message

    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: errorMessage,
    });
  } else {
    dispatch({
      type: "UPDATE_FIELD",
      fieldName: fieldName,
      fieldValue: value,
    });

    dispatch({
      type: "CLEAR_ERROR_MESSAGE",
      fieldName: fieldName,
    });
  }
};
