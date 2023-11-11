import {
  EditProfileFormAction,
  EditProfileFormState,
} from "../../../../utlis/Form Reducers/initialStatesForForms";
import {
  formatFieldName,
} from "../../../JobOffers/ApplyingForAJobView/FunctionToHandleInputJobApplication";
export const handleInputForEditProfileForm = (
  state: EditProfileFormState,
  dispatch: React.Dispatch<EditProfileFormAction>,
  fieldName: keyof EditProfileFormState,
  value: string,
  maxLength: number,
  regexPattern: RegExp,
  customErrorMessage?: string
) => {
  const formattedFieldName = formatFieldName(fieldName);

  if (value === null || value.trim().length === 0) {
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
  } else if (value.length > maxLength) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${formattedFieldName} must not exceed ${maxLength} characters`,
    });
  } else if (fieldName === "phoneNumber" && !/^\d+$/.test(value)) {
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
