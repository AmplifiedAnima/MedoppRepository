import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { FilterContextProvider } from "./utlis/FilterContext";
import { ThemeProvider } from "./styles/ThemeProviderContext";
import { IsLoggedInContextProvider } from "./utlis/IsLoggedInContext";
import { AlertContextProvider } from "./utlis/AlertHandlingContext";
import { ThemeProvider as ThemeProviderMui } from "@mui/material/styles";
import themeForBreakpoints from "./styles/BreakpointsTheme"; // Import your custom theme

export const GOOGLE_API_KEY = "AIzaSyBFWPSF5pcM4gYaGgn8FcuRnm6DGBSvKLU";

const loadGoogleMapsAPIKey = (callback: () => void) => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  document.head.appendChild(script);
};

loadGoogleMapsAPIKey(() => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <Router>
        <AlertContextProvider>
          <IsLoggedInContextProvider>
            <ThemeProvider>
              <FilterContextProvider>
                <App />
              </FilterContextProvider>
            </ThemeProvider>
          </IsLoggedInContextProvider>
        </AlertContextProvider>
      </Router>
    </React.StrictMode>
  );
});
