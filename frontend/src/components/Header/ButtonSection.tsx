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
import { ThemeContext } from "../../styles/ThemeProviderContext";
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

    dispatch({
      type: "SHOW_SPECIALTY",
      payload: `Selected specialty : ${specialty}`,
    });

    handleClose();
  };

  const isMobile = window.innerWidth > 768;

  return (
    <Box>
      <style>
        {`.css-6hp17o-MuiList-root-MuiMenu-list {
      list-style: none;
      margin: 0;
      padding: 0;
      position: relative;
      padding-top: 0px;
      padding-bottom: 0px;
      outline: 0;
    }`}
      </style>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0px 30px",
          gap: "20px",
          borderRadius: "0px",
          overflowX: "auto",
          width: "768px",
          scrollbarWidth: "thick",
          scrollbarColor: "#1e2021",
        }}
      >
        {buttons.map((button, index) => (
          <React.Fragment key={button.label}>
            <Button
              color="inherit"
              onClick={(event) => handleClick(event, index)}
              endIcon={<KeyboardArrowDownIcon />}
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
            >
              {button.specialties.map((specialty) => (
                <MenuItem
                  key={specialty}
                  onClick={() => handleOptionSelect(specialty)}
                  sx={{
                    width: "100%",
                    background: themeMode === "dark" ? "black" : "white",
                    backgroundColor: themeMode === "dark" ? "black" : "white",
                    color: themeMode === "dark" ? "white" : "black",

                    "&:hover": {
                      background: themeMode === "dark" ? "#2feb00" : "#001b45",
                      color: themeMode === "dark" ? "black" : "white",
                    },
                  }}
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
