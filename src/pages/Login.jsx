import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { ReactComponent as CovidVaccine } from "../assets/covid-vaccine.svg";
import AppSubmitButton from "../components/AppSubmitButton";
import AppForm from "../components/AppForm";
import AppInput from "../components/AppInput";
import { AiOutlineUser, AiOutlineKey } from "react-icons/ai";
import api from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUser } from "../api/user";
import { setToken } from "../api/token";
import UserContext from "../contexts/userContext";
import axios from "axios";
import WindowContext from "../contexts/windowContext";
import Header from "../components/Header";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("اسم المستخدم مطلوب"),
  password: Yup.string().required("كلمة المرور مطلوبة"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useContext(UserContext);
  const windowContext = useContext(WindowContext);
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      // await api.get(
      //   `${process.env.REACT_APP_API_ABSOLUTE}/sanctum/csrf-cookie`
      // );

      const res = await api.post("/login", {
        username: values.username,
        password: values.password,
      });
      if (
        (res.data.user.role === 1 || res.data.user.role === 2) &&
        !res.data.user.hospital?.is_activated
      ) {
        toast.info("الحساب قيد التفعيل الرجاء الإنتظار");
        setIsLoading(false);
        return;
      }

      userContext.setUser(res.data.user);
      setUser(res.data.user);
      setToken(res.data.token);

      if (res.data.user.role === 0 || res.data.user.role === 3) {
        navigate("/dashboard/statistics");
      } else if (res.data.user.role === 1) {
        navigate("/dashboard/monitor-patients");
      } else if (res.data.user.role === 2) {
        navigate("/dashboard/monitor-hospital");
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error("خطأ في اسم المستخدم او كلمة المرور!");
      } else {
        toast.error("حدث خطأ داخلي الرجاء إعادة المحاولة!");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen overflow-clip   bg-doctor bg-[#111311] bg-blend-overlay bg-no-repeat">
      <Header />
      <div className="w-5/6 h-2/4 lg:w-3/6 lg:h-2/3 bg-white shadow shadow-gray flex flex-col items-center m-auto mt-16">
        <h2 className="text-dark my-4 text-lg lg:text-xl">تسجيل الدخول</h2>
        <div className="grid grid-cols-2 px-7 2xl:px-14">
          {windowContext.width > 900 && (
            <CovidVaccine className="w-72 h-80 2xl:w-96 2xl:h-110" />
          )}
          <div
            dir="rtl"
            className={`flex flex-col justify-center relative ${
              windowContext.width > 900 ? "col-span-1" : "col-span-2"
            }`}
          >
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
              <AppSubmitButton isLoading={isLoading}>
                تسجيل الدخول
              </AppSubmitButton>
            </AppForm>
          </div>
        </div>
        <div className="h-full w-full flex justify-end items-end">
          <div className="h-2 bg-my-primary w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
