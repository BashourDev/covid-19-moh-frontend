import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../api/api";
import AppButton from "../AppButton";
import AppCheckBox from "../AppCheckBox";
import AppForm from "../AppForm";
import AppFormRadioButton from "../AppFormRadioButton";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const ThirdStepPatientForm = ({ initialValues, setPatient, setStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await api.put(
        `/patients/third-step/${initialValues.id}`,
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
    setIsLoading(false);
  };

  return (
    <div className="space-y-1 lg:space-y-3 overflow-y-auto pb-32">
      <AppForm
        initialValues={initialValues}
        validationSchema={Yup.object().shape({})}
        onSubmit={(values) => handleSubmit(values)}
      >
        <div className="grid grid-cols-3 lg:grid-cols-5">
          <AppInput
            id={"treatmentCourse"}
            placeholder={"الكورس العلاجي المعتمد"}
            label={"الكورس العلاجي المعتمد:"}
            containerClassName="grow col-span-3 lg:col-span-2"
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

        <div className="grid grid-cols-3 lg:grid-cols-5">
          <div className="flex justify-start items-center col-span-3 lg:col-span-1 mt-6 grow">
            <span className="mx-2 text-xs lg:text-sm my-2">نتيجة المسحة:</span>
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
            id={"requiredICU"}
            name={"requiredICU"}
            text={"هل إحتاج إلى عناية مركزة"}
          />
          <AppCheckBox
            id={"requiredVentilation"}
            name={"requiredVentilation"}
            text={"هل إحتاج إلى دعم تنفسي"}
          />
          <AppInput
            id={"ventilationDuration"}
            placeholder={"في حال التنبيب ما هي مدة الوضع على المنفسة"}
            label={"ما هي مدة الوضع على المنفسة:"}
            containerClassName="grow col-span-2"
            disabledValue={"requiredVentilation"}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <span className="text-xs lg:text-sm flex items-center mt-6">
            التطور في المشفى:
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:col-span-2">
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
              containerClassName="grow col-span-1 lg:col-span-2"
            />
          </div>
        </div>
        <div className="grid">
          <AppInput
            id={"mixing"}
            placeholder={"إذكر الإختلاطات"}
            label={"إختلاطات:"}
            containerClassName="grow"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
          <AppButton
            type="button"
            onClick={() => navigate(-1)}
            className={"border-dark text-dark hover:bg-dark hover:text-white"}
          >
            إلغاء
          </AppButton>
          <AppSubmitButton
            disabled={initialValues.id === undefined}
            isLoading={isLoading}
            onCustomClick={() => navigate("/dashboard/monitor-patients")}
          >
            إضافة
          </AppSubmitButton>
          <AppSubmitButton
            disabled={initialValues.id === undefined}
            isLoading={isLoading}
            className={"col-span-2 lg:col-span-1 mt-0 lg:mt-8"}
          >
            إضافة و الذهاب للخطوة التالية
          </AppSubmitButton>
        </div>
      </AppForm>
    </div>
  );
};

export default ThirdStepPatientForm;
