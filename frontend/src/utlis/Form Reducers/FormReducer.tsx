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
        latitude: 52.237,
        longitude: 21.0176,
        salary: "",
        selectedTypeOfEmployment: "",
        description: "",
        selectedSpecialty: "",
      };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "",
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
          [action.fieldName]: "",
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
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "",
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
          [action.fieldName]: "",
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
      return {
        ...initialRegistrationState,
      };

    case "UPDATE_FIELD":
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "",
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
          [action.fieldName]: "",
        },
      };

    case "SUBMIT_FORM":
      console.log("Form data submitted:", action.formData);
      return state;

    case "CONFIRM_PASSWORD_CHANGE":
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
            confirmPassword: "",
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
      };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
        errorMessages: {
          ...state.errorMessages,
          [action.fieldName]: "",
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
          [action.fieldName]: "",
        },
      };
    case "CLEAR_ALL_ERRORS":
      const clearedErrorMessagesEditProfile = {
        username: "",
        password: "",
        currentPassword:'',
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        cv: "",
        address: "",
        city: "",
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
