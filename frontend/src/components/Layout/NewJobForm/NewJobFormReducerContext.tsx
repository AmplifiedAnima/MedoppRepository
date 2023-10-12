import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";
import { NewJobFormState, initialState } from "./initialStates";
export type FormAction =
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
      type: "CLEAR_ALL_ERRORS"; // New action type to clear all errors
    }
  | { type: "CLEAR_FIELDS" }
  | {
      type: "SUBMIT_FORM";
      formData: FormData;
    };

export const formReducer = (
  state: NewJobFormState,
  action: FormAction
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
    case "CLEAR_ALL_ERRORS":
      const clearedErrorMessages = {
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
        errorMessages: clearedErrorMessages,
      };
   
    case "SUBMIT_FORM":
      console.log("Form data submitted:", action.formData);
      return state;
  }
};

// Create a context for your form state and dispatch
interface NewJobFormContextType {
  state: NewJobFormState;
  dispatch: Dispatch<FormAction>;
}

const NewJobFormContext = createContext<NewJobFormContextType | undefined>(
  undefined
);

// Create a custom hook to access the context
export const useNewJobFormContext = () => {
  const context = useContext(NewJobFormContext);
  if (context === undefined) {
    throw new Error(
      "useNewJobFormContext must be used within a NewJobFormContextProvider"
    );
  }
  return context;
};

// Create a context provider component
export const NewJobFormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <NewJobFormContext.Provider value={{ state, dispatch }}>
      {children}
    </NewJobFormContext.Provider>
  );
};

export const handleInputField = (
  state: NewJobFormState,
  dispatch: React.Dispatch<FormAction>,
  fieldName: keyof NewJobFormState,
  value: string,
  maxLength: number,
  regexPattern: RegExp
) => {
  if (value.trim().length === 0) {
    dispatch({
      type: "UPDATE_FIELD",
      fieldName: fieldName,
      fieldValue: "",
    });
  }
  if (!value.trim()) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${fieldName} is required.`,
    });
  } else if (value.length > maxLength) {
    dispatch({
      type: "UPDATE_ERROR_MESSAGE",
      fieldName: fieldName,
      errorMessage: `${fieldName} must not exceed ${maxLength} characters.`,
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
