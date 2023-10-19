import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MapComponent from "./utlis/GoogleMapsApi/MapComponent";
import { useMediaQuery } from "@mui/material";
import { Offer } from "./components/JobOffers/OfferInterface";
import { FilterState, useFilterContext } from "./utlis/FilterContext";
import ApplicantsWhoAppliedForOfferView from "./components/Layout/ApplicantsWhoAppliedForOfferView";
import RegistrationPage from "./components/Layout/RegistrationPage/RegistrationPage";
import OffersViewWithMap from "./OffersViewWithMap";
import OfferWithIdAndMapView from "./OfferWithIdAndMapView";
import { EditProfilePage } from "./components/Layout/EditProfilePage/EditProfilePage";
import { initialFilterState } from "./utlis/FilterContext";
import NewJobCreationForm from "./components/Layout/NewJobForm/NewJobCreationForm";
import { UserAlreadyLoggedInHandler } from "./utlis/UserAlreadyLoggedInHandler";
import EmployersOffersView from "./components/Layout/MyOffersView/EmployerOffersView";

const App = () => {
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
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
        console.log(response);
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
        setFilteredOffers(offersArray as Offer[]);
        console.log(response); 
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchOffers(filterState);
    console.log(filterState.selectedOffer);
  }, [filterState, dispatch]);

  const handleOfferClick = (offer: Offer | null): void => {
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
      isExpanded={true}
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
              <NewJobCreationForm />
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
              <EditProfilePage />
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
