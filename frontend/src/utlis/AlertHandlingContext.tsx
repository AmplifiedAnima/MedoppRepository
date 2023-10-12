import React, { createContext, useContext, useReducer } from "react";

interface AlertContextInterface {
  messages: {
    error: string;
    success: string;
    warning: string;
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
  | { type: "CLEAR_ALERTS" }

const initialState = {
  error: "",
  success: "",
  warning: "",
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
      case "CLEAR_ALERTS":
      return { ...state, error: "", success: "", warning: "" };
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

export const AlertContextProvider: React.FC<AlertContextProviderProps> = ({ children }) => {
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
