import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import * as Yup from "yup";
import api from "../../api/api";
import UserContext from "../../contexts/userContext";
import WindowContext from "../../contexts/windowContext";
import AppButton from "../AppButton";
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
  const windowContext = useContext(WindowContext);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    emergencyReservedBeds: "",
    intensiveCareReservedBeds: "",
    reservedVentilators: "",
  });

  const [actualPatientsCounts, setActualPatientsCounts] = useState({
    emergencyReservedBeds: "",
    intensiveCareReservedBeds: "",
    reservedVentilators: "",
  });

  const getCounts = async () => {
    const res = await api.get(
      `/hospitals/${user?.hospital_id}/show-resident-count`
    );
    setInitialValues({
      emergencyReservedBeds: res.data.reserved_emergency_beds_count,
      intensiveCareReservedBeds: res.data.reserved_i_c_u_beds_count,
      reservedVentilators: res.data.reserved_ventilators_count,
    });

    setActualPatientsCounts({
      emergencyReservedBeds: res.data.reserved_emergency_beds_count,
      intensiveCareReservedBeds: res.data.reserved_i_c_u_beds_count,
      reservedVentilators: res.data.reserved_ventilators_count,
    });
  };

  useEffect(() => {
    getCounts();
  }, []);

  const handleCreate = async (values) => {
    if (
      values?.emergencyReservedBeds !==
        actualPatientsCounts?.emergencyReservedBeds ||
      values?.intensiveCareReservedBeds !==
        actualPatientsCounts?.intensiveCareReservedBeds ||
      values?.reservedVentilators !== actualPatientsCounts?.reservedVentilators
    ) {
      swal({
        title: "تحذير",
        text: "البيانات المدخلة بالتقرير غير مطابقة لبيانات المرضى في المشفى, هل تريد المتابعة؟",
        icon: "warning",
        buttons: {
          cancel: "تراجع",
          confirm: "موافق",
        },
      }).then(async (willUpload) => {
        if (willUpload) {
          setIsLoading(true);
          try {
            await api.post(`/hospital-reports/add-report`, {
              ...values,
              status: 0,
            });
            // toast.success("تم إنشاء التقرير بنجاح");
            navigate(-1);
          } catch (error) {
            if (error?.response?.status === 403) {
              toast.error("عذرا لا تملك صلاحية");
              navigate(-1);
            } else if (error?.response?.status >= 500) {
              toast.error("عذرا حدث خطأ");
            }
          } finally {
            setIsLoading(false);
          }
          swal("تم إنشاء التقرير بنجاح", {
            icon: "success",
          });
        } else {
          swal("تم التراجع بنجاح");
        }
      });
      return;
    }
    setIsLoading(true);
    try {
      await api.post(`/hospital-reports/add-report`, { ...values, status: 1 });
      toast.success("تم إنشاء التقرير بنجاح");
      navigate(-1);
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
        navigate(-1);
      } else if (error?.response?.status >= 500) {
        toast.error("عذرا حدث خطأ");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-1 lg:space-y-3 flex flex-col justify-start pt-5 lg:pt-10 grow px-3 lg:px-40">
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleCreate(values)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3">
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

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
          <AppButton
            type="button"
            onClick={() => navigate(-1)}
            className={"border-dark text-dark hover:bg-dark hover:text-white"}
          >
            إلغاء
          </AppButton>
          {windowContext.width >= 1024 && <span></span>}
          <AppSubmitButton isLoading={isLoading}>إضافة</AppSubmitButton>
        </div>
      </AppForm>
    </div>
  );
};

export default HospitalReportForm;
