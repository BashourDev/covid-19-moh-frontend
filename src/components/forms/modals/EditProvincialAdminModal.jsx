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
import AppFormSwitch from "../../AppFormSwitch";

const EditProvincialAdminModal = ({
  isOpen,
  onClose,
  selectedProvAdmin,
  setProvincialAdmins,
}) => {
  const [provinces, setProvinces] = useState([]);

  const getProvinces = async () => {
    const res = await api.get("/provinces");
    setProvinces(res.data);
  };

  useEffect(() => {
    getProvinces();
  }, []);

  const handleSubmit = async (values) => {
    await api.put(`/provincial-admins/${selectedProvAdmin?.id}/update`, {
      name: values?.name,
      username: values?.username,
      password: values?.password,
      update_password: values?.update_password,
      province_id: values?.province?.id,
    });
    setProvincialAdmins((old) =>
      old.map((o) => {
        if (o.id === selectedProvAdmin?.id) {
          o.name = values?.name;
          o.username = values?.username;
          o.province = values?.province;
        }
        return o;
      })
    );
    toast.success("تمت العملية بنجاح");
    onClose();
  };

  return (
    <AppModal isOpen={isOpen} onClose={onClose} title={"تعديل مديرية صحة"}>
      <AppForm
        initialValues={{
          ...selectedProvAdmin,
          password: "",
          update_password: false,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("الحقل مطلوب"),
          username: Yup.string().required("الحقل مطلوب"),
          password: Yup.string().when("update_password", {
            is: true,
            then: Yup.string().required("الحقل مطلوب"),
          }),
        })}
        onSubmit={handleSubmit}
      >
        <AppInput id={"name"} placeholder={"الاسم"} label={"الاسم:"} />
        <AppFormSelect
          name="province"
          label={"المحافطة:"}
          options={provinces}
        />
        <AppInput
          id={"username"}
          placeholder={"اسم المستخدم"}
          label={"اسم المستخدم:"}
        />
        <div className="pt-5 flex items-center">
          <AppFormSwitch name={"update_password"} text={"تعديل كلمة المرور"} />
        </div>
        <AppInput
          id={"password"}
          placeholder={"كلمة المرور"}
          label={"كلمة المرور:"}
          type="password"
          disabledValue={"update_password"}
        />
        <AppSubmitButton>تعديل</AppSubmitButton>
      </AppForm>
    </AppModal>
  );
};

export default EditProvincialAdminModal;
