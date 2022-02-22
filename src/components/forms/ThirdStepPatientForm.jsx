import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../api/api";
import AppCheckBox from "../AppCheckBox";
import AppForm from "../AppForm";
import AppFormRadioButton from "../AppFormRadioButton";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const ThirdStepPatientForm = ({ initialValues, setPatient, setStep }) => {
  const handleSubmit = async (values) => {
    try {
      const res = await api.put(
        `/api/patients/third-step/${initialValues.id}`,
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
    <div className="space-y-3">
      <AppForm
        initialValues={initialValues}
        validationSchema={Yup.object().shape({})}
        onSubmit={(values) => handleSubmit(values)}
      >
        <div className="grid grid-cols-5">
          <AppInput
            id={"treatmentCourse"}
            placeholder={"الكورس العلاجي المعتمد"}
            label={"الكورس العلاجي المعتمد:"}
            containerClassName="grow col-span-2"
          />
          <AppCheckBox
            id={"givenAntivirus"}
            name={"givenAntivirus"}
            text={"هل اعطي أنتي فيروس"}
          />
          <AppInput
            id={"givenAntivirusType"}
            placeholder={"ما هو طريق إدخال الأنتي فيروس"}
            label={"ما هو طريق إدخال الأنتي فيروس"}
            containerClassName="grow col-span-2"
            disabledValue={"givenAntivirus"}
          />
        </div>

        <div className="grid grid-cols-5">
          <div className="flex justify-start items-center mt-6 grow">
            <span className="mx-2 text-lg my-2">نتيجة المسحة:</span>
            <div
              role="group"
              className="flex text-lg items-center justify-center"
            >
              <AppFormRadioButton
                id={"positive"}
                name={"pcrResult"}
                value={"1"}
                text={"إيجابي"}
              />
              <AppFormRadioButton
                id={"negative"}
                name={"pcrResult"}
                value={"0"}
                text={"سلبي"}
              />
            </div>
          </div>
          <AppCheckBox
            id={"requiredVentilation"}
            name={"requiredVentilation"}
            text={"هل إحتاج إلى دعم تنفسي"}
          />
          <AppInput
            id={"ventilationDuration"}
            placeholder={"في حال التنبيب ما هي مدة الوضع على المنفسة"}
            label={"ما هي مدة الوضع على المنفسة:"}
            containerClassName="grow col-span-3"
            disabledValue={"requiredVentilation"}
          />
        </div>
        <div className="grid grid-cols-5">
          <span className="text-lg flex items-center mt-6">
            التطور في المشفى:
          </span>
          <AppCheckBox
            id={"clinicalImprovement"}
            name={"clinicalImprovement"}
            text={"تحسن في الحالة السريرية"}
          />
          <AppInput
            id={"daysOfFever"}
            placeholder={"عدد أيام الترفع الحروري"}
            label={"عدد أيام الترفع الحروري:"}
            type={"number"}
            containerClassName="grow col-span-3"
          />
        </div>
        <div className="grid">
          <AppInput
            id={"mixing"}
            placeholder={"إذكر الإختلاطات"}
            label={"إختلاطات:"}
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

export default ThirdStepPatientForm;
