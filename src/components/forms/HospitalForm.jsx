import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../api/api";
import AppForm from "../AppForm";
import AppFormRadioButton from "../AppFormRadioButton";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";
import AppButton from "../AppButton";
import AppCheckBox from "../AppCheckBox";
import AppSecondCheckBox from "../AppHospitalCheckBox";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("الرجاء إدخال اسم المشفى"),
  location: Yup.string().required("الرجاء إدخال عنوان المشفى"),
  emergencyBeds: Yup.number()
    .integer("يجب أن يكون عدد صحيح")
    .required("يجب أن يكون عدد صحيح"),
  intensiveCareBeds: Yup.number()
    .integer("يجب أن يكون عدد صحيح")
    .required("يجب أن يكون عدد صحيح"),
  ventilators: Yup.number()
    .integer("يجب أن يكون عدد صحيح")
    .required("يجب أن يكون عدد صحيح"),
  hospitalAnalystName: Yup.string().required(
    "الرجاء إدخال اسم المسؤول عم إحصائية المشفى"
  ),
  hospitalAnalystUsername: Yup.string().required(
    "الرجاء إدخال اسم المستخدم للمسؤول عم إحصائية المشفى"
  ),
  hospitalAnalystPassword: Yup.string().when("updateHAPassword", {
    is: true,
    then: Yup.string().required(
      "الرجاء إدخال كلمة المرور للمسؤول عم إحصائية المشفى"
    ),
  }),
  patientAnalystName: Yup.string().required(
    "الرجاء إدخال اسم المسؤول عم إحصائية المرضى"
  ),
  patientAnalystUsername: Yup.string().required(
    "الرجاء إدخال اسم المستخدم للمسؤول عم إحصائية المرضى"
  ),
  patientAnalystPassword: Yup.string().when("updatePAPassword", {
    is: true,
    then: Yup.string().required(
      "الرجاء إدخال كلمة المرور للمسؤول عم إحصائية المرضى"
    ),
  }),
});

const HospitalForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [isCreate, setIsCreate] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: "",
    location: "",
    type: "0",
    emergencyBeds: "",
    intensiveCareBeds: "",
    ventilators: "",
    hospitalAnalystName: "",
    hospitalAnalystUsername: "",
    hospitalAnalystPassword: "",
    patientAnalystName: "",
    patientAnalystUsername: "",
    patientAnalystPassword: "",
  });

  const getHospital = async () => {
    try {
      const res = await api.get(`/api/hospitals/${params.hid}`);
      setInitialValues({
        name: res.data.name,
        location: res.data.location,
        type: "" + res.data.type,
        emergencyBeds: +res.data.emergencyBeds,
        intensiveCareBeds: +res.data.intensiveCareBeds,
        ventilators: +res.data.ventilators,
        hospitalAnalystName: res.data.hospital_analyst.name,
        hospitalAnalystUsername: res.data.hospital_analyst.username,
        updateHAPassword: false,
        hospitalAnalystPassword: "",
        patientAnalystName: res.data.patient_analyst.name,
        patientAnalystUsername: res.data.patient_analyst.username,
        updatePAPassword: false,
        patientAnalystPassword: "",
      });
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
        navigate(-1);
      } else {
        toast.error("عذرا حدث خطأ");
      }
    }
  };

  useEffect(() => {
    if (location.pathname === "/dashboard/hospitals/add") {
      setIsCreate(true);
    } else {
      setIsCreate(false);
      getHospital();
    }
  }, []);

  const handleCreate = async (values) => {
    try {
      await api.post("/api/hospitals/create", values);
      toast.success("تم الإنشاء بنجاح");
      navigate(-1);
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
      } else if (error?.response?.status === 422) {
        toast.error("عذرا أسماء موظفي المشافي يجب ان تكون فريدة");
      } else {
        toast.error("عذرا حدث خطأ");
      }
    }
  };

  const handleEdit = async (values) => {
    try {
      await api.put(`/api/hospitals/${params.hid}/update`, values);
      toast.success("تم التعديل بنجاح");
      navigate(-1);
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
      } else if (error?.response?.status === 422) {
        toast.error("عذرا أسماء موظفي المشافي يجب ان تكون فريدة");
      } else {
        toast.error("عذرا حدث خطأ");
      }
    }
  };

  return (
    <div className="space-y-3 flex flex-col justify-start pt-10 pb-24 grow px-32 xl:px-40 overflow-y-scroll">
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) =>
          isCreate ? handleCreate(values) : handleEdit(values)
        }
      >
        <span className="text-xl font-semibold">معلومات المشفى</span>
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
        <span className="text-xl pt-10 font-semibold">معلومات الموظفين</span>
        <span className="text-lg font-medium">
          الموظف المسؤول عن إحصائية المشفى:
        </span>
        <div className={`grid ${isCreate ? "grid-cols-3" : "grid-cols-4"}`}>
          <AppInput
            id={"hospitalAnalystName"}
            placeholder={"الإسم"}
            label={"الإسم:"}
            containerClassName="grow"
          />
          <AppInput
            id={"hospitalAnalystUsername"}
            placeholder={"اسم المستخدم"}
            label={"اسم المستخدم:"}
            containerClassName="grow"
          />
          <AppInput
            id={"hospitalAnalystPassword"}
            placeholder={"كلمة المرور"}
            label={"كلمة المرور:"}
            containerClassName="grow"
          />
          {!isCreate && (
            <AppSecondCheckBox
              id={"updateHAPassword"}
              name={"updateHAPassword"}
              text={"تعديل كلمة المرور"}
            />
          )}
        </div>

        <span className="text-base font-medium">
          الموظف المسؤول عن إحصائية المرضى:
        </span>
        <div className={`grid ${isCreate ? "grid-cols-3" : "grid-cols-4"}`}>
          <AppInput
            id={"patientAnalystName"}
            placeholder={"الإسم"}
            label={"الإسم:"}
            containerClassName="grow"
          />
          <AppInput
            id={"patientAnalystUsername"}
            placeholder={"اسم المستخدم"}
            label={"اسم المستخدم:"}
            containerClassName="grow"
          />
          <AppInput
            id={"patientAnalystPassword"}
            placeholder={"كلمة المرور"}
            label={"كلمة المرور:"}
            containerClassName="grow"
          />
          {!isCreate && (
            <AppSecondCheckBox
              id={"updatePAPassword"}
              name={"updatePAPassword"}
              text={"تعديل كلمة المرور"}
            />
          )}
        </div>

        <div className="grid grid-cols-3 gap-10 justify-between">
          <AppButton
            type="button"
            onClick={() => navigate(-1)}
            className={"border-dark text-dark hover:bg-dark hover:text-white"}
          >
            إلغاء
          </AppButton>
          <span></span>
          <AppSubmitButton>
            {isCreate ? <span>إضافة</span> : <span>تعديل</span>}
          </AppSubmitButton>
        </div>
      </AppForm>
    </div>
  );
};

export default HospitalForm;
