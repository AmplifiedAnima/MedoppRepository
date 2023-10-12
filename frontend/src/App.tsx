import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import MapComponent from "./utlis/MapComponent";
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
import { useAlertContext } from "./utlis/AlertHandlingContext";
import { IsLoggedInContext } from "./utlis/IsLoggedInContext";
import { UserAlreadyLoggedInHandler } from "./utlis/UserAlreadyLoggedInHandler";
import EmployersOffersView from "./components/Layout/EmployerOffersView";
const App = () => {
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [showJobBoard, setShowJobBoard] = useState(true);
  const [isMapReset, setIsMapReset] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const mapRef = useRef(null);
  const { state: filterState, dispatch } = useFilterContext();
  const { dispatch: customDispatch } = useAlertContext();

  // UserAlreadyLoggedInHandler();
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
        console.log(response); // Log the fetched offers
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
        console.log(response); // Log the filtered offers
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
    setIsMapReset(true);
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
      onCloseOffer={handleCloseOffer}
      isMapReset={isMapReset}
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
              onMapReset={() => setIsMapReset}
              handleCloseOffer={handleCloseOffer}
              isMobile={isMobile}
              showOfferCard={showJobBoard}
              selectedOffer={filterState.selectedOffer} // Pass the selected offer from filterState
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
              handleMapReset={() => setIsMapReset}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
