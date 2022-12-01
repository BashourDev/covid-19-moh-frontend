import React, { useState } from "react";
import api from "../../../api/api";
import AppForm from "../../AppForm";
import AppInput from "../../AppInput";
import AppModal from "../../AppModal";
import AppSubmitButton from "../../AppSubmitButton";
import * as Yup from "yup";
import { toast } from "react-toastify";
import AppSelect from "../../AppSelect";
import AppFormSelect from "../../AppFormSelect";
import { useEffect } from "react";

const CreateProvincialAdminModal = ({
  isOpen,
  onClose,
  setProvincialAdmins,
}) => {
  const [provinces, setProvinces] = useState([]);

  let initialValues = {
    name: "",
    username: "",
    password: "",
    province: { id: 0, name: "---" },
  };

  const getProvinces = async () => {
    const res = await api.get("/provinces");
    setProvinces(res.data);
  };

  useEffect(() => {
    getProvinces();
  }, []);

  const handleSubmit = async (values) => {
    const res = await api.post("/provincial-admins/create", {
      name: values?.name,
      username: values?.username,
      password: values?.password,
      province_id: values?.province?.id,
    });
    setProvincialAdmins((old) => [res.data, ...old]);
    toast.success("تمت العملية بنجاح");
    onClose();
  };

  return (
    <AppModal isOpen={isOpen} onClose={onClose} title={"إضافة مديرية صحة"}>
      <AppForm
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("الحقل مطلوب"),
          username: Yup.string().required("الحقل مطلوب"),
          password: Yup.string().required("الحقل مطلوب"),
        })}
        onSubmit={handleSubmit}
      >
        <AppInput id={"name"} placeholder={"الاسم"} label={"الاسم:"} />
        <AppFormSelect
          label={"المحافطة:"}
          name="province"
          options={provinces}
        />
        <AppInput
          id={"username"}
          placeholder={"اسم المستخدم"}
          label={"اسم المستخدم:"}
        />
        <AppInput
          id={"password"}
          placeholder={"كلمة المرور"}
          label={"كلمة المرور:"}
          type="password"
        />

        <AppSubmitButton>إضافة</AppSubmitButton>
      </AppForm>
    </AppModal>
  );
};

export default CreateProvincialAdminModal;
