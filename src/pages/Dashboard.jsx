import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  MdTrendingUp,
  MdOutlineCoronavirus,
  MdSummarize,
} from "react-icons/md";
import { RiHospitalFill } from "react-icons/ri";
import { BsChevronCompactLeft } from "react-icons/bs";
import { FaUserInjured, FaRegChartBar } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import AppButton from "../components/AppButton";
import { removeUser } from "../api/user";
import { removeToken } from "../api/token";
import UserContext from "../contexts/userContext";
import api from "../api/api";
import Loading from "../components/Loading";
import AppModal from "../components/AppModal";
import MyAccount from "../components/MyAccount";
import WindowContext from "../contexts/windowContext";

const Dashboard = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userContext = useContext(UserContext);
  const windowContext = useContext(WindowContext);
  const location = useLocation();

  const logout = async () => {
    setLoading(true);
    await api.get("/logout");
    removeUser();
    removeToken();
    userContext.setUser({});
    setLoading(false);
  };

  const checkActiveItem = (items) => {
    if (activeItem === items) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (location.pathname.match("/dashboard/statistics")) {
      setActiveItem("stat");
    } else if (location.pathname.match("/dashboard/hospitals/public")) {
      setActiveItem("puh");
    } else if (location.pathname.match("/dashboard/hospitals/private")) {
      setActiveItem("prh");
    } else if (location.pathname.match("/dashboard/reports")) {
      setActiveItem("rep");
    } else if (location.pathname.match("/dashboard/monitor-hospital")) {
      setActiveItem("mh");
    } else if (location.pathname.match("/dashboard/monitor-patients")) {
      setActiveItem("mp");
    }
  }, [location]);

  return (
    <div dir="rtl" className="flex flex-col h-screen bg-light">
      <div className="px-6 bg-sky-700 shadow-md flex flex-col lg:flex-row items-center justify-between">
        <div className="flex gap-3 lg:gap-5 py-2 lg:py-4">
          <MdOutlineCoronavirus className="text-light w-8 h-8" />
          <h1 className="text-base lg:text-lg text-light font-semibold">
            نظام إبلاغ المشافي عن مرضى كورونا
          </h1>
          {/* {userContext.user.role !== 0 && (
            <div className="flex">
              <BsChevronCompactLeft className="text-light w-6 h-8" />
              <span className="text-base lg:text-lg text-light font-medium ">
                {userContext?.user?.hospital?.name}
              </span>
            </div>
          )} */}
        </div>
        <div className="flex items-center mb-2 lg:mb-0">
          <AppButton
            onClick={() => setIsOpen(true)}
            disabled={loading}
            className={
              "border-light mt-0 mb-0 mx-1 text-light bg-sky-700 hover:bg-light hover:text-sky-700 disabled:text-light disabled:bg-lightGray disabled:hover:bg-light disabled:hover:text-lightGray w-28 lg:w-36 border-4"
            }
          >
            {"حسابي"}
          </AppButton>
          <AppButton
            onClick={() => logout()}
            disabled={loading}
            className={
              "border-light mt-0 mb-0 mx-1 text-light bg-sky-700 hover:bg-light hover:text-sky-700 disabled:text-light disabled:bg-lightGray disabled:hover:bg-light disabled:hover:text-lightGray w-28 lg:w-36 border-4"
            }
          >
            {loading ? <Loading className="w-8 h-8" /> : "تسجيل الخروج"}
          </AppButton>
        </div>
      </div>
      <div className="flex h-full z-10">
        <ProSidebar
          rtl
          collapsed={sideBarCollapsed}
          collapsedWidth={windowContext.width > 710 ? 80 : 70}
        >
          <Menu iconShape="circle">
            <MenuItem
              icon={<AiOutlineMenu />}
              onClick={() => setSideBarCollapsed(!sideBarCollapsed)}
            ></MenuItem>
            {userContext.user.role === 0 && (
              <>
                <MenuItem
                  className={`${checkActiveItem("stat") ? "bg-slate-800" : ""}`}
                  icon={<FaRegChartBar />}
                >
                  <NavLink to={"/dashboard/statistics"}>إحصائيات</NavLink>
                </MenuItem>
                <SubMenu title="المشافي" icon={<RiHospitalFill />}>
                  <MenuItem
                    className={`${
                      checkActiveItem("puh") ? "bg-slate-800" : ""
                    }`}
                  >
                    <NavLink to={"/dashboard/hospitals/public"}>عامة</NavLink>
                  </MenuItem>
                  <MenuItem
                    className={`${
                      checkActiveItem("prh") ? "bg-slate-800" : ""
                    }`}
                  >
                    <NavLink to={"/dashboard/hospitals/private"}>خاصة</NavLink>
                  </MenuItem>
                </SubMenu>
                <MenuItem
                  className={`${checkActiveItem("rep") ? "bg-slate-800" : ""}`}
                  icon={<MdSummarize />}
                >
                  <NavLink to={"/dashboard/reports"}>التقارير</NavLink>
                </MenuItem>
              </>
            )}

            {userContext.user.role === 2 && (
              <MenuItem
                className={`${checkActiveItem("mh") ? "bg-slate-800" : ""}`}
                icon={<MdTrendingUp />}
              >
                <NavLink to={"/dashboard/monitor-hospital"}>
                  مراقبة المشفى
                </NavLink>
              </MenuItem>
            )}
            {userContext.user.role === 1 && (
              <MenuItem
                className={`${checkActiveItem("mp") ? "bg-slate-800" : ""}`}
                icon={<FaUserInjured />}
              >
                <NavLink to={"/dashboard/monitor-patients"}>
                  مراقبة مرضى كورونا
                </NavLink>
              </MenuItem>
            )}
          </Menu>
        </ProSidebar>
        <Outlet />
      </div>
      <MyAccount isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Dashboard;
