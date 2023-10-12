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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ThemeContext } from "../../../styles/ThemeProvider";
import HeaderForOtherRoutes from "../../Header/HeaderForOtherRoutes";
import "react-quill/dist/quill.snow.css";
import {
  getPaperStyling,
  getButtonStyling,
} from "../inputStylingForFormLoginRegistration";
import { useAlertContext } from "../../../utlis/AlertHandlingContext";
import AlertLayout from "../../../utlis/Alerts";
import { useNavigate } from "react-router";
import GeoCodingPlaceComponent from "../../../utlis/GeoCodingPlaceComponent";
import { GOOGLE_API_KEY } from "../../..";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";

import NewJobCreationFormInputs from "./NewJobCreationFormInputs";
import { NewJobFormReducer } from "../../../utlis/FormReducer";
import { handleSubmit } from "./JobSubmissionFetchingEndpoint";
import { initialStateNewJobForm } from "../../../utlis/initialStatesForForms";

import {
  handleInputFieldForNewJobForm,
  validateDescriptionFieldNewJobForm,
  handleSelectFieldForJobForm,
} from "./FunctionsToHandleInputNewJobForm";
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

  // useEffect(() => {
  //   if (!isEmployer || !isLoggedIn) {
  //     dispatch({
  //       type: "SHOW_WARNING",
  //       payload: "You are not authorized to be here!",
  //     });
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 4500);
  //   }
  // }, [isEmployer, isLoggedIn, dispatch, navigate]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isStep1Complete) {
      setStepError("Please fill in all required fields in Step I");
      return; // Don't proceed further
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
      formDispatch,
      navigate
    );
    console.log(formState);
    setIsSubmitted(true);
    formDispatch({ type: "CLEAR_FIELDS" });
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
            200
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
      <GeoCodingPlaceComponent
        apiKey={GOOGLE_API_KEY}
        onLocationChanged={handleLocationChange}
        initialLat={formState.latitude || 52.1183303}
        initialLng={formState.longitude || 19.0677357}
        initialLocation={formState.location || "Poland"}
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
          height: "auto",
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
                      width: "auto",
                      height: "auto",
                    },
                  }}
                >
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{
                      width: "100%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStep === 0 && (
                    <>
                      {InputsForSteps}

                      <GeoCodingPlaceComponent
                        apiKey={GOOGLE_API_KEY}
                        onLocationChanged={handleLocationChange}
                        initialLat={formState.latitude || 52.1183303}
                        initialLng={formState.longitude || 19.0677357}
                        initialLocation={formState.location || "Poland"}
                      />

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
                          border: themeMode === "dark" ? "white 1px solid" : "",
                        }}
                        disabled={onSubmitButtonHide}
                      >
                        Next Step
                      </Button>
                    </>
                  )}

                  {activeStep === 1 && (
                    <>
                      <Typography variant="h6">Confirmation</Typography>
                      {formState && (
                        <>
                          {InputsForSteps}
                          <Typography variant="h4">
                            Location : {formState.location}{" "}
                          </Typography>
                        </>
                      )}

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
                </Paper>
              </form>
            </Box>
          </>
        ) : (
          <Typography variant="h5">
            YOU ARE NOT ENTITLED TO COME HERE
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default NewJobCreationForm;
