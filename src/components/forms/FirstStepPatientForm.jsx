import React from "react";
import * as Yup from "yup";
import AppForm from "../AppForm";
import AppFormRadioButton from "../AppFormRadioButton";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const FirstStepPatientForm = () => {
  return (
    <div className="space-y-3">
      <AppForm
        initialValues={{ gender: false }}
        validationSchema={Yup.object().shape({})}
      >
        <div className="grid grid-cols-3">
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

          <div className="flex flex-col justify-start items-start mt-4 grow w-1/12">
            <span className="mx-2 text-dark my-2">الجنس:</span>
            <div
              role="group"
              className="flex text-lg items-center justify-center"
            >
              <AppFormRadioButton
                id={"male"}
                name={"gender"}
                value={"false"}
                text={"ذكر"}
              />
              <AppFormRadioButton
                id={"female"}
                name={"gender"}
                value={"true"}
                text={"انثى"}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <AppInput
            id={"brithday"}
            placeholder={"تاريخ الولادة"}
            label={"تاريخ الولادة:"}
            containerClassName="grow"
          />
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
        <div className="grid grid-cols-3">
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
          <AppInput
            id={"bloodType"}
            placeholder={"الزمرة الدموية"}
            label={"الزمرة الدموية:"}
            containerClassName="grow"
          />
        </div>
        <div className="grid grid-cols-3">
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

export default FirstStepPatientForm;
