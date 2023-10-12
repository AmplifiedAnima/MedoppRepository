import { MedoppIcons } from "../components/IconsIconFinder";
import { FilterState } from "./FilterContext";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

export const getOfferIconUrl =(
    label: string,
    themeMode: string,
    isSelected: boolean,
    filterState: FilterState
  ) => {
    const isSelectedOffer =
      isSelected || filterState.selectedOffer?.id === label;
    switch (label) {
      case "Care":
        return isSelectedOffer
          ? MedoppIcons.Care_Red
          : themeMode === "light"
          ? MedoppIcons.Care_White
          : MedoppIcons.Care_Green;
      case "Doctor":
        return isSelectedOffer
          ? MedoppIcons.Doctor_Red
          : themeMode === "light"
          ? MedoppIcons.Doctor_White
          : MedoppIcons.Doctor_Green;
      case "Nurse":
        return isSelectedOffer
          ? MedoppIcons.Nurse_Red
          : themeMode === "light"
          ? MedoppIcons.Nurse_Blue
          : MedoppIcons.Nurse_Green;
      case "Pharmacist":
        return isSelectedOffer
          ? MedoppIcons.Pharmacist_Red
          : themeMode === "light"
          ? MedoppIcons.Pharmacist_White
          : MedoppIcons.Pharmacist_Green;
      case "Physiotherapist":
        return isSelectedOffer
          ? MedoppIcons.Physio_Red
          : themeMode === "light"
          ? MedoppIcons.Physio_White
          : MedoppIcons.Physio_Green;
      case "Paramedic":
        return isSelectedOffer
          ? MedoppIcons.ParaMedic_Red
          : themeMode === "light"
          ? MedoppIcons.ParaMedic_White
          : MedoppIcons.ParaMedic_Green;
      case "It":
        return isSelectedOffer
          ? MedoppIcons.It_Red
          : themeMode === "light"
          ? MedoppIcons.It_White
          : MedoppIcons.It_Green;
      case "Technician":
        return isSelectedOffer
          ? MedoppIcons.Technician_Red
          : themeMode === "light"
          ? MedoppIcons.Technician_White
          : MedoppIcons.Technician_Green;
      default:
        return "default-icon.png";
    }
  }

  // Function to calculate the most common specialty in a cluster
  export const calculateMostCommonSpecialty = (cluster: MarkerClusterer) => {
    const markersInCluster = cluster.get("markers") as google.maps.Marker[];
    const specialtiesCount: { [key: string]: number } = {};

    markersInCluster.forEach((marker: any) => {
      const offer = marker.offer;
      if (offer && offer.label) {
        specialtiesCount[offer.label] =
          (specialtiesCount[offer.label] || 0) + 1;
      }
    });

    let mostCommonSpecialty = "";
    let maxCount = 0;

    for (const specialty in specialtiesCount) {
      if (specialtiesCount[specialty] > maxCount) {
        mostCommonSpecialty = specialty;
        maxCount = specialtiesCount[specialty];
      }
    }
    console.log(mostCommonSpecialty);
    return mostCommonSpecialty;
  };

  // Function to handle cluster click
