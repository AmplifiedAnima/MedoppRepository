// Profile Icons
import profileIcon_green from "../static/IconsMedopp/ProfileIcon/profileIcon_green.png";
import profileIcon_blue from "../static/IconsMedopp/ProfileIcon/profileIcon_blue.png";
import profileIcon_black from "../static/IconsMedopp/ProfileIcon/profileIcon_black.png";

// Doctors
import doctor_green from "../static/IconsMedopp/Doctor/doctor_green.png";
import doctor_white from "../static/IconsMedopp/Doctor/doctor_white.png";
import doctor_red from "../static/IconsMedopp/Doctor/doctor_red.png";
import doctor_map_green from "../static/IconsMedopp/Doctor/doctor_map_green.png";
import doctor_map_white from "../static/IconsMedopp/Doctor/doctor_map_white.png";
import doctor_map_red from "../static/IconsMedopp/Doctor/doctor_map_red.png";

// Nurses
import nurse_blue from "../static/IconsMedopp/Nurse/nurse_blue.png";
import nurse_green from "../static/IconsMedopp/Nurse/nurse_green.png";
import nurse_red from "../static/IconsMedopp/Nurse/nurse_red.png";
import nurse_map_blue from "../static/IconsMedopp/Nurse/nurse_map_blue.png";
import nurse_map_green from "../static/IconsMedopp/Nurse/nurse_map_green.png";
import nurse_map_red from "../static/IconsMedopp/Nurse/nurse_map_red.png";

// Paramedics
import paraMedic_green from "../static/IconsMedopp/ParaMedic/paraMedic_green.png";
import paraMedic_white from "../static/IconsMedopp/ParaMedic/paraMedic_white.png";
import paraMedic_map_green from "../static/IconsMedopp/ParaMedic/paraMedic_map_green.png";
import paraMedic_map_white from "../static/IconsMedopp/ParaMedic/paraMedic_map_white.png";
import paraMedic_map_red from "../static/IconsMedopp/ParaMedic/paraMedic_map_red.png";

// Physios
import physiotherapist_green from "../static/IconsMedopp/Physio/physio_green.png";
import physiotherapist_white from "../static/IconsMedopp/Physio/physio_white.png";
import physio_map_green from "../static/IconsMedopp/Physio/physio_map_green.png";
import physio_map_white from "../static/IconsMedopp/Physio/physio_map_white.png";
import physio_map_red from "../static/IconsMedopp/Physio/physio_map_red.png";

// Pharmacists
import pharmacy_green from "../static/IconsMedopp/Pharmacist/pharmacy_green.png";
import pharmacy_blue from "../static/IconsMedopp/Pharmacist/pharmacy_blue.png";
import mortar_map_green from "../static/IconsMedopp/Pharmacist/mortar_map_green.png";
import mortar_map_white from "../static/IconsMedopp/Pharmacist/mortar_map_white.png";
import mortar_map_red from "../static/IconsMedopp/Pharmacist/mortar_map_red.png";

// IT
import it_green from "../static/IconsMedopp/It/it_green.png";
import it_white from "../static/IconsMedopp/It/it_white.png";
import it_map_green from "../static/IconsMedopp/It/it_map_green.png";
import it_map_white from "../static/IconsMedopp/It/it_map_white.png";
import it_map_red from "../static/IconsMedopp/It/it_map_red.png";

// Technicians
import technician_green from "../static/IconsMedopp/Technician/technician_green.png";
import technician_white from "../static/IconsMedopp/Technician/technician_blue.png";
import technician_map_green from "../static/IconsMedopp/Technician/technician_map_green.png";
import technician_map_white from "../static/IconsMedopp/Technician/technician_map_blue.png";
import technician_map_red from "../static/IconsMedopp/Technician/technician_map_red.png";

// Care
import care_green from "../static/IconsMedopp/Care/care_green.png";
import care_white from "../static/IconsMedopp/Care/care_white.png";
import care_map_green from "../static/IconsMedopp/Care/care_map_green.png";
import care_map_white from "../static/IconsMedopp/Care/care_map_white.png";
import care_map_red from "../static/IconsMedopp/Care/care_map_red.png";

