import { useState } from "react";

const useStepForm = (totalSteps: number) => {
  const [step, setStep] = useState(0);
  const [stepValidations, setStepValidations] = useState(
    new Array(totalSteps).fill(false)
  );

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber >= 0 && stepNumber < totalSteps) {
      setStep(stepNumber);
    }
  };

  const markStepAsValid = () => {
    const updatedValidations = [...stepValidations];
    updatedValidations[step] = true;
    setStepValidations(updatedValidations);
  };

  const isStepValid = () => {
    return stepValidations[step];
  };

  return {
    step,
    nextStep,
    prevStep,
    goToStep,
    markStepAsValid,
    isStepValid,
  };
};

export default useStepForm;
