import React, {
  useEffect,
  useRef,
  useContext,
  useCallback,
  useState,
} from "react";
import { ThemeContext } from "../styles/ThemeProvider";
import { Box, Popover } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { FilterContext, initialFilterState } from "./FilterContext";
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";

import ClusterPopover from "./ClusterPopover";
import { Offer } from "../components/JobOffers/OfferInterface";
import { getOfferIconUrl } from "./MapComponentUtils";
import { calculateMostCommonSpecialty } from "./MapComponentUtils";

interface MapProps {
  offers: Offer[] | [];
  isExpanded?: boolean;
  onOfferClick: (offer: Offer) => void;
  selectedOffer: Offer | null;
  mapRef: React.RefObject<HTMLDivElement>;
  onCloseOffer: () => void;
  isMapReset: boolean;
}

const MapComponent: React.FC<MapProps> = ({
  offers,
  isExpanded,
  onOfferClick,
  selectedOffer,
  mapRef,
  onCloseOffer,
  isMapReset,
}) => {
  // State to manage the selected cluster's offers and popover

  const [selectedClusterOffers, setSelectedClusterOffers] = useState<Offer[]>(
    []
  );
  const [isClusterPopoverOpen, setIsClusterPopoverOpen] = useState(false);
  const [clusterPopoverAnchor, setClusterPopoverAnchor] =
    useState<HTMLElement | null>(null);

  // Refs to manage the map and markers
  const map = useRef<google.maps.Map | null>(null);
  const markers: google.maps.Marker[] = [];
  const markerCluster = useRef<MarkerClusterer | null>(null);
  const [showCluster, setShowCluster] = useState(true);
  // Context and routing hooks
  const { themeMode, darkModeStyle, lightModeStyle } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { state: filterState, dispatch } = useContext(FilterContext);
  const location = useLocation();
  const homeLocation = location.pathname === "/";
  const { id } = useParams();

  // Function to handle marker click
  const onMarkerClick = useCallback(
    (offer: Offer) => {
      onOfferClick(offer);
      const offerId = offer.id;
      navigate(`/offers/${offerId}`);
    },
    [onOfferClick, navigate]
  );

  // const handleClusterClick = (cluster: MarkerClusterer) => {
  //   const markersInCluster = cluster.get("markers") as google.maps.Marker[];

  //   const offersInCluster = markersInCluster.map((marker: any) => {
  //     return marker.offer;
  //   });

  //   setSelectedClusterOffers(offersInCluster);

  //   setIsClusterPopoverOpen(true);
  //   const mostCommonSpecialty = calculateMostCommonSpecialty(cluster);
  // };

  // // The center of Poland
  // const polandCenter = new google.maps.LatLng(52.1183303, 19.0677357);

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

    return () => {
      
    };
  }, [themeMode, markers, onMarkerClick]);

  return (
    <Box
      style={{ height: isExpanded ? "calc(100vh - 75px)" : "300px" }}
      ref={mapRef}
    >
      <Popover
        open={isClusterPopoverOpen}
        anchorEl={clusterPopoverAnchor}
        onClose={() => setIsClusterPopoverOpen(false)}
      >
        <ClusterPopover
          open={isClusterPopoverOpen}
          anchorEl={clusterPopoverAnchor}
          offers={selectedClusterOffers}
          onClose={() => setIsClusterPopoverOpen(false)}
          onOfferClickFromCluster={onOfferClick}
          filterState={filterState}
        />
      </Popover>
    </Box>
  );
};

export default MapComponent;
