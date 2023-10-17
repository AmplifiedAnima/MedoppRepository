import { useFilterContext } from "../../utlis/FilterContext"; // Import your context and hooks
import { useAlertContext } from "../../utlis/AlertHandlingContext";
import { FilterOptions } from "../../utlis/FilterContext";
import { useState } from "react";

export const useSearchHook = (handleFilterModalClose?: () => void) => {
  const { dispatch: filterDispatch } = useFilterContext();
  const { dispatch } = useAlertContext();
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterOptionsApply = (filterOptions: FilterOptions) => {
    filterDispatch({
      type: "SET_PRICE_RANGE",
      payload: { min: filterOptions.minPrice, max: filterOptions.maxPrice },
    });

    filterDispatch({ type: "SET_LOCATION", payload: filterOptions.location });
    filterDispatch({
      type: "SET_EMPLOYMENT_TYPE",
      payload: filterOptions.typeOfEmployment,
    });
    if (filterOptions.location) {
      dispatch({
        type: "SHOW_LOCATION",
        payload: `Selected location: ${filterOptions.location}`,
      });
    }
    if (filterOptions.typeOfEmployment) {
      dispatch({
        type: "SHOW_TYPEOFEMPLOYMENT",
        payload: `Selected employment type: ${filterOptions.typeOfEmployment}`,
      });
    }

    if (filterOptions.maxPrice && filterOptions.maxPrice) {
      if (
        filterOptions.minPrice === "0" &&
        filterOptions.maxPrice === "30000"
      ) {
        dispatch({ type: "HIDE_PRICERANGE" });
      } else {
        dispatch({
          type: "SHOW_PRICERANGE",
          payload: `Salary from :
        ${filterOptions.minPrice} PLN/MONTH
        to
        ${filterOptions.maxPrice} PLN/MONTH`,
        });
      }
    }
  };

  const handleSpecialtyReset = () => {
    filterDispatch({ type: "SET_SPECIALTIES", payload: "" });
  };

  const handleLocationReset = () => {
    filterDispatch({ type: "SET_LOCATION", payload: "" });
  };

  const handleTypeOfEmploymentReset = () => {
    filterDispatch({ type: "SET_EMPLOYMENT_TYPE", payload: "" });
  };

  const handlePriceRangeReset = () => {
    filterDispatch({
      type: "SET_PRICE_RANGE",
      payload: {
        min: "",
        max: "",
      },
    });
  };

  const handleButtonSearch = (specialty: string) => {
    filterDispatch({ type: "SET_SPECIALTIES", payload: specialty });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  const handleSearchSubmit = () => {
    filterDispatch({ type: "SET_QUERY", payload: searchQuery });
  };
  const handleResetAllSearchQueries = () => {
    filterDispatch({ type: "SET_INITIAL_FILTER_STATE" });
    if (handleFilterModalClose) {
      handleFilterModalClose();
    }
  };

  return {
    handleResetAllSearchQueries,
    handleFilterOptionsApply,
    handleSpecialtyReset,
    handleLocationReset,
    handleTypeOfEmploymentReset,
    handlePriceRangeReset,
    handleButtonSearch,
    handleInputChange,
    handleSearchSubmit,
    searchQuery,
  };
};
