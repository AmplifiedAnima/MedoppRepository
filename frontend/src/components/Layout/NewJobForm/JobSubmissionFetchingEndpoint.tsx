import { Offer } from "../../JobOffers/OfferInterface";
import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router";

export interface HandleSubmitFunction {
  (
    title: string,
    company: string,
    salary: string,
    selectedLabel: string,
    selectedSpecialty: string,
    location: string,
    selectedTypeOfEmployment: string,
    description: string,
    latitude: number,
    longitude: number,
    dispatch: Dispatch<any>,
    navigate: NavigateFunction
  ): Promise<void>;
}

export const handleSubmit: HandleSubmitFunction = async (
  title,
  company,
  salary,
  selectedLabel,
  selectedSpecialty,
  location,
  selectedTypeOfEmployment,
  description,
  latitude,
  longitude,
  dispatch,
  navigate
) => {
  const offer: Offer = {
    id: uuidv4(),
    label: selectedLabel,
    specialties: selectedSpecialty,
    title,
    company,
    location,
    salary,
    typeOfEmployment: selectedTypeOfEmployment,
    description,
    latitude,
    longitude,
  };

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(offer),
    });
    console.log(JSON.stringify(offer));
    if (response.ok) {
      dispatch({
        type: "SHOW_SUCCESS",
        payload: "The Job offer has been created",
      });
      const data = await response.json();
      console.log("Response from the backend:", data);
    }
  } catch (error) {
    dispatch({
      type: "SHOW_ERROR",
      payload: `ERROR: ${error}`,
    });
  }
  setTimeout(() => {
    dispatch({ type: "CLEAR_ALERTS" });
  }, 3500);
  navigate("/");
};
