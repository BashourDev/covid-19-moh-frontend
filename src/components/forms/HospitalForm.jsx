import React from "react";
import * as Yup from "yup";
import AppForm from "../AppForm";
import AppFormRadioButton from "../AppFormRadioButton";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const HospitalForm = () => {
  return (
    <div className="space-y-3 flex flex-col justify-start pt-20 grow px-32 xl:px-40">
      <AppForm
        initialValues={{ type: 0 }}
        validationSchema={Yup.object().shape({})}
      >
        <div className="grid grid-cols-3">
          <AppInput
            id={"name"}
            placeholder={"اسم المشفى"}
            label={"اسم المشفى:"}
            containerClassName="grow"
          />
          <AppInput
            id={"location"}
            placeholder={"العنوان"}
            label={"العنوان:"}
            containerClassName="grow"
          />

          <div className="flex flex-col justify-start items-start mt-4 grow w-1/12">
            <span className="mx-2 text-dark my-2">النوع:</span>
            <div
              role="group"
              className="flex text-lg items-center justify-center"
            >
              <AppFormRadioButton
                id={"public"}
                name={"type"}
                value={"0"}
                text={"عام"}
              />
              <AppFormRadioButton
                id={"private"}
                name={"type"}
                value={"1"}
                text={"خاص"}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <AppInput
            id={"emergencyBeds"}
            placeholder={"عدد أسرة المشفى للقبول الإسعافي"}
            label={"عدد أسرة المشفى للقبول الإسعافي:"}
            type={"number"}
            containerClassName="grow"
          />
          <AppInput
            id={"intensiveCareBeds"}
            placeholder={"عدد أسرة العناية"}
            label={"عدد أسرة العناية:"}
            type={"number"}
            containerClassName="grow"
          />
          <AppInput
            id={"ventilators"}
            placeholder={"عدد أجهزة التنفس الآلي"}
            label={"عدد أجهزة التنفس الآلي:"}
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

export default HospitalForm;
