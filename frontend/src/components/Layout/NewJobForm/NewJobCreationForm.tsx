import React, {
  FormEvent,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import {
  Typography,
  Button,
  Container,
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import HeaderForOtherRoutes from "../../Header/HeaderForOtherRoutes";
import "react-quill/dist/quill.snow.css";
import { getPaperStyling, getButtonStyling } from "../../../styles/formStyling";
import { useAlertContext } from "../../../utlis/AlertHandlingContext";
import AlertLayout from "../../../utlis/Alerts";
import { useNavigate } from "react-router";
import GeoCodingPlaceComponent from "../../../utlis/GoogleMapsApi/GeoCodingPlaceComponent";
import { GOOGLE_API_KEY } from "../../..";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";

import NewJobCreationFormInputs from "./NewJobCreationFormInputs";
import { NewJobFormReducer } from "../../../utlis/Form Reducers/FormReducer";
import { handleSubmit } from "./JobSubmissionFetchingEndpoint";
import { initialStateNewJobForm } from "../../../utlis/Form Reducers/initialStatesForForms";
import { motion } from "framer-motion";
import {
  handleInputFieldForNewJobForm,
  validateDescriptionFieldNewJobForm,
  handleSelectFieldForJobForm,
} from "./FunctionsToHandleInputNewJobForm";
import confirmationImage from "../../../static/confrimation.png";
const steps = ["Step 1", "Step 2"];

const NewJobCreationForm: React.FC = () => {
  const [formState, formDispatch] = useReducer(
    NewJobFormReducer,
    initialStateNewJobForm
  );

  const [stepError, setStepError] = useState<string | null>(null);

  const [secondStepIsOnDisableInputs, setIsSecondStepIsOnDisableInputs] =
    useState<boolean>(false);

  const isStep1Complete = () => {
    return (
      formState.title.trim() !== "" &&
      formState.company.trim() !== "" &&
      formState.salary.trim() !== "" &&
      formState.selectedTypeOfEmployment.trim() !== "" &&
      formState.description.trim() !== "" &&
      formState.selectedLabel.trim() !== "" &&
      formState.selectedSpecialty.trim() !== "" &&
      formState.latitude !== 0 &&
      formState.longitude !== 0
    );
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useAlertContext().dispatch;

  const { themeMode } = useContext(ThemeContext);

  const { isLoggedIn, roles } = useContext(IsLoggedInContext);
  const isEmployer = isLoggedIn && roles.includes("Employer");

  const navigate = useNavigate();

  const paperStyling = getPaperStyling(themeMode);
  const buttonStyling = getButtonStyling(themeMode);

  let onSubmitButtonHide = false;

  const handleLocationChange = (lat: number, lng: number, location: string) => {
    formDispatch({
      type: "UPDATE_FIELD",
      fieldName: "latitude",
      fieldValue: lat,
    });
    formDispatch({
      type: "UPDATE_FIELD",
      fieldName: "longitude",
      fieldValue: lng,
    });
    formDispatch({
      type: "UPDATE_FIELD",
      fieldName: "location",
      fieldValue: location,
    });

    console.log(lat, lng, location);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isStep1Complete) {
      setStepError("Please fill in all required fields in Step I");
      return;
    }

    handleSubmit(
      formState.title,
      formState.company,
      formState.salary,
      formState.selectedLabel,
      formState.selectedSpecialty,
      formState.location,
      formState.selectedTypeOfEmployment,
      formState.description,
      formState.latitude,
      formState.longitude,
      formDispatch
    );
    console.log(formState);
    setIsSubmitted(true);

    dispatch({
      type: "SHOW_SUCCESS",
      payload: "The Job offer has been created",
    });
    setTimeout(() => {
      navigate("/");
      dispatch({
        type: "CLEAR_ALERTS",
      });
    }, 4500);
  };

  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
    setIsSecondStepIsOnDisableInputs(true);
  };

  const previousStep = () => {
    setActiveStep(activeStep - 1);
    setIsSecondStepIsOnDisableInputs(false);
  };

  const InputsForSteps = (
    <>
      <NewJobCreationFormInputs
        onJobTitleChange={(value) =>
          handleInputFieldForNewJobForm(
            formState,
            formDispatch,
            "title",
            value,
            25,
            /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/
          )
        }
        onCompanyChange={(value) =>
          handleInputFieldForNewJobForm(
            formState,
            formDispatch,
            "company",
            value,
            25,
            /[^a-zA-Z0-9\s._/-żźćńół&()'"-]/
          )
        }
        onSalaryChange={(value) =>
          handleInputFieldForNewJobForm(
            formState,
            formDispatch,
            "salary",
            value,
            7,
            /[^0-9]/
          )
        }
        onTypeOfEmploymentChange={(value) =>
          handleSelectFieldForJobForm(
            formState,
            formDispatch,
            "selectedTypeOfEmployment",
            value,
            "Type of employment is required"
          )
        }
        onDescriptionChange={(value) =>
          validateDescriptionFieldNewJobForm(
            formState,
            formDispatch,
            value,
            800,
            100
          )
        }
        onLabelChange={(value) =>
          handleSelectFieldForJobForm(
            formState,
            formDispatch,
            "selectedLabel",
            value,
            "Profession is required"
          )
        }
        onSpecialtyChange={(value) =>
          handleSelectFieldForJobForm(
            formState,
            formDispatch,
            "selectedSpecialty",
            value,
            "Specialty is required"
          )
        }
        isSecondStep={secondStepIsOnDisableInputs}
        formState={formState}
      />
    </>
  );

  const GeoCodingPlaceComponentVariable = (
    <>
      <Typography variant="subtitle1">Location : </Typography>
      <GeoCodingPlaceComponent
        apiKey={GOOGLE_API_KEY}
        onLocationChanged={handleLocationChange}
        initialLat={!isSubmitted ? formState.latitude : 0}
        initialLng={!isSubmitted ? formState.longitude : 0}
        initialLocation={!isSubmitted ? formState.location : "Poland"}
        readOnly={secondStepIsOnDisableInputs}
      />
    </>
  );

  return (
    <Box
      sx={{
        backgroundColor: themeMode === "dark" ? "black" : "#d7dbeffe",
        paddingBottom: "20px",
        background:
          themeMode === "dark"
            ? "linear-gradient(184deg, rgb(0, 0, 0) 8%, #263139 79%)"
            : "linear-gradient(180deg,  #121a26 13%,  #a0bbfa 99%)",
      }}
    >
      <HeaderForOtherRoutes routeView={"Create a New Job Offer"} />

      <Container
        maxWidth="xl"
        sx={{
          marginTop: "25px",
          width: "auto",
          height: isSubmitted ? "774px" : "auto",
          "@media (max-width: 600px)": {
            width: "auto",
            marginRight: "15px",
          },
        }}
      >
        {isEmployer ? (
          <>
            <AlertLayout />

            <Box>
              <form onSubmit={handleFormSubmit}>
                <Paper
                  sx={{
                    ...paperStyling,
                    margin: "0px 40px",
                    padding: "25px 30px",
                    width: "685px",
                    "@media (max-width: 800px)": {
                      width: "100hv",
                      height: "100hv",
                    },
                  }}
                >
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    color="inherit"
                    sx={{
                      width: "100%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      "& .MuiStepIcon-root": {
                        fill: themeMode === "dark" ? "#02f016" : "black",

                        text: {
                          fill: themeMode === "dark" ? "black" : "white",
                        },
                      },

                      "& .MuiStepLabel-label": {
                        color: themeMode === "dark" ? "#02f016" : "black",
                      },
                    }}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: "100%",
                      transition: { duration: 1 },
                      opacity: 1,
                    }}
                  >
                    {activeStep === 0 && (
                      <>
                        {!isSubmitted && InputsForSteps}

                        {!isSubmitted && GeoCodingPlaceComponentVariable}
                        {stepError && (
                          <Typography variant="body2" color="error">
                            {stepError}
                          </Typography>
                        )}

                        <Button
                          variant="contained"
                          onClick={() => {
                            if (!isStep1Complete()) {
                              setStepError(
                                "Please fill in all required fields in Step I"
                              );
                            } else {
                              nextStep();
                              setStepError("");
                            }
                          }}
                          fullWidth
                          sx={{
                            ...buttonStyling,
                            border:
                              themeMode === "dark" ? "white 1px solid" : "",
                          }}
                          disabled={onSubmitButtonHide}
                        >
                          Next Step
                        </Button>
                      </>
                    )}
                  </motion.div>
                  {activeStep === 1 && (
                    <>
                      <Typography variant="h6">Confirmation</Typography>
                      {!isSubmitted && InputsForSteps}
                      {!isSubmitted && GeoCodingPlaceComponentVariable}
                      {!isSubmitted && (
                        <>
                          <Button
                            variant="outlined"
                            onClick={previousStep}
                            fullWidth
                            sx={{
                              ...buttonStyling,
                              border:
                                themeMode === "dark" ? "white 1px solid" : "",
                            }}
                            disabled={onSubmitButtonHide}
                          >
                            Previous Step
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                              ...buttonStyling,
                              border:
                                themeMode === "dark" ? "white 1px solid" : "",
                            }}
                            disabled={onSubmitButtonHide}
                          >
                            {" "}
                            CREATE NOW JOB OFFER
                          </Button>
                        </>
                      )}
                    </>
                  )}
                  {isSubmitted && (
                    <>
                      <Typography variant="h6" sx={{ color: "#2feb00" }}>
                        Job has been Created
                      </Typography>
                      <img
                        src={confirmationImage}
                        alt=""
                        width="120px"
                        height="120px"
                      />
                    </>
                  )}
                </Paper>
              </form>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              height: "670px",
            }}
          >
            <Typography
              variant="h2"
              sx={{ color: themeMode === "dark" ? "white" : "black" }}
            >
              YOU ARE NOT AUTHORIZED TO BE HERE
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default NewJobCreationForm;
