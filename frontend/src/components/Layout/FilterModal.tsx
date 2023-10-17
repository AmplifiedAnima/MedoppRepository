import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import {
  getInputPlaceholdersStyling,
  getButtonStyling,
} from "../../styles/formStyling";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import { useFilterContext } from "../../utlis/FilterContext";
import { FilterOptions } from "../../utlis/FilterContext";
interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filterOptions: FilterOptions) => void;
  resetAllQueries: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  onApply,
  resetAllQueries,
}) => {
  const { themeMode } = useContext(ThemeContext);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [location, setLocation] = useState<string>("");
  const [typeOfEmployment, setEmploymentType] = useState<string>("");
  const [isPriceRangeEnabled, setIsPriceRangeEnabled] =
    useState<boolean>(false);

  const { state: filterState, dispatch } = useFilterContext();

  const handleApply = () => {
    const filterOptions: FilterOptions = {
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      location: location.trim(),
      typeOfEmployment,
    };

    onApply(filterOptions);
    onClose();
  };

  const handlePriceRangeToggle = () => {
    setIsPriceRangeEnabled(!isPriceRangeEnabled);
    if (!isPriceRangeEnabled) {
      setPriceRange([0, 30000]);
      dispatch({
        type: "SET_PRICE_RANGE",
        payload: { min: "0", max: "30000" },
      });
    }
  };
  console.log(priceRange);
  const inputPlaceholdersStyling = getInputPlaceholdersStyling(themeMode);
  const buttonStyling = getButtonStyling(themeMode);

  const cancelButtonStyling = {
    ...buttonStyling,
    width: "auto",
    "&:hover": {
      backgroundColor: "red",
      color: "white",
    },
  };

  const colorsForModal = {
    backgroundColor: themeMode === "dark" ? "black" : "white",
    color: themeMode === "dark" ? "#2feb00" : "black",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={colorsForModal}>Advanced Search</DialogTitle>
      <DialogContent sx={colorsForModal}>
        <Typography variant="subtitle1">Location:</Typography>
        <TextField
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          margin="normal"
          sx={inputPlaceholdersStyling}
        />

        <Typography variant="subtitle1">Employment Type:</Typography>
        <TextField
          select
          fullWidth
          value={typeOfEmployment}
          onChange={(e) => setEmploymentType(e.target.value)}
          margin="normal"
          sx={inputPlaceholdersStyling}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="full-time"> Full-Time </MenuItem>
          <MenuItem value="part-time"> Part-Time </MenuItem>
          <MenuItem value="B2B"> B2B </MenuItem>
        </TextField>
        <Typography variant="subtitle1"> Salary Range (PLN)</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPriceRangeEnabled}
              onChange={handlePriceRangeToggle}
            />
          }
          label="Enable Price Range"
        />

        {isPriceRangeEnabled && (
          <Slider
            value={priceRange}
            onChange={(_, newValue) =>
              setPriceRange(newValue as [number, number])
            }
            min={2000}
            max={30000}
            valueLabelDisplay="auto"
            aria-label="Price Range Slider"
            sx={colorsForModal}
          />
        )}
      </DialogContent>
      <DialogActions sx={colorsForModal}>
        <Button
          onClick={onClose}
          sx={{ ...cancelButtonStyling, padding: "10px 40px", margin: "20px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={resetAllQueries}
          sx={{ ...buttonStyling, padding: "10px 40px", margin: "20px" }}
        >
          Reset
        </Button>
        <Button
          onClick={handleApply}
          sx={{ ...buttonStyling, padding: "10px 40px", margin: "20px" }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