import caduceus_blue from "../static/IconsMedopp/CADUCEUS_BLUE.png";
import caduceus_green from "../static/IconsMedopp/CADUCEUS_GREEN.png";

import filter_white from "../static/IconsMedopp/FILTER_WHITE.png";
import filter_green from "../static/IconsMedopp/FILTER_GREEN.png";

export const filterWhiteIcon = () => {
  return <img src={filter_white} alt="Icon" width="30px" height="30px" />;
};
export const filterGreenIcon = () => {
  return <img src={filter_green} alt="Icon" width="30px" height="30px" />;
};

export const CaduceusIcon = () => {
  return <img src={caduceus_blue} alt="Icon" width="50px" height="50px" />;
};
export const CaduceusIconDarkMode = () => {
  return <img src={caduceus_green} alt="Icon" width="50px" height="50px" />;
};

export const ProfileIcon = () => {
  return <img src={profileIcon_blue} alt="icon" width="40px" height="40px" />;
};
export const ProfileIconDarkMode = () => {
  return <img src={profileIcon_green} alt="icon" width="40px" height="40px" />;
};

export const DoctorIcon = () => {
  return <img src={doctor_white} alt="Icon" width="35px" height="35px" />;
};
export const DoctorIconDarkMode = () => {
  return <img src={doctor_green} alt="Icon" width="35px" height="35px" />;
};

export const NurseIcon = () => {
  return <img src={nurse_blue} alt="Icon" width="35px" height="35px" />;
};
export const NurseIconDarkMode = () => {
  return <img src={nurse_green} alt="Icon" width="35px" height="35px" />;
};

export const PharmacistIcon = () => {
  return <img src={pharmacy_blue} alt="Icon" width='40px' height="40px" />;
};
export const PharmacistIconDarkMode = () => {
  return <img src={pharmacy_green} alt="Icon" width="40px" height="40px" />;
};

export const PhysiotherapistIcon = () => {
  return (
    <img src={physiotherapist_white} alt="Icon" width="35px" height="35px" />
  );
};

export const PhysiotherapistIconDarkMode = () => {
  return (
    <img src={physiotherapist_green} alt="Icon" width="35px" height="35px" />
  );
};

export const ParamedicIcon = () => {
  return <img src={paraMedic_white} alt="Icon" width="35px" height="35px" />;
};
export const ParamedicIconDarkMode = () => {
  return <img src={paraMedic_green} alt="Icon" width="35px" height="35px" />;
};

export const ElderlyCareIcon = () => {
  return <img src={care_white} alt="Icon" width="35px" height="35px" />;
};

export const ElderlyCareIconDarkMode = () => {
  return <img src={care_green} alt="Icon" width="35px" height="35px" />;
};

export const ItIcon = () => {
  return <img src={it_white} alt="Icon" width="35px" height="35px" />;
};

export const ItIconDarkMode = () => {
  return <img src={it_green} alt="Icon" width="35px" height="35px" />;
};

export const TechnicianIcon = () => {
  return <img src={technician_white} alt="Icon" width="35px" height="35px" />;
};

export const TechnicianIconDarkMode = () => {
  return <img src={technician_green} alt="Icon" width="35px" height="35px" />;
};

export const MedoppIcons = {
  Doctor_Green: doctor_map_green,
  Doctor_White: doctor_map_white,
  Doctor_Red: doctor_map_red,

  Nurse_Blue: nurse_map_blue,
  Nurse_Green: nurse_map_green,
  Nurse_Red: nurse_map_red,

  ParaMedic_Green: paraMedic_map_green,
  ParaMedic_White: paraMedic_map_white,
  ParaMedic_Red: paraMedic_map_red,

  Physio_Green: physio_map_green,
  Physio_White: physio_map_white,
  Physio_Red: physio_map_red,

  Pharmacist_Green: mortar_map_green,
  Pharmacist_White: mortar_map_white,
  Pharmacist_Red: mortar_map_red,

  It_Green: it_map_green,
  It_White: it_map_white,
  It_Red: it_map_red,

  Technician_Green: technician_map_green,
  Technician_White: technician_map_white,
  Technician_Red: technician_map_red,

  Care_Green: care_map_green,
  Care_White: care_map_white,
  Care_Red: care_map_red,
};
