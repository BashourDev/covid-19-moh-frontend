import React, { useEffect, useState, useContext } from "react";
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
import WindowContext from "../../contexts/windowContext";
import AppFormSelect from "../AppFormSelect";
import AppProfilePictureInput from "../AppProfilePictureInput";
import swal from "sweetalert";

const validationSchemaCreate = Yup.object().shape({
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
});

const validationSchemaEdit = Yup.object().shape({
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
  const windowContext = useContext(WindowContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [isCreate, setIsCreate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
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
    province: { id: 0, name: "---" },
  });

  const getProvinces = async () => {
    const res = await api.get("/provinces");
    setProvinces(res.data);
  };

  const getHospital = async () => {
    try {
      const res = await api.get(`/hospitals/${params.hid}`);
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
        province: res.data.province,
        profile_picture: res.data.profile_picture,
      });
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
        navigate(-1);
      } else if (error?.response?.status >= 500) {
        toast.error("عذرا حدث خطأ");
      }
    }
  };

  useEffect(() => {
    getProvinces();
    if (location.pathname === "/dashboard/hospitals/add") {
      setIsCreate(true);
    } else {
      getHospital();
      setIsCreate(false);
    }
  }, [location]);

  const handleCreate = async (values) => {
    try {
      if (!selectedImage) {
        swal({
          icon: "warning",
          text: "الرجاء تحديد صورة الشعار",
        });
        return;
      }
      setIsLoading(true);

      let formData = new FormData();

      formData.append("image", selectedImage);
      formData.append("type", values?.type);
      formData.append("name", values.name);
      formData.append("province_id", values?.province?.id);
      formData.append("location", values?.location);
      formData.append("emergencyBeds", values?.emergencyBeds);
      formData.append("intensiveCareBeds", values?.intensiveCareBeds);
      formData.append("ventilators", values?.ventilators);

      await api.post("/hospitals/create", formData);
      toast.success("تم الإنشاء بنجاح");
      navigate(-1);
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
      } else if (error?.response?.status === 422) {
        toast.error("عذرا أسماء موظفي المشافي يجب ان تكون فريدة");
      } else if (error?.response?.status >= 500) {
        toast.error("عذرا حدث خطأ");
      }
    }
    setIsLoading(false);
  };

  const handleEdit = async (values) => {
    try {
      setIsLoading(true);
      let formData = new FormData();

      formData.append("image", selectedImage);
      formData.append("type", values?.type);
      formData.append("name", values.name);
      formData.append("province_id", values?.province?.id);
      formData.append("location", values?.location);
      formData.append("emergencyBeds", values?.emergencyBeds);
      formData.append("intensiveCareBeds", values?.intensiveCareBeds);
      formData.append("ventilators", values?.ventilators);

      formData.append("update_profile_picture", selectedImage ? 1 : 0);

      formData.append("updateHAPassword", values?.updateHAPassword);
      formData.append("updatePAPassword", values?.updatePAPassword);

      formData.append("hospitalAnalystName", values?.hospitalAnalystName);
      formData.append(
        "hospitalAnalystUsername",
        values?.hospitalAnalystUsername
      );
      formData.append(
        "hospitalAnalystPassword",
        values?.hospitalAnalystPassword
      );
      formData.append("patientAnalystName", values?.patientAnalystName);
      formData.append("patientAnalystUsername", values?.patientAnalystUsername);
      formData.append("patientAnalystPassword", values?.patientAnalystPassword);

      await api.put(`/hospitals/${params.hid}/update`, formData);
      toast.success("تم التعديل بنجاح");
      navigate(-1);
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
      } else if (error?.response?.status === 422) {
        toast.error("عذرا أسماء موظفي المشافي يجب ان تكون فريدة");
      } else if (error?.response?.status >= 500) {
        toast.error("عذرا حدث خطأ");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md h-fit mt-10 space-y-1 lg:space-y-3 flex flex-col justify-start pt-5 lg:pt-10 pb-24 grow px-3 lg:px-10 max-w-6xl w-full mx-auto overflow-y-scroll">
      <AppForm
        initialValues={initialValues}
        validationSchema={
          isCreate ? validationSchemaCreate : validationSchemaEdit
        }
        onSubmit={(values) =>
          isCreate ? handleCreate(values) : handleEdit(values)
        }
      >
        <AppProfilePictureInput
          selectedFile={selectedImage}
          onChange={(e) => setSelectedImage(e.target.files[0])}
          existingImage={initialValues?.profile_picture?.original_url}
          label={"choose image"}
        />
        <div>
          <span className="text-sm lg:text-base font-semibold">
            معلومات المشفى
          </span>
          <div className="flex flex-col justify-start items-start mt-4 grow w-1/12">
            <span className="mx-2 text-sm lg:text-base text-dark my-2">
              النوع:
            </span>
            <div
              role="group"
              className="flex text-xs lg:text-sm items-center justify-center"
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
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <AppInput
              id={"name"}
              placeholder={"اسم المشفى"}
              label={"اسم المشفى:"}
              containerClassName="grow"
            />
            <AppFormSelect
              label={"المحافظة:"}
              name={"province"}
              options={provinces}
            />
            <AppInput
              id={"location"}
              placeholder={"العنوان"}
              label={"العنوان:"}
              containerClassName="grow"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3">
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
          {!isCreate && (
            <div className="flex flex-col gap-y-3">
              <span className="text-sm lg:text-base pt-10 font-semibold block">
                معلومات الموظفين
              </span>
              <span className="text-xs lg:text-sm font-medium pt-2">
                الموظف المسؤول عن إحصائية المشفى:
              </span>
              <div
                className={`grid ${
                  isCreate
                    ? "grid-cols-1 lg:grid-cols-3"
                    : "grid-cols-1 lg:grid-cols-4"
                }`}
              >
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

              <span className="text-xs lg:text-sm font-medium pt-4">
                الموظف المسؤول عن إحصائية المرضى:
              </span>
              <div
                className={`grid ${
                  isCreate
                    ? "grid-cols-1 lg:grid-cols-3"
                    : "grid-cols-1 lg:grid-cols-4"
                }`}
              >
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
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
            <AppButton
              type="button"
              onClick={() => navigate(-1)}
              className={"border-dark text-dark hover:bg-dark hover:text-white"}
            >
              إلغاء
            </AppButton>
            {windowContext.width >= 1024 && <span></span>}
            <AppSubmitButton isLoading={isLoading}>
              {isCreate ? <span>إضافة</span> : <span>تعديل</span>}
            </AppSubmitButton>
          </div>
        </div>
      </AppForm>
    </div>
  );
};

export default HospitalForm;
