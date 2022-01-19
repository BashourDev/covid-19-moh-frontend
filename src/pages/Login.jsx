import React from "react";
import * as Yup from "yup";
import { ReactComponent as CovidVaccine } from "../assets/covid-vaccine.svg";
import AppSubmitButton from "../components/AppSubmitButton";
import AppForm from "../components/AppForm";
import AppInput from "../components/AppInput";
import { AiOutlineUser, AiOutlineKey } from "react-icons/ai";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("اسم المستخدم مطلوب"),
  password: Yup.string().required("كلمة المرور مطلوبة"),
});

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const handleLogin = (values) => {
    console.log(values);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-tl from-[#bbeed3] to-[#bbeed32a]">
      <div className="w-3/6 h-2/3 bg-white shadow shadow-gray flex flex-col items-center">
        <h2 className="text-dark my-4 text-3xl">تسجيل الدخول</h2>
        <div className="grid grid-cols-2 px-7 2xl:px-14">
          <CovidVaccine className="w-72 h-80 2xl:w-96 2xl:h-110" />
          <div dir="rtl" className="flex flex-col justify-center">
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleLogin(values)}
            >
              <AppInput
                id={"username"}
                label={"اسم المستخدم:"}
                placeholder={"ادخل اسم المستخدم"}
                type="text"
                Icon={AiOutlineUser}
              />
              <AppInput
                id={"password"}
                label={"كلمة المرور:"}
                placeholder={"ادخل كلمة المرور"}
                type="password"
                Icon={AiOutlineKey}
              />
              <AppSubmitButton>تسجيل الدخول</AppSubmitButton>
            </AppForm>
          </div>
        </div>
        <div className="h-full w-full flex justify-end items-end">
          <div className="h-2 bg-primary w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
