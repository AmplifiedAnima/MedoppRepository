import {
  NewJobFormState,
  NewJobFormAction,
} from "../../../../utlis/Form Reducers/initialStatesForForms";

export const handleInputFieldForNewJobForm = (
  state: NewJobFormState,
  dispatch: React.Dispatch<NewJobFormAction>,
  fieldName: keyof NewJobFormState,
  value: string,
  maxLength: number,
  regexPattern: RegExp,
  customErrorMessage?: string
) => {
  if (value.trim().length === 0) {
    dispatch({
      type: "UPDATE_FIELD",
      fieldName: fieldName,
      fieldValue: "", // Clear the field value when it's empty
    });

    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${fieldName} is required.`,
    });
  } else if (!value.trim()) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${fieldName} is required.`,
    });
  } else if (value.length > maxLength) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${fieldName} must not exceed ${maxLength} ${
        fieldName === "salary" ? "numbers" : "characters"
      }`,
    });
  } else if (fieldName === "salary" && !/^\d+$/.test(value)) {
    // Check if fieldName is "salary" and value contains non-numeric characters
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${fieldName} should only contain numbers.`,
    });
  } else if (regexPattern.test(value)) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${fieldName} should only contain letters, numbers, and spaces.`,
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

export const handleSelectFieldForJobForm = (
  state: NewJobFormState,
  dispatch: React.Dispatch<NewJobFormAction>,
  fieldName: keyof NewJobFormState,
  value: string,
  customErrorMessage?: string // Add a custom error message parameter
) => {
  if (!value) {
    const errorMessage = customErrorMessage
      ? customErrorMessage // Use the custom error message if provided
      : `${fieldName} is required.`; // Otherwise, use the default error message

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

export const validateDescriptionFieldNewJobForm = (
  state: NewJobFormState,
  dispatch: React.Dispatch<NewJobFormAction>,
  value: string,
  maxLength: number,
  minLength?: number
) => {

  const plainTextValue = value.replace(/<\/?[^>]+(>|$)/g, "").trim();

  if (!plainTextValue) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: "description",
      errorMessage: "Description is required.",
    });
  } else if (plainTextValue.length > maxLength) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: "description",
      errorMessage: `Description must not exceed ${maxLength} characters.`,
    });
  }  else {
    dispatch({
      type: "UPDATE_FIELD",
      fieldName: "description",
      fieldValue: value,
    });
    if(plainTextValue.length < minLength!){
      dispatch({
        type: "UPDATE_ERROR_MESSAGE",
        fieldName: "description",
        errorMessage: `Description must not be less than ${minLength} characters.`,
      });
    }
    dispatch({
      type: "CLEAR_ERROR_MESSAGE",
      fieldName: "description",
    });
  }
};
