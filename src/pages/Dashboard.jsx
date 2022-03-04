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

const Dashboard = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const userContext = useContext(UserContext);
  const location = useLocation();

  const logout = async () => {
    await api.get("/logout");
    removeUser();
    removeToken();
    userContext.setUser({});
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
      <div className="px-6 bg-sky-700 shadow-md flex items-center justify-between">
        <div className="flex gap-5 py-4">
          <MdOutlineCoronavirus className="text-light w-8 h-8" />
          <h1 className="text-2xl text-light font-semibold">
            نظام إبلاغ المشافي عن مرضى كورونا
          </h1>
          {userContext.user.role !== 0 && (
            <>
              <BsChevronCompactLeft className="text-light w-6 h-8" />
              <span className="text-2xl text-light font-medium ">
                {userContext?.user?.hospital?.name}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center">
          <AppButton
            onClick={() => logout()}
            className={
              "border-light mt-0 mb-0 text-light bg-sky-700 hover:bg-light hover:text-sky-700 w-40 border-4"
            }
          >
            تسجيل الخروج
          </AppButton>
        </div>
      </div>
      <div className="flex h-full">
        <ProSidebar rtl collapsed={sideBarCollapsed}>
          <Menu iconShape="circle">
            <MenuItem
              icon={<AiOutlineMenu />}
              onClick={() => setSideBarCollapsed(!sideBarCollapsed)}
            ></MenuItem>
            <MenuItem
              className={`${checkActiveItem("stat") ? "bg-slate-800" : ""}`}
              icon={<FaRegChartBar />}
            >
              <NavLink to={"/dashboard/statistics"}>إحصائيات</NavLink>
            </MenuItem>
            <SubMenu title="المشافي" icon={<RiHospitalFill />}>
              <MenuItem
                className={`${checkActiveItem("puh") ? "bg-slate-800" : ""}`}
              >
                <NavLink to={"/dashboard/hospitals/public"}>عامة</NavLink>
              </MenuItem>
              <MenuItem
                className={`${checkActiveItem("prh") ? "bg-slate-800" : ""}`}
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
            <MenuItem
              className={`${checkActiveItem("mh") ? "bg-slate-800" : ""}`}
              icon={<MdTrendingUp />}
            >
              <NavLink to={"/dashboard/monitor-hospital"}>
                مراقبة المشفى
              </NavLink>
            </MenuItem>
            <MenuItem
              className={`${checkActiveItem("mp") ? "bg-slate-800" : ""}`}
              icon={<FaUserInjured />}
            >
              <NavLink to={"/dashboard/monitor-patients"}>
                مراقبة مرضى كورونا
              </NavLink>
            </MenuItem>
          </Menu>
        </ProSidebar>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
