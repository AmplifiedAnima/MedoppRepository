import React, { createContext, useState, ReactNode } from "react";

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
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const darkModeStyle: google.maps.MapTypeStyle[] = [
    {
      elementType: "geometry",
      stylers: [{ color: "#002b00" }], // Glowing green background
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#002b00" }], // Glowing green text stroke
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }], // Glowing green text
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#FFFFFF" }], // Glowing green text for administrative labels
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [{ color: "#FFFFFF" }], // Glowing green text for country labels
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#FFFFFF" }], // Glowing green text for city labels
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }], // Glowing green text for points of interest
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#004400" }], // Dark green color for park geometry
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }], // Glowing green text for park labels
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#000000" }], // Black color for all roads
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#000000" }], // Black color for all road borders
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }], // Glowing green text for road labels
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#000000" }], // Black color for highways
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#000000" }], // Black color for highway borders
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }], // Glowing green text for highway labels
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#00ff00" }], // Glowing green color for transit lines
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }], // Glowing green text for transit station labels
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#263139" }], // Dark green color for every land
    },
    {
      featureType: "landscape",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00ff00" }], // Glowing green text for landscape labels
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#00000" }], // Light greyish color for water
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#293039" }], // Glowing green text for water labels
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#293039" }], // Glowing green text stroke for water labels
    },
  ];

  const lightModeStyle: google.maps.MapTypeStyle[] = [];

  return (
    <ThemeContext.Provider
      value={{ themeMode, toggleTheme, darkModeStyle, lightModeStyle }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
