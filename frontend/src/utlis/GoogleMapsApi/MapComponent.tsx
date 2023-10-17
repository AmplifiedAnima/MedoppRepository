import React, {
  useEffect,
  useRef,
  useContext,
  useCallback,
  useState,
} from "react";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import { Box, Popover } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { FilterContext, initialFilterState } from "../FilterContext";
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";

import ClusterPopover from "./ClusterPopover";
import { Offer } from "../../components/JobOffers/OfferInterface";
import { getOfferIconUrl } from "./MapComponentUtils";
import { calculateMostCommonSpecialty } from "./MapComponentUtils";

interface MapProps {
  offers: Offer[] | [];
  isExpanded?: boolean;
  onOfferClick: (offer: Offer) => void;
  selectedOffer: Offer | null;
  mapRef: React.RefObject<HTMLDivElement>;
}

const MapComponent: React.FC<MapProps> = ({
  offers,
  isExpanded,
  onOfferClick,
  selectedOffer,
  mapRef,
}) => {
  const map = useRef<google.maps.Map | null>(null);
  const markers: google.maps.Marker[] = [];

  const { themeMode, darkModeStyle, lightModeStyle } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { state: filterState, dispatch } = useContext(FilterContext);
  const location = useLocation();
  const homeLocation = location.pathname === "/";

  const onMarkerClick = useCallback(
    (offer: Offer) => {
      onOfferClick(offer);
      const offerId = offer.id;
      navigate(`/offers/${offerId}`);
    },
    [onOfferClick, navigate]
  );

  useEffect(() => {
    if (!mapRef.current || !offers) return;

    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(52.1183303, 19.0677357), // The center of Poland
      zoom: 6.5,
      scrollwheel: false,
      styles: themeMode === "dark" ? darkModeStyle : lightModeStyle,
    };

    map.current = new google.maps.Map(mapRef.current, mapOptions);

    if (homeLocation && filterState.selectedOffer) {
      dispatch({ type: "SET_INITIAL_FILTER_STATE" });
    }
    offers.forEach((offer) => {
      let isSelected = selectedOffer?.id === offer.id;

      const iconUrl = getOfferIconUrl(
        offer.label,
        themeMode,
        isSelected,
        filterState
      );

      const markerOptions: google.maps.MarkerOptions = {
        position: new google.maps.LatLng(offer.latitude, offer.longitude),
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(40, 40),
        },
        visible: isSelected || selectedOffer === null,
        map: map.current, // Add the marker to the map
      };

      const marker = new google.maps.Marker(markerOptions);

      marker.set("offer", offer);

      marker.addListener("click", () => {
        onMarkerClick(offer);
      });

      if (isSelected) {
        map.current?.panTo(
          new google.maps.LatLng(offer.latitude, offer.longitude)
        );

        map.current?.setZoom(10);
      }

      markers.push(marker);
    });

    return () => {};
  }, [themeMode, markers, onMarkerClick]);

  return (
    <Box style={{ height: isExpanded ? "672px" : "300px" }} ref={mapRef}></Box>
  );
};

export default MapComponent;
