import React, { useState } from "react";
import StepsButton from "../StepsButton";
import StepSeparator from "../StepSeparator";
import FifthStepPatientForm from "./FifthStepPatientForm";
import FirstStepPatientForm from "./FirstStepPatientForm";
import FourthStepPatientForm from "./FourthStepPatientForm";
import SecondStepPatientForm from "./SecondStepPatientForm";
import ThirdStepPatientForm from "./ThirdStepPatientForm";

const PatientForm = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="flex flex-col justify-start grow px-32 xl:px-40">
      {/* steps */}
      <div className="flex items-center mt-10 gap-8">
        <StepsButton
          onClick={() => setStep(1)}
          number={1}
          text={"الخطوة الاولى"}
          isPassed={step >= 1}
        />
        <StepSeparator isPassed={step >= 2} />
        <StepsButton
          onClick={() => setStep(2)}
          number={2}
          text={"الخطوة الثانية"}
          isPassed={step >= 2}
        />
        <StepSeparator isPassed={step >= 3} />
        <StepsButton
          onClick={() => setStep(3)}
          number={3}
          text={"الخطوة الثالثة"}
          isPassed={step >= 3}
        />
        <StepSeparator isPassed={step >= 4} />
        <StepsButton
          onClick={() => setStep(4)}
          number={4}
          text={"الخطوة الرابعة"}
          isPassed={step >= 4}
        />
        <StepSeparator isPassed={step >= 5} />
        <StepsButton
          onClick={() => setStep(5)}
          number={5}
          text={"الخطوة الخامسة"}
          isPassed={step >= 5}
        />
      </div>

      {/* form */}
      {step === 1 && <FirstStepPatientForm />}
      {step === 2 && <SecondStepPatientForm />}
      {step === 3 && <ThirdStepPatientForm />}
      {step === 4 && <FourthStepPatientForm />}
      {step === 5 && <FifthStepPatientForm />}
    </div>
  );
};

export default PatientForm;
