import { createContext, useContext, useReducer } from "react";
import { OfferInterface } from "../components/JobOffers/Offer.Interface";

export interface FilterState {
  query: string;
  specialties: string;
  priceRange: { min: string; max: string };
  location: string;
  typeOfEmployment: string;
  selectedOffer: OfferInterface | null;
}

export interface FilterOptions {
  minPrice: string;
  maxPrice: string;
  location: string;
  typeOfEmployment: string;
}

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
      payload: OfferInterface | null;
    }
  | { type: "SET_INITIAL_FILTER_STATE" };


interface FilterContextType {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
}


export const initialFilterState: FilterState = {
  query: "",
  specialties: "",
  priceRange: { min: "0", max: "22000" },
  location: "",
  typeOfEmployment: "",
  selectedOffer: null,
};


export const FilterContext = createContext<FilterContextType>({
  state: initialFilterState,
  dispatch: () => {},
});


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

export const useFilterContext = () => {
  const { state, dispatch } = useContext(FilterContext);
  return { state, dispatch };
};
