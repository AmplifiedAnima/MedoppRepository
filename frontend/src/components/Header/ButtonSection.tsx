import React, { useState, useContext, useEffect } from "react";
import { Box, Button, MenuItem, Menu } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  DoctorIcon,
  NurseIcon,
  NurseIconDarkMode,
  PharmacistIcon,
  PhysiotherapistIcon,
  PhysiotherapistIconDarkMode,
  ParamedicIcon,
  ElderlyCareIcon,
  ElderlyCareIconDarkMode,
  ItIcon,
  ItIconDarkMode,
  TechnicianIcon,
  TechnicianIconDarkMode,
  PharmacistIconDarkMode,
  DoctorIconDarkMode,
  ParamedicIconDarkMode,
} from "../IconsIconFinder";
import { ThemeContext } from "../../styles/ThemeProvider";
import styles from "./ButtonSection.module.css";
import { useFilterContext } from "../../utlis/FilterContext";
import { useAlertContext } from "../../utlis/AlertHandlingContext";
import AlertLayout from "../../utlis/Alerts";

interface ButtonSectionProps {
  buttons: { label: string; specialties: string[] }[];
  onButtonSearch: (specialty: string) => void;
}

const ButtonSection: React.FC<ButtonSectionProps> = ({ buttons }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { state: filterState, dispatch: filterDispatch } = useFilterContext();
  const { themeMode } = useContext(ThemeContext);
  const { dispatch } = useAlertContext();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSelectedIndex(null);
    setAnchorEl(null);
  };

  const handleOptionSelect = (specialty: string) => {
    filterDispatch({ type: "SET_SPECIALTIES", payload: specialty });
    console.log(specialty);

    // dispatch({
    //   type: "SHOW_SUCCCESS",
    //   payload: `speciality selected ${filterState.specialties}`,
    // });

    handleClose();
  };

  useEffect(() => {}, []);

  return (
    <Box>
      <Box
        className={`${styles.buttonSection} ${
          themeMode === "dark" ? styles["dark-mode"] : ""
        }`}
      >
        {buttons.map((button, index) => (
          <React.Fragment key={button.label}>
            <Button
              color="inherit"
              onClick={(event) => handleClick(event, index)}
              endIcon={<KeyboardArrowDownIcon />}
              className={styles.button}
            >
              {button.label === "Doctor" &&
                (themeMode === "dark" ? (
                  <DoctorIconDarkMode />
                ) : (
                  <DoctorIcon />
                ))}
              {button.label === "Nurse" &&
                (themeMode === "dark" ? <NurseIconDarkMode /> : <NurseIcon />)}
              {button.label === "Pharmacist" &&
                (themeMode === "dark" ? (
                  <PharmacistIconDarkMode />
                ) : (
                  <PharmacistIcon />
                ))}
              {button.label === "Physiotherapist" &&
                (themeMode === "dark" ? (
                  <PhysiotherapistIconDarkMode />
                ) : (
                  <PhysiotherapistIcon />
                ))}
              {button.label === "Paramedic" &&
                (themeMode === "light" ? (
                  <ParamedicIcon />
                ) : (
                  <ParamedicIconDarkMode />
                ))}
              {button.label === "Care" &&
                (themeMode === "dark" ? (
                  <ElderlyCareIconDarkMode />
                ) : (
                  <ElderlyCareIcon />
                ))}
              {button.label === "It" &&
                (themeMode === "light" ? <ItIcon /> : <ItIconDarkMode />)}
              {button.label === "Technician" &&
                (themeMode === "dark" ? (
                  <TechnicianIconDarkMode />
                ) : (
                  <TechnicianIcon />
                ))}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={selectedIndex === index && Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              className={styles.menu}
            >
              {button.specialties.map((specialty) => (
                <MenuItem
                  key={specialty}
                  onClick={() => handleOptionSelect(specialty)}
                >
                  {specialty}
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        ))}
      </Box>
      <AlertLayout />
    </Box>
  );
};

export default ButtonSection;
