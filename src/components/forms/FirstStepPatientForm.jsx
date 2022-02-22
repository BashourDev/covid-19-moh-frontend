import React, { useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import AppForm from "../AppForm";
import AppFormRadioButton from "../AppFormRadioButton";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const FirstStepPatientForm = ({ initialValues, setPatient, setStep }) => {
  const params = useParams();

  const handleSubmit = async (values) => {
    try {
      const res = await api.post("/api/patients/first-step", {
        ...values,
        // gender: values.gender === "true" ? true : false,
        id: params?.pid,
      });
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
                value={"0"}
                text={"ذكر"}
              />
              <AppFormRadioButton
                id={"female"}
                name={"gender"}
                value={"1"}
                text={"انثى"}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <AppInput
            id={"birthday"}
            placeholder={"تاريخ الولادة"}
            label={"تاريخ الولادة:"}
            type="date"
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
