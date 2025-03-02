export interface StepOptionI {
  isStepValid: boolean;
  submitEvent: boolean;
}

export interface StepOptionConfigI {
  setStepOption: React.Dispatch<React.SetStateAction<StepOptionI>>;
  stepOption: StepOptionI;
}

export interface StepWithContentI extends StepOptionConfigI {
  content: React.ReactNode;
}

export interface StepsPropsI {
  steps: StepWithContentI[];
}
