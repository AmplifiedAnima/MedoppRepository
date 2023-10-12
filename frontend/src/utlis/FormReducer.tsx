import {
  ApplicationViewState,
  NewJobFormState,
  NewJobFormAction,
  JobApplicationViewAction,
  RegistrationFormState,
  RegistrationFormAction,
  initialRegistrationState,
  EditProfileFormState,
  EditProfileFormAction,
} from "./initialStatesForForms";

export const NewJobFormReducer = (
  state: NewJobFormState,
  action: NewJobFormAction
): NewJobFormState => {
  switch (action.type) {
    case "CLEAR_FIELDS":
      return {
        ...state,
        title: "",
        company: "",
        location: "",
        salary: "",
        selectedTypeOfEmployment: "",
        description: "",
        selectedSpecialty: "",
      };
    case "UPDATE_FIELD":
      // Clear the error message for the field when its value changes
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "", // Clear the error message
        },
      };
    case "UPDATE_ERROR_MESSAGE":
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: action.errorMessage,
        },
      };
    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "", // Clear the error message
        },
      };
    case "CLEAR_ALL_ERRORS_NEWJOBFORM":
      const clearedErrorMessagesNewJobForm = {
        title: "",
        selectedLabel: "",
        company: "",
        selectedSpecialty: "",
        location: "",
        salary: "",
        selectedTypeOfEmployment: "",
        description: "",
      };

      return {
        ...state,
        errorMessages: clearedErrorMessagesNewJobForm,
      };

    case "SUBMIT_FORM":
      console.log("Form data submitted:", action.formData);
      return state;
  }
};

export const JobApplicationViewReducer = (
  state: ApplicationViewState,
  action: JobApplicationViewAction
): ApplicationViewState => {
  switch (action.type) {
    case "CLEAR_FIELDS":
      return {
        ...state,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        coverLetter: "",
        cvFile: null,
      };
    case "UPDATE_FIELD":
      // Clear the error message for the field when its value changes
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "", // Clear the error message
        },
      };
    case "UPDATE_ERROR_MESSAGE":
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: action.errorMessage,
        },
      };
    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "", // Clear the error message
        },
      };
    case "CLEAR_ALL_ERRORS":
      const clearedErrorMessagesApplicationView = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        coverLetter: "",
      };

      return {
        ...state,
        errorMessages: clearedErrorMessagesApplicationView,
      };

    case "SUBMIT_FORM":
      console.log("Form data submitted:", action.formData);
      return state;

    default:
      return state;
  }
};
type ConfirmationPasswordChangeAction = {
  type: "CONFIRM_PASSWORD_CHANGE";
  value: string;
};

export const registrationFormReducer = (
  state: RegistrationFormState,
  action: RegistrationFormAction | ConfirmationPasswordChangeAction
): RegistrationFormState => {
  switch (action.type) {
    case "CLEAR_FIELDS":
      // Clear all form fields and error messages
      return {
        ...initialRegistrationState, // Use your initial state to reset the fields
      };

    case "UPDATE_FIELD":
      // Update a specific field value and clear its error message
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "", // Clear the error message
        },
      };

    case "UPDATE_ERROR_MESSAGE":
      // Update the error message for a specific field
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: action.errorMessage,
        },
      };

    case "CLEAR_ERROR_MESSAGE":
      // Clear the error message for a specific field
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "", // Clear the error message
        },
      };

    case "SUBMIT_FORM":
      // Handle form submission (you can add your submission logic here)
      console.log("Form data submitted:", action.formData);
      return state;

    case "CONFIRM_PASSWORD_CHANGE":
      // Validate password and confirmation password match
      if (action.value !== state.password) {
        return {
          ...state,
          errorMessages: {
            ...state.errorMessages,
            confirmPassword: "Passwords do not match",
          },
        };
      } else {
        return {
          ...state,
          errorMessages: {
            ...state.errorMessages,
            confirmPassword: "", // Clear the error message
          },
        };
      }

    default:
      return state;
  }
};

export const EditProfileFormReducer = (
  state: EditProfileFormState,
  action: EditProfileFormAction
): EditProfileFormState => {
  switch (action.type) {
    case "CLEAR_FIELDS":
      return {
        ...state,
        // Define how you want to clear the fields for Edit Profile
      };
    case "UPDATE_FIELD":
      // Clear the error message for the field when its value changes
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "", // Clear the error message
        },
      };
    case "UPDATE_ERROR_MESSAGE":
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: action.errorMessage,
        },
      };
    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "", // Clear the error message
        },
      };
    case "CLEAR_ALL_ERRORS":
      // Clear all error messages
      const clearedErrorMessagesEditProfile = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        cv: "",
        address: "",
        city: "",
        // Define the structure of your error messages based on the fields in your EditProfileFormState
      };

      return {
        ...state,
        errorMessages: clearedErrorMessagesEditProfile,
      };

    case "SUBMIT_FORM":
      console.log("Edit Profile form data submitted:", action.formData);
      return state;

    default:
      return state;
  }
};
