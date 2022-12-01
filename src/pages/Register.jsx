import React, { useState } from "react";
import AppForm from "../components/AppForm";
import AppProfilePictureInput from "../components/AppProfilePictureInput";
import * as Yup from "yup";
import AppFormRadioButton from "../components/AppFormRadioButton";
import AppInput from "../components/AppInput";
import AppFormSelect from "../components/AppFormSelect";
import api from "../api/api";
import AppSubmitButton from "../components/AppSubmitButton";
import { useEffect } from "react";
import Header from "../components/Header";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let initialValues = {
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
  };

  let validationSchema = Yup.object().shape({
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
      "الرجاء إدخال اسم المسؤول عن إحصائية المشفى"
    ),
    hospitalAnalystUsername: Yup.string().required(
      "الرجاء إدخال اسم المستخدم للمسؤول عن إحصائية المشفى"
    ),
    hospitalAnalystPassword: Yup.string().required(
      "الرجاء إدخال كلمة المرور للمسؤول عن إحصائية المشفى"
    ),
    patientAnalystName: Yup.string().required(
      "الرجاء إدخال اسم المسؤول عن إحصائية المرضى"
    ),
    patientAnalystUsername: Yup.string().required(
      "الرجاء إدخال اسم المستخدم للمسؤول عن إحصائية المرضى"
    ),
    patientAnalystPassword: Yup.string().required(
      "الرجاء إدخال كلمة المرور للمسؤول عن إحصائية المرضى"
    ),
  });

  const getProvinces = async () => {
    const res = await api.get("/provinces");
    setProvinces(res.data);
  };

  useEffect(() => {
    getProvinces();
  }, []);

  const handleSubmit = async (values) => {
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

      await api.post("/hospitals/requests/create", formData);
      swal("الطلب قيد المعالجة", {
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      if (error.response.status === 422) {
        toast.info("اسماء المستخدمين محجوزة");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-full bg-doctor bg-[#001724] bg-blend-overlay bg-no-repeat">
        <Header />
      </div>
      <div className="space-y-3 lg:space-y-3 flex flex-col justify-start pt-5 lg:pt-10 pb-24 grow px-3 lg:px-10 overflow-y-scroll max-w-5xl mx-auto rounded-md bg-white shadow-md my-10">
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <AppProfilePictureInput
            selectedFile={selectedImage}
            onChange={(e) => setSelectedImage(e.target.files[0])}
            label={"choose image"}
          />
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-7">
            <AppInput
              id={"name"}
              placeholder={"اسم المشفى"}
              label={"اسم المشفى:"}
              className={"w-full"}
              containerClassName="grow"
            />
            <AppFormSelect
              label={"المحافظة:"}
              name={"province"}
              className={"w-full"}
              options={provinces}
            />
            <AppInput
              id={"location"}
              placeholder={"العنوان"}
              label={"العنوان:"}
              className={"w-full"}
              containerClassName="grow"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-7">
            <AppInput
              id={"emergencyBeds"}
              placeholder={"عدد أسرة المشفى للقبول الإسعافي"}
              label={"عدد أسرة المشفى للقبول الإسعافي:"}
              type={"number"}
              className={"w-full"}
              containerClassName="grow"
            />
            <AppInput
              id={"intensiveCareBeds"}
              placeholder={"عدد أسرة العناية"}
              label={"عدد أسرة العناية:"}
              type={"number"}
              className={"w-full"}
              containerClassName="grow"
            />
            <AppInput
              id={"ventilators"}
              placeholder={"عدد أجهزة التنفس الآلي"}
              label={"عدد أجهزة التنفس الآلي:"}
              type={"number"}
              className={"w-full"}
              containerClassName="grow"
            />
          </div>

          <>
            <span className="text-sm lg:text-base pt-10 font-semibold">
              معلومات الموظفين
            </span>
            <span className="text-xs lg:text-sm font-medium pt-2">
              الموظف المسؤول عن إحصائية المشفى:
            </span>
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-x-7`}>
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
                type="password"
                containerClassName="grow"
              />
            </div>

            <span className="text-xs lg:text-sm font-medium pt-4">
              الموظف المسؤول عن إحصائية المرضى:
            </span>
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-x-7`}>
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
                type="password"
                containerClassName="grow"
              />
            </div>
          </>

          <AppSubmitButton isLoading={isLoading} className={"w-full"}>
            إرسال الطلب
          </AppSubmitButton>
        </AppForm>
      </div>
    </>
  );
};

export default Register;
