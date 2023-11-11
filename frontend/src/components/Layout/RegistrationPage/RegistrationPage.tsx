import { FormEvent, useContext, useState, useReducer } from "react";
import { Button, Container, Paper, Box, Typography } from "@mui/material";
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import HeaderForOtherRoutes from "../../Header/HeaderForOtherRoutes";
import { getPaperStyling, getButtonStyling } from "../../../styles/formStyling";
import { useAlertContext } from "../../../utlis/AlertHandlingContext";
import AlertLayout from "../../../utlis/Alerts";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";
import MyDropzoneForCV, {
  MyDropzoneForAvatarImage,
} from "../../../utlis/MyDropzone";
import { registrationFormReducer } from "../../../utlis/Form Reducers/FormReducer";
import { initialRegistrationState } from "../../../utlis/Form Reducers/initialStatesForForms";
import { NewRegistrationFormInput } from "./RegistrationPageComponents/RegistrationPageInputFields";
import {
  handleInputForRegistrationForm,
  handleSelectFieldForRegistrationForm,
} from "./RegistrationPageComponents/FunctionToHandleInputRegistrationPage";
import { motion } from "framer-motion";
const RegistrationPage = () => {
  const [formState, formDispatch] = useReducer(
    registrationFormReducer,
    initialRegistrationState
  );

  const [selectedCvFile, setSelectedCvFile] = useState<File[]>([]);
  const [selectedImagesForAvatar, setSelectedImagesForAvatar] = useState<
    File[]
  >([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { themeMode } = useContext(ThemeContext);
  const {
    setIsLoggedIn,
    setUsername,
    setRoles,
    setAvatarImage,
    setFirstName,
    setLastName,
    setAddress,
    setCity,
    setCv,
  } = useContext(IsLoggedInContext);
  const { dispatch } = useAlertContext();

  const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("formState:", formState);
    console.log("selectedCvFile:", selectedCvFile);
    console.log("selectedImagesForAvatar:", selectedImagesForAvatar);

    const formData = new FormData();

    formData.append("username", formState.username || "");
    formData.append("firstName", formState.firstName || "");
    formData.append("lastName", formState.lastName || "");
    formData.append("password", formState.password || "");
    formData.append("email", formState.email || "");
    formData.append("phoneNumber", formState.phoneNumber || "");
    formData.append("address", formState.address || "");
    formData.append("city", formState.city || "");
    formData.append("role", formState.role || "");

    if (selectedCvFile.length > 0) {
      formData.append("cv", selectedCvFile[0]);
    }

    if (selectedImagesForAvatar.length > 0) {
      formData.append("avatarImage", selectedImagesForAvatar[0]);
    }

    dispatch({ type: "CLEAR_ALERTS" });

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        dispatch({
          type: "SHOW_SUCCESS",
          payload: `You have registered correctly !`,
        });
        console.log(data);
        localStorage.setItem("token", data.accessToken);

        setUsername(data.user.username);
        setRoles(data.user.roles);
        setAvatarImage(data.user.avatarImage);
        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
        setAddress(data.user.address);
        setCity(data.user.city);
        setCv(data.user.cv);
        setIsLoggedIn(true);
      } else {
        dispatch({ type: "SHOW_ERROR", payload: response.statusText });
        console.error("Registration failed:", response.statusText, response);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const titleOfRegistrationForm = `Registration`;

  const paperStyling = getPaperStyling(themeMode);
  const buttonStyling = getButtonStyling(themeMode);

  return (
    <Box
      sx={{
        backgroundColor: themeMode === "dark" ? "black" : " #121a26",
      }}
    >
      <HeaderForOtherRoutes routeView={titleOfRegistrationForm} />

      <Container
        maxWidth="lg"
        sx={{
          marginTop: "30px",
          paddingBottom: "10px",
          height: "100%",
        }}
      >
        <motion.div
          className="black"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", transition: { duration: 1 }, opacity: 1 }}
        >
          <Paper elevation={3} sx={{ ...paperStyling, padding: "20px 40px" }}>
            <form onSubmit={handleRegistration}>
              {!isSubmitted && (
                <>
                  <Typography variant="h5"> Upload Avatar Image</Typography>
                  <MyDropzoneForAvatarImage
                    setSelectedFiles={setSelectedImagesForAvatar}
                  />
                </>
              )}
              <NewRegistrationFormInput
                onUserNameChange={(value) =>
                  handleInputForRegistrationForm(
                    formState,
                    formDispatch,
                    "username",
                    value,
                    25,
                    /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/
                  )
                }
                onFirstNameChange={(value) =>
                  handleInputForRegistrationForm(
                    formState,
                    formDispatch,
                    "firstName",
                    value,
                    25,
                    /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/
                  )
                }
                onLastNameChange={(value) =>
                  handleInputForRegistrationForm(
                    formState,
                    formDispatch,
                    "lastName",
                    value,
                    25,
                    /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/
                  )
                }
                onPasswordChange={(value) =>
                  handleInputForRegistrationForm(
                    formState,
                    formDispatch,
                    "password",
                    value,
                    25,
                    /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/
                  )
                }
                onConfirmPasswordChange={(value) =>
                  handleInputForRegistrationForm(
                    formState,
                    formDispatch,
                    "confirmPassword",
                    value,
                    25,
                    /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/
                  )
                }
                onEmailChange={(value) =>
                  handleInputForRegistrationForm(
                    formState,
                    formDispatch,
                    "email",
                    value,
                    50,
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{5,}$/
                  )
                }
                onCitychange={(value) =>
                  handleInputForRegistrationForm(
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
                  handleInputForRegistrationForm(
                    formState,
                    formDispatch,
                    "phoneNumber",
                    value,
                    20,
                    /[^0-9+() -.]/g,
                    formState.errorMessages.phoneNumber
                  )
                }
                onAddressChange={(value) =>
                  handleInputForRegistrationForm(
                    formState,
                    formDispatch,
                    "address",
                    value,
                    40,
                    /[^a-zA-Z0-9\s.-żźćńół&()'"-]/,
                    formState.errorMessages.address
                  )
                }
                onRoleChange={(value) =>
                  handleSelectFieldForRegistrationForm(
                    formState,
                    formDispatch,
                    "role",
                    value,
                    "Role is required"
                  )
                }
                formState={formState}
                onSubmit={isSubmitted}
              />

              {formState.role !== "Employer" && (
                <>
                  {!isSubmitted && (
                    <>
                      <Typography variant="h5"> Upload Cv </Typography>
                      <MyDropzoneForCV setSelectedFiles={setSelectedCvFile} />
                    </>
                  )}
                </>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  ...buttonStyling,
                  border: themeMode === "dark" ? "white 1px solid" : "",
                  marginBottom: "20px",
                }}
                fullWidth
                disabled={isSubmitted}
              >
                Register
              </Button>
            </form>
          </Paper>
          <AlertLayout />
        </motion.div>
      </Container>
    </Box>
  );
};

export default RegistrationPage;
