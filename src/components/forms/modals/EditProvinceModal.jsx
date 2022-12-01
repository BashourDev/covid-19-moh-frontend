import React from "react";
import api from "../../../api/api";
import AppForm from "../../AppForm";
import AppInput from "../../AppInput";
import AppModal from "../../AppModal";
import AppSubmitButton from "../../AppSubmitButton";
import * as Yup from "yup";
import { toast } from "react-toastify";

const EditProvinceModal = ({ isOpen, onClose, province, setProvinces }) => {
  const handleSubmit = async (values) => {
    await api.put(`/provinces/${province.id}/update`, {
      name: values?.name,
    });
    setProvinces((old) =>
      old.map((o) => {
        if (o.id === province.id) {
          o.name = values.name;
        }
        return o;
      })
    );
    toast.success("تمت العملية بنجاح");
    onClose();
  };

  return (
    <AppModal isOpen={isOpen} onClose={onClose} title={"تعديل محافظة"}>
      <AppForm
        initialValues={{ name: province?.name }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("الحقل مطلوب"),
        })}
        onSubmit={handleSubmit}
      >
        <AppInput id={"name"} placeholder={"الاسم"} label={"الاسم:"}></AppInput>
        <AppSubmitButton>تعديل</AppSubmitButton>
      </AppForm>
    </AppModal>
  );
};

export default EditProvinceModal;
