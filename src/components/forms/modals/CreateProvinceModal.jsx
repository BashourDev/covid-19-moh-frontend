import React from "react";
import api from "../../../api/api";
import AppForm from "../../AppForm";
import AppInput from "../../AppInput";
import AppModal from "../../AppModal";
import AppSubmitButton from "../../AppSubmitButton";
import * as Yup from "yup";
import { toast } from "react-toastify";

const CreateProvinceModal = ({ isOpen, onClose, setProvinces }) => {
  const handleSubmit = async (values) => {
    const res = await api.post("/provinces/create", { name: values?.name });
    setProvinces((old) => [res.data, ...old]);
    toast.success("تمت العملية بنجاح");
    onClose();
  };

  return (
    <AppModal isOpen={isOpen} onClose={onClose} title={"إضافة محافظة"}>
      <AppForm
        initialValues={{ name: "" }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("الحقل مطلوب"),
        })}
        onSubmit={handleSubmit}
      >
        <AppInput id={"name"} placeholder={"الاسم"} label={"الاسم:"}></AppInput>
        <AppSubmitButton>إضافة</AppSubmitButton>
      </AppForm>
    </AppModal>
  );
};

export default CreateProvinceModal;
