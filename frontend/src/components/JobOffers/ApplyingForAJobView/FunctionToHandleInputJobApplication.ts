import {
  ApplicationViewState,
  JobApplicationViewAction,
} from "../../../utlis/Form Reducers/initialStatesForForms";

export const formatFieldName = (fieldName: string) => {
  const words = fieldName.split(/(?=[A-Z])/);
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const handleInputFieldForJobApplication = (
  state: ApplicationViewState,
  dispatch: React.Dispatch<JobApplicationViewAction>,
  fieldName: keyof ApplicationViewState,
  value: string,
  maxLength: number,
  regexPattern: RegExp,
  customErrorMessage?: string
) => {
  const formattedFieldName = formatFieldName(fieldName);

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
