import React, { useContext, useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MapComponent from "./utlis/GoogleMapsApi/MapComponent";
import { useMediaQuery } from "@mui/material";
import { OfferInterface } from "./components/JobOffers/Offer.Interface";
import { FilterState, useFilterContext } from "./utlis/FilterContext";
import ApplicantsWhoAppliedForOfferView from "./components/Layout/ApplicantsForOffers/ApplicantsWhoAppliedForOfferView";
import RegistrationPage from "./components/Layout/RegistrationPage/RegistrationPage";
import OffersViewWithMap from "./OffersViewWithMap";
import OfferWithIdAndMapView from "./OfferWithIdAndMapView";
import { EditProfilePageView } from "./components/Layout/EditProfilePage/EditProfilePageView";
import { initialFilterState } from "./utlis/FilterContext";
import NewJobCreationFormView from "./components/Layout/NewJobForm/NewJobCreationFormView";
import { UserAlreadyLoggedInHandler } from "./utlis/UserAlreadyLoggedInHandler";
import EmployersOffersView from "./components/Layout/MyOffersView/EmployerOffersView";
import { ThemeContext } from "./styles/ThemeProviderContext";

const App = () => {
  const [filteredOffers, setFilteredOffers] = useState<OfferInterface[]>([]);
  const [showJobBoard, setShowJobBoard] = useState(true);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const mapRef = useRef(null);
  const { state: filterState, dispatch } = useFilterContext();

  UserAlreadyLoggedInHandler();

  const navigate = useNavigate();

  const fetchOffers = async (filterState: FilterState) => {
    let {
      typeOfEmployment,
      location,
      priceRange,
      query,
      specialties,
      selectedOffer,
    } = filterState;
    console.log(selectedOffer?.id);

    if (filterState === initialFilterState) {
      try {
        const response = await fetch("http://localhost:3000/offers");
        const data = await response.json();
        setFilteredOffers(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const params = new URLSearchParams();
        params.append("location", location);
        priceRange.min !== "0" && params.append("minPrice", priceRange.min);
        priceRange.max !== "22000" && params.append("maxPrice", priceRange.max);
        params.append("query", query);
        params.append("typeOfEmployment", typeOfEmployment);
        params.append("specialties", specialties);
        const response = await fetch(`http://localhost:3000/offers?${params}`);
        const data = await response.json();
        const offersArray = Array.isArray(data) ? data : [data]; // Wrap in an array if it's a single offer
        setFilteredOffers(offersArray as OfferInterface[]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchOffers(filterState);
  }, [filterState, dispatch]);

  const handleOfferClick = (offer: OfferInterface | null): void => {
    dispatch({ type: "SET_SELECTED_OFFER", payload: offer });
  };

  const handleCloseOffer = (): void => {
    navigate("/");
  };

  const handleToggleJobBoard = () => {
    setShowJobBoard(!showJobBoard);
  };

  const mapComponent = (
    <MapComponent
      offers={filteredOffers}
      onOfferClick={handleOfferClick}
      selectedOffer={filterState.selectedOffer}
      mapRef={mapRef}
    />
  );

  return (
    <>
      <Routes>
        <Route
          path="/new-job-offer"
          element={
            <>
              <NewJobCreationFormView />
            </>
          }
        />
        <Route
          path="/job-applications"
          element={
            <>
              <ApplicantsWhoAppliedForOfferView />
            </>
          }
        />
        <Route
          path="/user-offers"
          element={
            <>
              <EmployersOffersView />
            </>
          }
        />
        <Route
          path="/register-user"
          element={
            <>
              <RegistrationPage />
            </>
          }
        />
        <Route
          path="/edit-user-profile"
          element={
            <>
              <EditProfilePageView />
            </>
          }
        />
        <Route
          path="/offers/:id"
          element={
            <OfferWithIdAndMapView
              mapComponent={mapComponent}
              handleCloseOffer={handleCloseOffer}
              isMobile={isMobile}
              showOfferCard={showJobBoard}
              selectedOffer={filterState.selectedOffer}
              handleToggleOfferCard={handleToggleJobBoard}
            />
          }
        />
        <Route
          path="/"
          element={
            <OffersViewWithMap
              isMobile={isMobile}
              showJobBoard={showJobBoard}
              handleToggleJobBoard={handleToggleJobBoard}
              filteredOffers={filteredOffers}
              handleOfferClick={handleOfferClick}
              handleOfferClose={handleCloseOffer}
              mapComponent={mapComponent}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
