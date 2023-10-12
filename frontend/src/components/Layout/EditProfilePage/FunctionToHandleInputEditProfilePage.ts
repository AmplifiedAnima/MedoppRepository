import {
  EditProfileFormAction,
  EditProfileFormState,
} from "../../../utlis/initialStatesForForms";

export const handleInputForEditProfileForm = (
  state: EditProfileFormState,
  dispatch: React.Dispatch<EditProfileFormAction>,
  fieldName: keyof EditProfileFormState,
  value: string,
  maxLength: number,
  regexPattern: RegExp,
  customErrorMessage?: string
) => {
  if (value === null || value.trim().length === 0) {
    dispatch({
      type: "UPDATE_FIELD",
      fieldName: fieldName,
      fieldValue: "",
    });

    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${fieldName} is required.`,
    });
  } else if (value.length > maxLength) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${fieldName} must not exceed ${maxLength} characters`,
    });
  } else if (fieldName === "phoneNumber" && !/^\d+$/.test(value)) {
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
