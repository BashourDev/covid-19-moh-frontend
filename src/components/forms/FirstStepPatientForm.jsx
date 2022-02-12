import React from "react";
import AppForm from "../AppForm";
import AppFormRadioButton from "../AppFormRadioButton";
import AppInput from "../AppInput";
import * as Yup from "yup";

const FirstStepPatientForm = () => {
  return (
    <div className="space-y-3">
      <AppForm
        initialValues={{ gender: 0 }}
        validationSchema={Yup.object().shape({})}
      >
        <div className="flex">
          <AppInput
            id={"doctor"}
            placeholder={"اسم الطبيب"}
            label={"اسم الطبيب:"}
            containerClassName="grow"
          />
          <AppInput
            id={"name"}
            placeholder={"الاسم الثلاثي للمريض"}
            label={"الاسم الثلاثي:"}
            containerClassName="grow"
          />
          <AppInput
            id={"brithday"}
            placeholder={"تاريخ الولادة"}
            label={"تاريخ الولادة:"}
            containerClassName="grow"
          />
        </div>
        <div className="flex">
          <div className="flex flex-col justify-start items-start mt-4 grow w-1/12">
            <span className="mx-2 text-dark my-2">الجنس:</span>
            <div
              role="group"
              className="flex text-lg items-center justify-center"
            >
              <AppFormRadioButton
                id={"male"}
                name={"gender"}
                value={(0).toString()}
                text={"ذكر"}
              />
              <AppFormRadioButton
                id={"female"}
                name={"gender"}
                value={(1).toString()}
                text={"انثى"}
              />
            </div>
          </div>
          <AppInput
            id={"job"}
            placeholder={"العمل"}
            label={"العمل:"}
            containerClassName="grow"
          />
          <AppInput
            id={"address"}
            placeholder={"عنوان السكن"}
            label={"عنوان السكن:"}
            containerClassName="grow"
          />
        </div>
        <div className="flex">
          <AppInput
            id={"landline"}
            placeholder={"رقم الهاتف (المنزل)"}
            label={"رقم الهاتف (المنزل):"}
            containerClassName="grow"
          />
          <AppInput
            id={"mobileNumber"}
            placeholder={"رقم الهاتف (المحمول)"}
            label={"رقم الهاتف (المحمول):"}
            containerClassName="grow"
          />
        </div>
        <div className="flex">
          <AppInput
            id={"bloodType"}
            placeholder={"الزمرة الدموية"}
            label={"الزمرة الدموية:"}
            containerClassName="grow"
          />
          <AppInput
            id={"height"}
            placeholder={"الطول"}
            label={"الطول:"}
            containerClassName="grow"
          />
          <AppInput
            id={"weight"}
            placeholder={"الوزن"}
            label={"الوزن:"}
            containerClassName="grow"
          />
        </div>
      </AppForm>
    </div>
  );
};

export default FirstStepPatientForm;
