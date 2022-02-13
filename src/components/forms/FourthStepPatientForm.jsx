import React from "react";
import * as Yup from "yup";
import AppCheckBox from "../AppCheckBox";
import AppForm from "../AppForm";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const FourthStepPatientForm = () => {
  return (
    <div className="space-y-3 overflow-y-scroll pb-32">
      <AppForm
        initialValues={{ gender: 0 }}
        validationSchema={Yup.object().shape({})}
      >
        <div className="grid grid-cols-6">
          <AppCheckBox id={"death"} name={"death"} text={"وفاة"} />
          <AppInput
            id={"deathDateTime"}
            placeholder={"تاريخ الوفاة"}
            label={"تاريخ الوفاة:"}
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
          <AppSubmitButton
            className={"border-dark text-dark hover:bg-dark hover:text-white"}
          >
            إلغاء
          </AppSubmitButton>
          <AppSubmitButton>إضافة</AppSubmitButton>
          <AppSubmitButton>إضافة و الذهاب للخطوة التالية</AppSubmitButton>
        </div>
      </AppForm>
    </div>
  );
};

export default FourthStepPatientForm;
