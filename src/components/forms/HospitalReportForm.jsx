import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../api/api";
import AppForm from "../AppForm";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const validationSchema = Yup.object().shape({
  emergencyReservedBeds: Yup.number()
    .integer("يجب أن يكون عدد صحيح")
    .required("يجب أن يكون عدد صحيح"),
  intensiveCareReservedBeds: Yup.number()
    .integer("يجب أن يكون عدد صحيح")
    .required("يجب أن يكون عدد صحيح"),
  reservedVentilators: Yup.number()
    .integer("يجب أن يكون عدد صحيح")
    .required("يجب أن يكون عدد صحيح"),
});

const HospitalReportForm = () => {
  const navigate = useNavigate();
  let initialValues = {
    emergencyReservedBeds: "",
    intensiveCareReservedBeds: "",
    reservedVentilators: "",
  };

  const handleCreate = async (values) => {
    try {
      await api.post(`/api/hospital-reports/add-report`, values);
      toast.success("تم إنشاء التقرير بنجاح");
      navigate(-1);
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
        navigate(-1);
      } else {
        toast.error("عذرا حدث خطأ");
      }
    }
  };

  return (
    <div className="space-y-3 flex flex-col justify-start pt-20 grow px-32 xl:px-40">
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleCreate(values)}
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
