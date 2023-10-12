import React, {
  useRef,
  FormEvent,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { Box, Container, Paper, Button } from "@mui/material";
import { ThemeContext } from "../../../styles/ThemeProvider";
import HeaderForOtherRoutes from "../../Header/HeaderForOtherRoutes";
import {
  getInputPlaceholdersStyling,
  getPaperStyling,
  getButtonStyling,
} from "../inputStylingForFormLoginRegistration";
import { EditProfileFormInput } from "./EditProfilePageInputFields";
import { EditProfileFormReducer } from "../../../utlis/FormReducer";
import { initialEditProfileState } from "../../../utlis/initialStatesForForms";
import { handleInputForEditProfileForm } from "./FunctionToHandleInputEditProfilePage";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";
import MyDropzoneForCV from "../../../utlis/MyDropzone";
import { useAlertContext } from "../../../utlis/AlertHandlingContext";

export const EditProfilePage = () => {
  const {
    isLoggedIn,
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    city,
    address,
  } = useContext(IsLoggedInContext);
  const { themeMode } = useContext(ThemeContext);
  const paperStyling = getPaperStyling(themeMode);
  const buttonStyling = getButtonStyling(themeMode);

  // Initialize form state with default values
  const [formState, formDispatch] = useReducer(
    EditProfileFormReducer,
    initialEditProfileState
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { dispatch } = useAlertContext();

  // Pre-fill the form fields with user data when user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      formDispatch({
        type: "UPDATE_FIELD",
        fieldName: "username",
        fieldValue: username,
      });
      formDispatch({
        type: "UPDATE_FIELD",
        fieldName: "firstName",
        fieldValue: firstName,
      });
      formDispatch({
        type: "UPDATE_FIELD",
        fieldName: "lastName",
        fieldValue: lastName,
      });
      formDispatch({
        type: "UPDATE_FIELD",
        fieldName: "email",
        fieldValue: email,
      });
      formDispatch({
        type: "UPDATE_FIELD",
        fieldName: "phoneNumber",
        fieldValue: phoneNumber,
      });
      formDispatch({
        type: "UPDATE_FIELD",
        fieldName: "city",
        fieldValue: city,
      });
      formDispatch({
        type: "UPDATE_FIELD",
        fieldName: "address",
        fieldValue: address,
      });
    }
  }, [isLoggedIn, , username, firstName, lastName, email, phoneNumber]);

  const handleProfileUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // deal with uploading cv here later
    const requestData = {
      username: formState.username,
      firstName: formState.firstName,
      lastName: formState.lastName,
      password: formState.password,
      email: formState.email,
      phoneNumber: formState.phoneNumber,
      address: formState.address,
      city: formState.city,
      cv: selectedFiles,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/auth/editprofile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "SHOW_SUCCESS",
          payload: " You have updated the profile !",
        });
        console.log("Profile update successful:", data);

        setTimeout(() => {
          dispatch({
            type: "CLEAR_ALERTS",
          });
        }, 2000);
      } else {
        const errorResponse = await response.json();
        dispatch({
          type: "SHOW_ERROR",
          payload: `Error: ${errorResponse.message}`,
        });
        console.error("Error :", response.statusText);
      }
    } catch (error) {
      dispatch({ type: "SHOW_ERROR", payload: `error${error}` });
    }
  };

  const titleOfEditProfileForm = "Edit Profile";

  return (
    <Box
      sx={{
        backgroundColor: themeMode === "dark" ? "black" : " #121a26",
      }}
    >
      <HeaderForOtherRoutes routeView={titleOfEditProfileForm} />
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "30px",
          paddingBottom: "10px",
          height: "100%",
        }}
      >
        <Paper elevation={3} sx={{ ...paperStyling, padding: "20px 40px" }}>
          <form onSubmit={handleProfileUpdate}>
            <EditProfileFormInput
              onUserNameChange={(value) =>
                handleInputForEditProfileForm(
                  formState,
                  formDispatch,
                  "username",
                  value,
                  25,
                  /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/
                )
              }
              onFirstNameChange={(value) =>
                handleInputForEditProfileForm(
                  formState,
                  formDispatch,
                  "firstName",
                  value,
                  25,
                  /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/
                )
              }
              onLastNameChange={(value) =>
                handleInputForEditProfileForm(
                  formState,
                  formDispatch,
                  "lastName",
                  value,
                  25,
                  /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/
                )
              }
              onPasswordChange={(value) =>
                handleInputForEditProfileForm(
                  formState,
                  formDispatch,
                  "password",
                  value,
                  25,
                  /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/
                )
              }
              onEmailChange={(value) =>
                handleInputForEditProfileForm(
                  formState,
                  formDispatch,
                  "email",
                  value,
                  50,
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{5,}$/
                )
              }
              onCityChange={(value) =>
                handleInputForEditProfileForm(
                  formState,
                  formDispatch,
                  "city",
                  value,
                  20,
                  /[^a-zA-Z0-9\s.-żźćńół&()'"-]/,
                  formState.errorMessages.city
                )
              }
              onPhoneNumberChange={(value) =>
                handleInputForEditProfileForm(
                  formState,
                  formDispatch,
                  "phoneNumber",
                  value,
                  15,
                  /[^0-9\s+-]/,
                  formState.errorMessages.phoneNumber
                )
              }
              onAddressChange={(value) =>
                handleInputForEditProfileForm(
                  formState,
                  formDispatch,
                  "address",
                  value,
                  40,
                  /[^a-zA-Z0-9\s.-żźćńół&()'"-]/,
                  formState.errorMessages.address
                )
              }
              formState={formState}
            />
            <MyDropzoneForCV setSelectedFiles={setSelectedFiles} />
            <Button
              type="submit"
              variant="contained"
              sx={{
                ...buttonStyling,
                border: themeMode === "dark" ? "white 1px solid" : "",
                marginBottom: "20px",
              }}
              fullWidth
            >
              Update Profile
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};
