export interface NewJobFormState {
  title: string;
  selectedLabel: string;
  company: string;
  selectedSpecialty: string;
  location: string;
  salary: string;
  selectedTypeOfEmployment: string;
  description: string;
  latitude: number;
  longitude: number;
  errorMessages: {
    title: string;
    selectedLabel: string;
    company: string;
    selectedSpecialty: string;
    location: string;
    salary: string;
    selectedTypeOfEmployment: string;
    description: string;
  };
}

export const initialStateNewJobForm: NewJobFormState = {
  title: "",
  selectedLabel: "",
  company: "",
  selectedSpecialty: "",
  location: "",
  salary: "",
  selectedTypeOfEmployment: "",
  description: "",
  latitude: 52.237,
  longitude: 21.0176,
  errorMessages: {
    title: "",
    selectedLabel: "",
    company: "",
    selectedSpecialty: "",
    location: "",
    salary: "",
    selectedTypeOfEmployment: "",
    description: "",
  },
};
export interface RegistrationFormState {
  firstName: string; // Add firstName field
  lastName: string; // Add lastName field
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  email: string;
  cv: File | null;
  address: string;
  city: string;
  role: string;
  errorMessages: {
    firstName: string; // Add firstName error message field
    lastName: string; // Add lastName error message field
    username: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    email: string;
    cv: string;
    address: string;
    city: string;
    role: string;
  };
}

export const initialRegistrationState: RegistrationFormState = {
  firstName: "", // Initialize firstName field
  lastName: "", // Initialize lastName field
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  email: "",
  cv: null,
  address: "",
  city: "",
  role: "Employee",
  errorMessages: {
    firstName: "",
    lastName: "",

    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    email: "",
    cv: "",
    address: "",
    city: "",
    role: "",
  },
};

export interface ApplicationViewState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
  cvFile: File | null;
  errorMessages: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    coverLetter: string;
  };
}

export const initialApplicationViewState: ApplicationViewState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  coverLetter: "",
  cvFile: null,
  errorMessages: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    coverLetter: "",
  },
};

export interface EditProfileFormState {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  cv: File | null;
  address: string;
  city: string;
  errorMessages: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    cv: string;
    address: string;
    city: string;
  };
}

export const initialEditProfileState: EditProfileFormState = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: '',
  cv: null,
  address: "",
  city: "",
  errorMessages: {
    username: "",
    password:"",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: '',
    cv: "",
    address: "",
    city: "",
  },
};

export type NewJobFormAction =
  | {
      type: "UPDATE_FIELD";
      fieldName: keyof NewJobFormState;
      fieldValue: string | number;
    }
  | {
      type: "UPDATE_ERROR_MESSAGE";
      fieldName: keyof NewJobFormState;
      errorMessage: string;
    }
  | {
      type: "CLEAR_ERROR_MESSAGE";
      fieldName: keyof NewJobFormState;
    }
  | {
      type: "CLEAR_ALL_ERRORS_NEWJOBFORM"; // New action type to clear all errors
    }
  | { type: "CLEAR_FIELDS" }
  | {
      type: "SUBMIT_FORM";
      formData: FormData;
    };

export type JobApplicationViewAction =
  | {
      type: "UPDATE_FIELD";
      fieldName: keyof ApplicationViewState;
      fieldValue: string | number;
    }
  | {
      type: "UPDATE_ERROR_MESSAGE";
      fieldName: keyof ApplicationViewState;
      errorMessage: string;
    }
  | {
      type: "CLEAR_ERROR_MESSAGE";
      fieldName: keyof ApplicationViewState;
    }
  | {
      type: "CLEAR_ALL_ERRORS";
    }
  | { type: "CLEAR_FIELDS" }
  | {
      type: "SUBMIT_FORM";
      formData: FormData;
    };

export type RegistrationFormAction =
  | {
      type: "UPDATE_FIELD";
      fieldName: keyof RegistrationFormState;
      fieldValue: string | number;
    }
  | {
      type: "UPDATE_ERROR_MESSAGE";
      fieldName: keyof RegistrationFormState;
      errorMessage: string;
    }
  | {
      type: "CLEAR_ERROR_MESSAGE";
      fieldName: keyof RegistrationFormState;
    }
  | {
      type: "CLEAR_ALL_ERRORS";
    }
  | { type: "CLEAR_FIELDS" }
  | {
      type: "SUBMIT_FORM";
      formData: FormData;
    };

export type EditProfileFormAction =
  | {
      type: "UPDATE_FIELD";
      fieldName: keyof EditProfileFormState;
      fieldValue: string | number;
    }
  | {
      type: "UPDATE_ERROR_MESSAGE";
      fieldName: keyof EditProfileFormState;
      errorMessage: string;
    }
  | {
      type: "CLEAR_ERROR_MESSAGE";
      fieldName: keyof EditProfileFormState;
    }
  | {
      type: "CLEAR_ALL_ERRORS"; // Updated action type to clear all errors
    }
  | { type: "CLEAR_FIELDS" }
  | {
      type: "SUBMIT_FORM";
      formData: FormData;
    };
