import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../../api/api";

import StepsButton from "../StepsButton";
import StepSeparator from "../StepSeparator";
import FifthStepPatientForm from "./FifthStepPatientForm";
import FirstStepPatientForm from "./FirstStepPatientForm";
import FourthStepPatientForm from "./FourthStepPatientForm";
import SecondStepPatientForm from "./SecondStepPatientForm";
import ThirdStepPatientForm from "./ThirdStepPatientForm";

const PatientForm = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const params = useParams();
  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const [patient, setPatient] = useState({
    // first part
    doctor: "",
    name: "",
    birthday: "",
    gender: false,
    job: "",
    address: "",
    landline: "",
    mobileNumber: "",
    bloodType: bloodTypes[0],
    height: "",
    weight: "",

    // second part
    symptomDaysBeforeAdmission: "",
    reasonOfAdmission: "",
    hasFever: false,
    temperature: "",
    daysOfPreAdmissionFever: "",
    responseToCetamol: false,
    fatigue: false,
    dryThroat: false,
    sweating: false,
    dehydration: false,
    lossOfSmellAndTaste: false,
    neuralSymptoms: "",
    structuralSymptoms: "",
    cardiacSymptoms: "",
    digestiveSymptoms: "",
    vascularSymptoms: "",
    urinarySymptoms: "",
    skinSymptoms: "",
    ocularSymptoms: "",
    chestListening: "",
    oxygenationUponAdmission: "",
    reproductiveActivity: false,
    isPregnant: false,
    ageOfFetus: "",
    bloodGasUponAdmission: "",
    arterialHypertension: false,
    arterialHypertensionMedications: "",
    diabetes: false,
    diabetesOralTreatment: "",
    diabetesInsulinTreatment: false,
    diabetesInsulinType: "",
    diabetesMixedOralAndInsulinTreatment: "",
    highCholesterolAndTriglycerides: false,
    cholesterolAndTriglycerides: "",
    renalInsufficiency: false,
    renalInsufficiencyTests: false,
    hasAntecedentsOfCoronalMetaphorsOrExpansions: false,
    antecedentsOfCoronalMetaphorsOrExpansionsMedications: "",
    BreathingDifficultiesOrAsthma: false,
    BreathingDifficultiesOrAsthmaTreatment: "",
    otherRespiratoryProblems: "",
    arthritis: false,
    arthritisMedications: "",
    osteoporosis: false,
    osteoporosisMedications: "",
    hasLiverDisease: false,
    liverDisease: "",
    hasDepressionOrAnxiety: false,
    depressionOrAnxietyMedications: "",
    otherDiseases: "",
    otherMedications: "",
    isSmoker: false,
    smokingQuantityAndDuration: "",
    smokingQuitter: false,
    smokingQuitterQuantityAndDuration: "",
    privateHookah: false,
    publicHookah: false,
    alcoholic: false,
    hasDiet: "",
    diet: "",
    physicalSports: false,
    physicalSportsType: "",
    physicalSportsPace: "",
    woreFaceMask: false,
    handWashing: false,
    avoidCrowds: false,
    contactedFamilyMembers: "",
    familyMembersWithCovidSymptoms: "",

    // third part
    treatmentCourse: "",
    givenAntivirus: false,
    givenAntivirusType: "",
    ctReport: "",
    tests: "",
    pcrResult: false,
    requiredVentilation: false,
    ventilationDuration: "",
    clinicalImprovement: false,
    daysOfFever: "",
    mixing: "",

    //part four
    death: false,
    deathDateTime: "",
    release: false,
    releaseDateTime: "",
    statusUponRelease: "",
    bloodGasUponRelease: "",
    bloodPressureUponRelease: "",
    pulseUponRelease: "",
    oxygenationUponRelease: "",
    wbc: "",
    crp: "",
    residencyPeriod: "",

    // fifth part
    returnToWorkOrNormalLife: "",
    dyspnea: false,
    laborOnLightOrMediumEfforts: false,
    otherDemonstrations: "",
  });

  const getPatient = async () => {
    const res = await api.get(`/api/patients/${params.pid}`);
    setPatient({ ...patient, ...res.data });
    setStep(patient.step);
  };

  useEffect(() => {
    if (params.pid) {
      getPatient();
    }
  }, [location]);

  useEffect(() => {
    if (patient.step) {
      setStep(patient.step);
    }
  }, [patient]);

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
      {step === 1 && (
        <FirstStepPatientForm
          initialValues={patient}
          setPatient={setPatient}
          setStep={setStep}
          bloodTypes={bloodTypes}
        />
      )}
      {step === 2 && (
        <SecondStepPatientForm
          initialValues={patient}
          setPatient={setPatient}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <ThirdStepPatientForm
          initialValues={patient}
          setPatient={setPatient}
          setStep={setStep}
        />
      )}
      {step === 4 && (
        <FourthStepPatientForm
          initialValues={patient}
          setPatient={setPatient}
          setStep={setStep}
        />
      )}
      {step === 5 && (
        <FifthStepPatientForm
          initialValues={patient}
          setPatient={setPatient}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default PatientForm;
