import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import AppForm from "../AppForm";
import AppFormRadioButton from "../AppFormRadioButton";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";
import AppSelect from "../AppSelect";
import AppButton from "../AppButton";

const FirstStepPatientForm = ({
  initialValues,
  setPatient,
  setStep,
  bloodTypes,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await api.post("/patients/first-step", {
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
    setIsLoading(false);
  };

  return (
    <div className="space-y-1 lg:space-y-3 overflow-y-auto">
      <AppForm
        initialValues={initialValues}
        validationSchema={Yup.object().shape({})}
        onSubmit={(values) => handleSubmit(values)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3">
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
            <span className="mx-2 text-dark my-2 text-xs lg:text-sm">
              الجنس:
            </span>
            <div
              role="group"
              className="flex text-xs lg:text-sm items-center justify-center"
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
        <div className="grid grid-cols-1 lg:grid-cols-3">
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
        <div className="grid grid-cols-1 lg:grid-cols-3">
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
          {/* <AppInput
            id={"bloodType"}
            placeholder={"الزمرة الدموية"}
            label={"الزمرة الدموية:"}
            containerClassName="grow"
          /> */}
          <AppSelect
            label={"الزمرة الدموية:"}
            name={"bloodType"}
            options={bloodTypes}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
          <AppButton
            type="button"
            onClick={() => navigate(-1)}
            className={"border-dark text-dark hover:bg-dark hover:text-white"}
          >
            إلغاء
          </AppButton>
          <AppSubmitButton
            onCustomClick={() => navigate("/dashboard/monitor-patients")}
            isLoading={isLoading}
          >
            إضافة
          </AppSubmitButton>
          <AppSubmitButton isLoading={isLoading}>
            إضافة والذهاب للخطوة التالية
          </AppSubmitButton>
        </div>
      </AppForm>
    </div>
  );
};

export default FirstStepPatientForm;
