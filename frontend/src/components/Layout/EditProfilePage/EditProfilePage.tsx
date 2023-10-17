import React, {
  useRef,
  FormEvent,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import {
  Box,
  Container,
  Paper,
  Button,
  Typography,
  Link,
  Avatar,
} from "@mui/material";
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import HeaderForOtherRoutes from "../../Header/HeaderForOtherRoutes";
import {
  getInputPlaceholdersStyling,
  getPaperStyling,
  getButtonStyling,
} from "../../../styles/formStyling";
import { EditProfileFormInput } from "./EditProfilePageInputFields";
import { EditProfileFormReducer } from "../../../utlis/Form Reducers/FormReducer";
import { initialEditProfileState } from "../../../utlis/Form Reducers/initialStatesForForms";
import { handleInputForEditProfileForm } from "./FunctionToHandleInputEditProfilePage";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";
import MyDropzoneForCV, {
  MyDropzoneForAvatarImage,
} from "../../../utlis/MyDropzone";
import { useAlertContext } from "../../../utlis/AlertHandlingContext";
import { useNavigate } from "react-router";

export const EditProfilePage = () => {
  const {
    isLoggedIn,
    username,
    setUsername,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    city,
    setCity,
    address,
    setAddress,
    cv,
    setCv,
    avatarImage,
    setAvatarImage,
  } = useContext(IsLoggedInContext);
  const { themeMode } = useContext(ThemeContext);
  const paperStyling = getPaperStyling(themeMode);
  const buttonStyling = getButtonStyling(themeMode);
  const navigate = useNavigate();
  const [formState, formDispatch] = useReducer(
    EditProfileFormReducer,
    initialEditProfileState
  );
  const [selectedFilesCv, setSelectedFilesCv] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<File[]>([]);

  const { dispatch } = useAlertContext();

  const [isSubmitted, setIsSubmitted] = useState(false);

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

    const formData = new FormData();

    formData.append("username", formState.username);
    formData.append("firstName", formState.firstName);
    formData.append("lastName", formState.lastName);
    formData.append("password", formState.password);
    formData.append("email", formState.email);
    formData.append("phoneNumber", formState.phoneNumber);
    formData.append("address", formState.address);
    formData.append("city", formState.city);

    if (selectedFilesCv.length > 0) {
      formData.append("cv", selectedFilesCv[0]);
    }

    if (selectedImage.length > 0) {
      formData.append("avatarImage", selectedImage[0]);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/auth/editprofile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
        const data = await response.json();

        dispatch({
          type: "SHOW_SUCCESS",
          payload: " You have updated the profile !",
        });

        setUsername(data.username);
        setAvatarImage(data.avatarImage);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAddress(data.address);
        setCity(data.city);
        setCv(data.cv);

        console.log("Profile update successful:", data);

        setTimeout(() => {
          dispatch({
            type: "CLEAR_ALERTS",
          });
          navigate("/");
        }, 4000);
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
        maxWidth="md"
        sx={{
          marginTop: "30px",
          paddingBottom: "10px",
          height: "100%",
          flex: 1,
        }}
      >
        {isLoggedIn ? (
          <Paper elevation={3} sx={{ ...paperStyling, padding: "20px 40px" }}>
            <form onSubmit={handleProfileUpdate}>
              <Typography variant="body1">Current image</Typography>
              <br />
              <Avatar
                src={avatarImage}
                sx={{ width: "60px", height: "60px" }}
                alt="other image"
              />
              <Typography
                variant="h5"
                sx={{
                  color: themeMode === "dark" ? "#2feb00" : "black",
                }}
              >
                Change avatar
              </Typography>
              <br></br>
              <MyDropzoneForAvatarImage setSelectedFiles={setSelectedImage} />
              <br></br>
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
                    /[^0-9+() -.]/g,
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
              <br></br>
              <br></br>
              <Typography
                variant="h5"
                sx={{
                  color: themeMode === "dark" ? "#2feb00" : "black",
                }}
              >
                Upload CV
              </Typography>
              <MyDropzoneForCV setSelectedFiles={setSelectedFilesCv} />
              <br></br>
              <Typography variant="body1">
                <Link
                  href={cv}
                  color="inherit"
                  underline="hover"
                  sx={{ color: themeMode === "dark" ? "#2feb00" : "black" }}
                >
                  Current CV
                </Link>
              </Typography>
              {!isSubmitted ? (
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
              ) : (
                <>Profile changed</>
              )}
            </form>
          </Paper>
        ) : (
          <Box sx={{height:'634px'}}>
          <Typography
            variant="h4"
            sx={{
              color: themeMode === "dark" ? "#2feb00" : "white",
            }}
          >
            Please login to acces this part of website{" "}
          </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};
