import React from "react";
import * as Yup from "yup";
import AppForm from "../AppForm";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const HospitalReportForm = () => {
  return (
    <div className="space-y-3 flex flex-col justify-start pt-20 grow px-32 xl:px-40">
      <AppForm
        initialValues={{ type: 0 }}
        validationSchema={Yup.object().shape({})}
      >
        <div className="grid grid-cols-3">
          <AppInput
            id={"emergencyReservedBeds"}
            placeholder={"الأسرة المشغولة في القبول الإسعافي"}
            label={"الأسرة المشغولة في القبول الإسعافي:"}
            type={"number"}
            containerClassName="grow"
          />
          <AppInput
            id={"intensiveCareReservedBeds"}
            placeholder={"الأسرة المشغولة في العناية"}
            label={"الأسرة المشغولة في العناية:"}
            type={"number"}
            containerClassName="grow"
          />
          <AppInput
            id={"reservedVentilators"}
            placeholder={"أجهزة التنفس الآلي المشغولة"}
            label={"أجهزة التنفس الآلي المشغولة:"}
            type={"number"}
            containerClassName="grow"
          />
        </div>

        <div className="grid grid-cols-3 gap-10 justify-between">
          <AppSubmitButton
            className={"border-dark text-dark hover:bg-dark hover:text-white"}
          >
            إلغاء
          </AppSubmitButton>
          <span></span>
          <AppSubmitButton>إضافة</AppSubmitButton>
        </div>
      </AppForm>
    </div>
  );
};

export default HospitalReportForm;
