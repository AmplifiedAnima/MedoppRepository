import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { FilterContextProvider } from "./utlis/FilterContext";
import { ThemeProvider } from "./styles/ThemeProvider";
import { IsLoggedInContextProvider } from "./utlis/IsLoggedInContext";
import { AlertContextProvider } from "./utlis/AlertHandlingContext";

export const GOOGLE_API_KEY = "AIzaSyBFWPSF5pcM4gYaGgn8FcuRnm6DGBSvKLU";

const loadGoogleMapsAPIKey = (callback: () => void) => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = callback; // This callback will be called when the script is loaded
  document.head.appendChild(script);
};

// Call loadGoogleMapsAPIKey with your rendering code as the callback
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
