import React, { createContext, useContext, useReducer } from "react";

interface AlertContextInterface {
  messages: {
    error: string;
    success: string;
    warning: string;
    specialty: string;
    location: string;
    typeOfEmployment: string;
    priceRange: string;
  };
  dispatch: React.Dispatch<AlertAction>;
}

type AlertAction =
  | { type: "SHOW_ERROR"; payload: string }
  | { type: "HIDE_ERROR" }
  | { type: "SHOW_SUCCESS"; payload: string }
  | { type: "HIDE_SUCCESS" }
  | { type: "SHOW_WARNING"; payload: string }
  | { type: "HIDE_WARNING" }
  | { type: "SHOW_LOCATION"; payload: string }
  | { type: "HIDE_LOCATION" }
  | { type: "SHOW_SPECIALTY"; payload: string }
  | { type: "HIDE_SPECIALTY" }
  | { type: "SHOW_TYPEOFEMPLOYMENT"; payload: string }
  | { type: "HIDE_TYPEOFEMPLOYMENT" }
  | { type: "SHOW_PRICERANGE"; payload: string }
  | { type: "HIDE_PRICERANGE" }
  | { type: "CLEAR_ALERTS" }
  | { type: "CLEAR_ALL_NOTIFICATIONS" };

const initialState = {
  error: "",
  success: "",
  warning: "",
  specialty: "",
  location: "",
  typeOfEmployment: "",
  priceRange: "",
};

const alertReducer = (state: typeof initialState, action: AlertAction) => {
  switch (action.type) {
    case "SHOW_ERROR":
      return { ...state, error: action.payload };
    case "HIDE_ERROR":
      return { ...state, error: "" };
    case "SHOW_SUCCESS":
      return { ...state, success: action.payload };
    case "HIDE_SUCCESS":
      return { ...state, success: "" };
    case "SHOW_WARNING":
      return { ...state, warning: action.payload };
    case "HIDE_WARNING":
      return { ...state, warning: "" };
    case "SHOW_LOCATION":
      return { ...state, location: action.payload };
    case "HIDE_LOCATION":
      return { ...state, location: "" };
    case "SHOW_SPECIALTY":
      return { ...state, specialty: action.payload };
    case "HIDE_SPECIALTY":
      return { ...state, specialty: "" };
    case "SHOW_TYPEOFEMPLOYMENT":
      return { ...state, typeOfEmployment: action.payload };
    case "HIDE_TYPEOFEMPLOYMENT":
      return { ...state, typeOfEmployment: "" };
    case "SHOW_PRICERANGE":
      return { ...state, priceRange: action.payload };
    case "HIDE_PRICERANGE":
      return { ...state, priceRange: "" };
    case "CLEAR_ALERTS":
      return {
        ...state,
        error: "",
        success: "",
        warning: "",
      };
    case "CLEAR_ALL_NOTIFICATIONS":
      return {
        ...state,
        location: "",
        typeOfEmployment: "",
        specialty: "",
        priceRange: "",
      };
    default:
      return state;
  }
};

type AlertContextProviderProps = {
  children: React.ReactNode;
};

const alertContext = createContext<AlertContextInterface | undefined>(
  undefined
);

export const AlertContextProvider: React.FC<AlertContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const contextValue: AlertContextInterface = {
    messages: state,
    dispatch,
  };

  return (
    <alertContext.Provider value={contextValue}>
      {children}
    </alertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(alertContext);
  if (!context) {
    throw new Error("useErrorContext must be used within an ErrorProvider");
  }
  return context;
};
