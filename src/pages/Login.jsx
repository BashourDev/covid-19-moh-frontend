import React, { useContext } from "react";
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

const validationSchema = Yup.object().shape({
  username: Yup.string().required("اسم المستخدم مطلوب"),
  password: Yup.string().required("كلمة المرور مطلوبة"),
});

const Login = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const handleLogin = async (values) => {
    try {
      await api.get("sanctum/csrf-cookie");
      const res = await api.post("/api/login", {
        username: values.username,
        password: values.password,
      });

      userContext.setUser(res.data.user);
      setUser(res.data.user);
      setToken(res.data.token);

      if (res.data.user.role === 0) {
        navigate("/dashboard/statistics");
      } else if (res.data.user.role === 1) {
        navigate("/dashboard/monitor-patients");
      } else if (res.data.user.role === 2) {
        navigate("/dashboard/monitor-hospitals");
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error("خطأ في اسم المستخدم او كلمة المرور!");
      } else {
        toast.error("حدث خطأ داخلي الرجاء إعادة المحاولة!");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center  bg-doctor bg-[#111311] bg-blend-overlay bg-no-repeat">
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
