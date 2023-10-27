import React, { createContext, useState, ReactNode, useEffect } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  darkModeStyle: google.maps.MapTypeStyle[];
  lightModeStyle: google.maps.MapTypeStyle[];
}

export const ThemeContext = createContext<ThemeContextProps>({
  themeMode: "light",
  toggleTheme: () => {},
  darkModeStyle: [],
  lightModeStyle: [],
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const storedTheme = localStorage.getItem("themeMode");
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    (storedTheme as ThemeMode) || "light"
  );

  // Save the theme mode to local storage when it changes
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const darkModeStyle: google.maps.MapTypeStyle[] = [
    {
      elementType: "geometry",
      stylers: [{ color: "#002b00" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#002b00" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#FFFFFF" }],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [{ color: "#FFFFFF" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#FFFFFF" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#004400" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#00ff00" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#263139" }],
    },
    {
      featureType: "landscape",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#00000" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#293039" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#293039" }],
    },
  ];

  const lightModeStyle: google.maps.MapTypeStyle[] = [
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#99CEFF" }],
    },
    {
      featureType: "landscape",
      stylers: [{ color: "#FFFFFF" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#99CEFF" }],
    },
  ];

  return (
    <ThemeContext.Provider
      value={{ themeMode, toggleTheme, darkModeStyle, lightModeStyle }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
