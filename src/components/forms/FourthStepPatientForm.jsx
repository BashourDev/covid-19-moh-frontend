import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../api/api";
import AppButton from "../AppButton";
import AppCheckBox from "../AppCheckBox";
import AppForm from "../AppForm";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const FourthStepPatientForm = ({ initialValues, setPatient, setStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await api.put(
        `/patients/fourth-step/${initialValues.id}`,
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
    <div className="space-y-3 overflow-y-scroll pb-32">
      <AppForm
        initialValues={initialValues}
        validationSchema={Yup.object().shape({})}
        onSubmit={(values) => handleSubmit(values)}
      >
        <div className="grid grid-cols-6">
          <AppCheckBox id={"death"} name={"death"} text={"وفاة"} />
          <AppInput
            id={"deathDateTime"}
            placeholder={"تاريخ الوفاة"}
            label={"تاريخ الوفاة:"}
            type={"date"}
            containerClassName="grow col-span-5"
            disabledValue={"death"}
          />
        </div>

        <div className="grid grid-cols-6">
          <AppCheckBox id={"release"} name={"release"} text={"تخريج"} />
          <AppInput
            id={"releaseDateTime"}
            placeholder={"تاريخ التخريج"}
            label={"تاريخ التخريج:"}
            type={"date"}
            containerClassName="grow col-span-5"
            disabledValue={"release"}
          />
        </div>
        <div className="grid">
          <AppInput
            id={"statusUponRelease"}
            placeholder={"الحالة عند التخريج"}
            label={"الحالة عند التخريج:"}
            containerClassName="grow"
            disabledValue={"release"}
          />
        </div>
        <div className="grid grid-cols-8">
          <span className="text-lg flex items-center mt-6 col-span-1">
            العلامات الحيوية:
          </span>
          <AppInput
            id={"bloodPressureUponRelease"}
            placeholder={"الضغط"}
            label={"الضغط:"}
            containerClassName="grow col-span-2"
            disabledValue={"release"}
          />
          <AppInput
            id={"pulseUponRelease"}
            placeholder={"النبض"}
            label={"النبض:"}
            containerClassName="grow col-span-2"
            disabledValue={"release"}
          />
          <AppInput
            id={"oxygenationUponRelease"}
            placeholder={"الأكسجة"}
            label={"الأكسجة:"}
            containerClassName="grow col-span-2"
            disabledValue={"release"}
          />
        </div>
        <div className="grid">
          <AppInput
            id={"bloodGasUponRelease"}
            placeholder={"غازات الدم إن وجدت"}
            label={"غازات الدم إن وجدت"}
            containerClassName="grow"
            disabledValue={"release"}
          />
        </div>
        <div className="grid grid-cols-2">
          <AppInput
            id={"wbc"}
            placeholder={"WBC"}
            label={"WBC:"}
            containerClassName="grow"
            disabledValue={"release"}
          />
          <AppInput
            id={"crp"}
            placeholder={"CRP"}
            label={"CRP:"}
            containerClassName="grow"
            disabledValue={"release"}
          />
        </div>
        <div className="grid">
          <AppInput
            id={"residencyPeriod"}
            placeholder={"مدة الإقامة الكلية في المشفى"}
            label={"مدة الإقامة الكلية في المشفى:"}
            containerClassName="grow"
            disabledValue={"release"}
          />
        </div>

        <div className="grid grid-cols-3 gap-10">
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
          >
            إضافة و الذهاب للخطوة التالية
          </AppSubmitButton>
        </div>
      </AppForm>
    </div>
  );
};

export default FourthStepPatientForm;
