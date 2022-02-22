import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../api/api";
import AppCheckBox from "../AppCheckBox";
import AppForm from "../AppForm";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const SecondStepPatientForm = ({ initialValues, setPatient, setStep }) => {
  const handleSubmit = async (values) => {
    try {
      const res = await api.put(
        `/api/patients/second-step/${initialValues.id}`,
        values
      );
      setPatient({ ...initialValues, ...res.data });
      toast.success("تمت العملية بنجاح");
      setStep(initialValues.step);
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
      } else if (error?.response?.status >= 500) {
        toast.error("عذرا حدث خطأ");
      }
    }
  };

  return (
    <div className="space-y-3 overflow-y-scroll pb-32">
      <AppForm
        initialValues={initialValues}
        validationSchema={Yup.object().shape({})}
        onSubmit={(values) => handleSubmit(values)}
      >
        <div className="grid grid-cols-2">
          <AppInput
            id={"symptomDaysBeforeAdmission"}
            placeholder={"منذ متى بدأت الأعراض قبل الدخول إلى المشفى"}
            label={"منذ متى بدأت الأعراض قبل الدخول إلى المشفى:"}
            containerClassName="grow"
          />
          <AppInput
            id={"reasonOfAdmission"}
            placeholder={"السبب المباشر للقبول"}
            label={"االسبب المباشر للقبول:"}
            containerClassName="grow"
          />
        </div>
        <div className="grid grid-cols-9">
          <AppCheckBox id={"hasFever"} name={"hasFever"} text={"ترفع حروري"} />
          <AppInput
            id={"temperature"}
            placeholder={"درجة الحرارة"}
            label={"درجة الحرارة:"}
            containerClassName="grow"
          />
          <AppInput
            id={"daysOfPreAdmissionFever"}
            placeholder={"مدة الترفع الحروري"}
            label={"مدة الترفع الحروري:"}
            containerClassName="grow"
          />
          <AppCheckBox
            id={"responseToCetamol"}
            name={"responseToCetamol"}
            text={"الإستجابة على السيتامول"}
          />

          <AppCheckBox id={"fatigue"} name={"fatigue"} text={"اعياء"} />
          <AppCheckBox
            id={"dryThroat"}
            name={"dryThroat"}
            text={"جفاف في الحلق"}
          />
          <AppCheckBox
            id={"lossOfSmellAndTaste"}
            name={"lossOfSmellAndTaste"}
            text={"فقدان حاسة الشم و الذوق"}
          />
          <AppCheckBox id={"sweating"} name={"sweating"} text={"تعرق غزير"} />
          <AppCheckBox id={"dehydration"} name={"dehydration"} text={"تجفاف"} />
        </div>
        <div className="grid grid-cols-2">
          <AppInput
            id={"neuralSymptoms"}
            placeholder={"أعراض عصبية"}
            label={"أعراض عصبية (ذكر العرض):"}
            containerClassName="grow"
          />
          <AppInput
            id={"structuralSymptoms"}
            placeholder={"أعراض هيكلية"}
            label={"أعراض هيكلية (ذكر العرض):"}
            containerClassName="grow"
          />
        </div>
        <div className="grid grid-cols-2">
          <AppInput
            id={"cardiacSymptoms"}
            placeholder={"أعراض قلبية"}
            label={"أعراض قلبية (ذكر العرض):"}
            containerClassName="grow"
          />
          <AppInput
            id={"digestiveSymptoms"}
            placeholder={"أعراض هضمية"}
            label={"أعراض هضمية (ذكر العرض):"}
            containerClassName="grow"
          />
        </div>
        <div className="grid grid-cols-2">
          <AppInput
            id={"vascularSymptoms"}
            placeholder={"أعراض وعائية"}
            label={"أعراض وعائية (ذكر العرض):"}
            containerClassName="grow"
          />
          <AppInput
            id={"urinarySymptoms"}
            placeholder={"أعراض بولية"}
            label={"أعراض بولية (ذكر العرض):"}
            containerClassName="grow"
          />
        </div>
        <div className="grid grid-cols-2">
          <AppInput
            id={"skinSymptoms"}
            placeholder={"أعراض جلدية"}
            label={"أعراض جلدية (ذكر العرض):"}
            containerClassName="grow"
          />
          <AppInput
            id={"ocularSymptoms"}
            placeholder={"أعراض عينية"}
            label={"أعراض عينية (ذكر العرض):"}
            containerClassName="grow"
          />
        </div>
        <div className="grid grid-cols-2">
          <AppInput
            id={"chestListening"}
            placeholder={"إصغاء الصدر"}
            label={"إصغاء الصدر"}
            containerClassName="grow"
          />
          <AppInput
            id={"oxygenationUponAdmission"}
            placeholder={"الأكسجة عند القبول"}
            label={"الأكسجة عند القبول:"}
            containerClassName="grow"
          />
        </div>
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-2">
            <AppCheckBox
              id={"reproductiveActivity"}
              name={"reproductiveActivity"}
              text={"هل مازالت في سن النشاط التناسلي"}
              disabledValue={"gender"}
            />
            <AppCheckBox
              id={"isPregnant"}
              name={"isPregnant"}
              text={"هل هناك حمل"}
              disabledValue={"reproductiveActivity"}
            />
          </div>
          <AppInput
            id={"ageOfFetus"}
            placeholder={"عمر الحمل"}
            label={"عمر الحمل"}
            containerClassName="grow"
            type="number"
            disabledValue={"isPregnant"}
          />
        </div>
        <div className="grid">
          <AppInput
            id={"bloodGasUponAdmission"}
            placeholder={"غازات الدم عند القبول"}
            label={"غازات الدم عند القبول:"}
            containerClassName="grow"
          />
        </div>
        <div className="grid grid-cols-5">
          <AppCheckBox
            id={"arterialHypertension"}
            name={"arterialHypertension"}
            text={"ارتفاع ضغط شرياني"}
          />
          <AppInput
            id={"arterialHypertensionMedications"}
            placeholder={"الأدوية"}
            label={"الأدوية:"}
            containerClassName="grow col-span-4"
            disabledValue={"arterialHypertension"}
          />
        </div>
        <div className="grid grid-cols-8">
          <AppCheckBox id={"diabetes"} name={"diabetes"} text={"السكري"} />
          <AppInput
            id={"diabetesOralTreatment"}
            placeholder={"علاج بالخفاضات الفموية"}
            label={"علاج بالخفاضات الفموية:"}
            containerClassName="grow col-span-2"
            disabledValue={"diabetes"}
          />
          <AppCheckBox
            id={"diabetesInsulinTreatment"}
            name={"diabetesInsulinTreatment"}
            text={"علاج بالانسولين"}
            disabledValue={"diabetes"}
          />
          <AppInput
            id={"diabetesInsulinType"}
            placeholder={"نمط الانسولين"}
            label={"نمط الانسولين:"}
            containerClassName="grow col-span-2"
            disabledValue={"diabetesInsulinTreatment"}
          />
          <AppInput
            id={"diabetesMixedOralAndInsulinTreatment"}
            placeholder={"علاج مختلط فموي + انسولين"}
            label={"علاج مختلط:"}
            containerClassName="grow col-span-2"
            disabledValue={"diabetes"}
          />
        </div>
        <div className="grid grid-cols-5">
          <AppCheckBox
            id={"highCholesterolAndTriglycerides"}
            name={"highCholesterolAndTriglycerides"}
            text={"ارتفاع الكوليسترول / الشحوم الثلاثية في الدم"}
          />
          <AppInput
            id={"cholesterolAndTriglycerides"}
            placeholder={"الأدوية"}
            label={"الأدوية:"}
            containerClassName="grow col-span-4"
            disabledValue={"highCholesterolAndTriglycerides"}
          />
        </div>
        <div className="grid grid-cols-6">
          <AppCheckBox
            id={"renalInsufficiency"}
            name={"renalInsufficiency"}
            text={"قصور كلوي"}
          />
          <AppCheckBox
            id={"renalInsufficiencyTests"}
            name={"renalInsufficiencyTests"}
            text={"هل هناك تحال"}
            disabledValue={"renalInsufficiency"}
          />
        </div>
        <div className="grid grid-cols-5">
          <AppCheckBox
            id={"hasAntecedentsOfCoronalMetaphorsOrExpansions"}
            name={"hasAntecedentsOfCoronalMetaphorsOrExpansions"}
            text={"سوابق مجازات اكليلية او توسيع"}
          />
          <AppInput
            id={"antecedentsOfCoronalMetaphorsOrExpansionsMedications"}
            placeholder={"الأدوية"}
            label={"الأدوية:"}
            containerClassName="grow col-span-4"
            disabledValue={"hasAntecedentsOfCoronalMetaphorsOrExpansions"}
          />
        </div>
        <div className="grid grid-cols-5">
          <AppCheckBox
            id={"BreathingDifficultiesOrAsthma"}
            name={"BreathingDifficultiesOrAsthma"}
            text={"صعوبات في التنفس او الربو"}
          />
          <AppInput
            id={"BreathingDifficultiesOrAsthmaTreatment"}
            placeholder={"العلاج المستخدم لصعوبات التنفس او الربو"}
            label={"العلاج المستخدم:"}
            containerClassName="grow col-span-2"
            disabledValue={"BreathingDifficultiesOrAsthma"}
          />
          <AppInput
            id={"otherRespiratoryProblems"}
            placeholder={"أمراض تنفسية أخرى"}
            label={"أمراض تنفسية أخرى:"}
            containerClassName="grow col-span-2"
          />
        </div>
        <div className="grid grid-cols-5">
          <AppCheckBox
            id={"arthritis"}
            name={"arthritis"}
            text={"إلتهاب المفاصل"}
          />
          <AppInput
            id={"arthritisMedications"}
            placeholder={"الأدوية"}
            label={"الأدوية:"}
            containerClassName="grow col-span-4"
            disabledValue={"arthritis"}
          />
        </div>
        <div className="grid grid-cols-5">
          <AppCheckBox
            id={"osteoporosis"}
            name={"osteoporosis"}
            text={"هشاشة العظام"}
          />
          <AppInput
            id={"osteoporosisMedications"}
            placeholder={"الأدوية"}
            label={"الأدوية:"}
            containerClassName="grow col-span-4"
            disabledValue={"osteoporosis"}
          />
        </div>
        <div className="grid grid-cols-5">
          <AppCheckBox
            id={"hasLiverDisease"}
            name={"hasLiverDisease"}
            text={"أمراض في الكبد"}
          />
          <AppInput
            id={"liverDisease"}
            placeholder={"اذكر أمراض الكبد"}
            label={"أمراض في الكبد:"}
            containerClassName="grow col-span-4"
            disabledValue={"hasLiverDisease"}
          />
        </div>
        <div className="grid grid-cols-5">
          <AppCheckBox
            id={"hasDepressionOrAnxiety"}
            name={"hasDepressionOrAnxiety"}
            text={"الإكتئاب أو القلق"}
          />
          <AppInput
            id={"depressionOrAnxietyMedications"}
            placeholder={"أدوية الإكتئاب أو القلق"}
            label={"الأدوية:"}
            containerClassName="grow col-span-4"
            disabledValue={"hasDepressionOrAnxiety"}
          />
        </div>
        <div className="grid grid-cols-2">
          <AppInput
            id={"otherDiseases"}
            placeholder={"أمراض أخرى غير مذكورة أعلاه"}
            label={"أمراض أخرى:"}
            containerClassName="grow"
          />
          <AppInput
            id={"otherMedications"}
            placeholder={"أدوية أخرى غير مذكورة أعلاه"}
            label={"أدوية أخرى:"}
            containerClassName="grow"
          />
        </div>
        <div className="grid grid-cols-5">
          <AppCheckBox
            id={"isSmoker"}
            name={"isSmoker"}
            text={"تدخين السجائر"}
          />
          <AppInput
            id={"smokingQuantityAndDuration"}
            placeholder={"المدة / الكمية للتدخين"}
            label={"مدة و كمية التدخين:"}
            containerClassName="grow col-span-4"
            disabledValue={"isSmoker"}
          />
        </div>
        <div className="grid grid-cols-5">
          <AppCheckBox
            id={"smokingQuitter"}
            name={"smokingQuitter"}
            text={"مقلع عن التدخين"}
          />
          <AppInput
            id={"smokingQuitterQuantityAndDuration"}
            placeholder={"المدة / الكمية للإقلاع"}
            label={"المدة و الكمية:"}
            containerClassName="grow col-span-4"
            disabledValue={"smokingQuitter"}
          />
        </div>
        <div className="grid grid-cols-6">
          <AppCheckBox
            id={"privateHookah"}
            name={"privateHookah"}
            text={"تدخين أركيلة خاصة"}
          />
          <AppCheckBox
            id={"publicHookah"}
            name={"publicHookah"}
            text={"تدخين أركيلة في المقاهي"}
          />
        </div>
        <div className="grid grid-cols-6">
          <AppCheckBox id={"alcoholic"} name={"alcoholic"} text={"الكحول"} />
          <AppCheckBox
            id={"hasDiet"}
            name={"hasDiet"}
            text={"هل كان للمريض نظام عذائي خاص"}
          />
          <AppInput
            id={"diet"}
            placeholder={"ما هو النظام الغذائي"}
            label={"النظام الغذائي:"}
            containerClassName="grow col-span-4"
            disabledValue={"hasDiet"}
          />
        </div>
        <div className="grid grid-cols-5">
          <AppCheckBox
            id={"physicalSports"}
            name={"physicalSports"}
            text={"ممارسة الرياضة البدنية"}
          />
          <AppInput
            id={"physicalSportsType"}
            placeholder={"ما نوع الرياضة"}
            label={"ما نوع الرياضة:"}
            containerClassName="grow col-span-2"
            disabledValue={"physicalSports"}
          />
          <AppInput
            id={"physicalSportsPace"}
            placeholder={"بأية وتيرة؟"}
            label={"بأية وتيرة:"}
            containerClassName="grow col-span-2"
            disabledValue={"physicalSports"}
          />
        </div>
        <div className="grid grid-cols-5">
          <span className="text-lg col-span-2 flex items-end">
            هل كان المريض يلتزم بالاجراءات الاحترازية قبل الإصابة:
          </span>
          <AppCheckBox
            id={"woreFaceMask"}
            name={"woreFaceMask"}
            text={"الكمامة"}
          />
          <AppCheckBox
            id={"handWashing"}
            name={"handWashing"}
            text={"غسل الأيدي"}
          />
          <AppCheckBox
            id={"avoidCrowds"}
            name={"avoidCrowds"}
            text={"الإبتعاد عن التجمعات"}
          />
        </div>
        <div className="grid grid-cols-2">
          <AppInput
            id={"contactedFamilyMembers"}
            placeholder={"عدد أفراد الأسرة المخالطين"}
            label={"عدد أفراد الأسرة المخالطين"}
            type={"number"}
            containerClassName="grow"
          />
          <AppInput
            id={"familyMembersWithCovidSymptoms"}
            placeholder={"عدد أفراد الأسرة الذين لديهم أعراض تقترح ال covid 19"}
            label={"عدد أفراد الأسرة الذين لديهم أعراض تقترح ال covid 19:"}
            type={"number"}
            containerClassName="grow"
          />
        </div>
        <div className="grid grid-cols-3 gap-10">
          <AppSubmitButton
            className={"border-dark text-dark hover:bg-dark hover:text-white"}
          >
            إلغاء
          </AppSubmitButton>
          <AppSubmitButton disabled={initialValues.id === undefined}>
            إضافة
          </AppSubmitButton>
          <AppSubmitButton disabled={initialValues.id === undefined}>
            إضافة و الذهاب للخطوة التالية
          </AppSubmitButton>
        </div>
      </AppForm>
    </div>
  );
};

export default SecondStepPatientForm;
