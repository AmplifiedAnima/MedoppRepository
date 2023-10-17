import React, { useRef, useEffect, useContext, useState } from "react";
import { TextField, Box } from "@mui/material";
import { getInputPlaceholdersStyling } from "../../styles/formStyling";
import { ThemeContext } from "../../styles/ThemeProviderContext";

const MapComponent: React.FC<{ lat: number; lng: number, }> = ({ lat, lng, }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current!, {
      center: { lat, lng },
      zoom: 6, 
    });

    new window.google.maps.Marker({
      position: { lat, lng },
      map,
    });
  }, [lat, lng]);

  return <Box ref={mapRef} style={{ width: "100%", height: "200px" }} />;
};

interface GeoCodingPlaceComponentProps {
  apiKey: string;
  onLocationChanged: (lat: number, lng: number, location: string) => void;
  initialLat:number,
  initialLng:number,
  initialLocation: string
  readOnly?: boolean
}

const GeoCodingPlaceComponent: React.FC<GeoCodingPlaceComponentProps> = ({
  apiKey,
  onLocationChanged,
  initialLat,
  initialLng,
  initialLocation,
  readOnly
}) => {
  const { themeMode } = useContext(ThemeContext);
  const inputPlaceholdersStyling = getInputPlaceholdersStyling(themeMode);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [lat, setLat] = useState<number>(initialLat); 
  const [lng, setLng] = useState<number>(initialLng);
  
  useEffect(() => {
    const searchBox = new window.google.maps.places.SearchBox(
      inputRef.current!
    );
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const lat = place.geometry?.location?.lat() || 0;
        const lng = place.geometry?.location?.lng() || 0;
        const location = place.formatted_address || "";
        setLat(lat);
        setLng(lng);
        onLocationChanged(lat, lng, location);
      }
    });
  }, [onLocationChanged]);

  return (
    <>
      <TextField
        variant="outlined"
        fullWidth
        placeholder={initialLocation}
        inputRef={inputRef}
        sx={{ ...inputPlaceholdersStyling, marginBottom: "25px" }}
        disabled={readOnly}
      />

      <MapComponent lat={lat} lng={lng} />
    </>
  );
};

export default GeoCodingPlaceComponent;
