import { createContext, useContext, useEffect, useReducer } from "react";
import { Offer } from "../components/JobOffers/OfferInterface";

// Define the shape of the filter state
export interface FilterState {
  query: string;
  specialties: string;
  priceRange: { min: string; max: string };
  location: string;
  typeOfEmployment: string;
  selectedOffer: Offer | null;
}

export interface FilterOptions {
  minPrice: string;
  maxPrice: string;
  location: string;
  typeOfEmployment: string;
}

// Define the filter action types
type FilterAction =
  | {
      type: "SET_QUERY";
      payload: string;
    }
  | {
      type: "SET_SPECIALTIES";
      payload: string;
    }
  | {
      type: "SET_PRICE_RANGE";
      payload: { min: string; max: string };
    }
  | {
      type: "SET_LABEL";
      payload: string;
    }
  | {
      type: "SET_LOCATION";
      payload: string;
    }
  | {
      type: "SET_EMPLOYMENT_TYPE";
      payload: string;
    }
  | {
      type: "SET_SELECTED_OFFER";
      payload: Offer | null;
    }
  | { type: "SET_INITIAL_FILTER_STATE" };

// Define the filter context type
interface FilterContextType {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
}

// Create the initial filter state
export const initialFilterState: FilterState = {
  query: "",
  specialties: "",
  priceRange: { min: "0", max: "22000" },
  location: "",
  typeOfEmployment: "",
  selectedOffer: null,
};

// Create the filter context
export const FilterContext = createContext<FilterContextType>({
  state: initialFilterState,
  dispatch: () => {},
});

// Create the filter context provider component
export const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

// Define the filter reducer function
export const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_SPECIALTIES":
      return { ...state, specialties: action.payload };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_EMPLOYMENT_TYPE":
      return { ...state, typeOfEmployment: action.payload };
    case "SET_SELECTED_OFFER":
      return { ...state, selectedOffer: action.payload };
    case "SET_INITIAL_FILTER_STATE":
      return initialFilterState;
    default:
      return state;
  }
};

// Custom hook to easily access the filter context
export const useFilterContext = () => {
  const { state, dispatch } = useContext(FilterContext);
  return { state, dispatch };
};
