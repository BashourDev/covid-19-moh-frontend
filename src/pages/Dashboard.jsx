import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  MdTrendingUp,
  MdOutlineCoronavirus,
  MdSummarize,
  MdPerson,
  MdRequestPage,
  MdFlag,
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
import MyAccount from "../components/MyAccount";

const Dashboard = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userContext = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    await api.get("/logout");
    removeUser();
    removeToken();
    userContext.setUser({});
    setLoading(false);
    navigate("/");
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
    } else if (location.pathname.match("/dashboard/state-admins")) {
      setActiveItem("pa");
    } else if (location.pathname.match("/dashboard/states")) {
      setActiveItem("pro");
    } else if (location.pathname.match("/dashboard/requests")) {
      setActiveItem("req");
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
          className="hidden md:block"
        >
          <Menu iconShape="circle">
            <MenuItem
              icon={<AiOutlineMenu />}
              onClick={() => setSideBarCollapsed(!sideBarCollapsed)}
            ></MenuItem>
            {(userContext.user.role === 0 || userContext.user.role === 3) && (
              <>
                <MenuItem
                  className={`${
                    checkActiveItem("stat") ? "bg-slate-800 rounded-r-full" : ""
                  }`}
                  icon={<FaRegChartBar />}
                >
                  <NavLink to={"/dashboard/statistics"}>إحصائيات</NavLink>
                </MenuItem>
                <SubMenu
                  title="المشافي"
                  icon={<RiHospitalFill />}
                  className={"relative"}
                >
                  <MenuItem
                    className={`${
                      checkActiveItem("puh")
                        ? "bg-slate-800 rounded-r-full"
                        : ""
                    }`}
                  >
                    <NavLink to={"/dashboard/hospitals/public"}>عامة</NavLink>
                  </MenuItem>
                  <MenuItem
                    className={`${
                      checkActiveItem("prh")
                        ? "bg-slate-800 rounded-r-full"
                        : ""
                    }`}
                  >
                    <NavLink to={"/dashboard/hospitals/private"}>خاصة</NavLink>
                  </MenuItem>
                </SubMenu>
                <MenuItem
                  className={`${
                    checkActiveItem("rep") ? "bg-slate-800 rounded-r-full" : ""
                  }`}
                  icon={<MdSummarize />}
                >
                  <NavLink to={"/dashboard/reports"}>التقارير</NavLink>
                </MenuItem>
                <MenuItem
                  className={`${
                    checkActiveItem("req") ? "bg-slate-800 rounded-r-full" : ""
                  }`}
                  icon={<MdRequestPage />}
                >
                  <NavLink to={"/dashboard/requests"}>طلبات الإنضمام</NavLink>
                </MenuItem>
              </>
            )}

            {userContext.user.role === 0 && (
              <>
                <MenuItem
                  className={`${
                    checkActiveItem("pro") ? "bg-slate-800 rounded-r-full" : ""
                  }`}
                  icon={<MdFlag />}
                >
                  <NavLink to={"/dashboard/states"}>
                    المحافظات / الولايات
                  </NavLink>
                </MenuItem>
                <MenuItem
                  className={`${
                    checkActiveItem("pa") ? "bg-slate-800 rounded-r-full" : ""
                  }`}
                  icon={<MdPerson />}
                >
                  <NavLink to={"/dashboard/state-admins"}>
                    مديريات الصحة
                  </NavLink>
                </MenuItem>
              </>
            )}

            {userContext.user.role === 2 && (
              <MenuItem
                className={`${
                  checkActiveItem("mh") ? "bg-slate-800 rounded-r-full" : ""
                }`}
                icon={<MdTrendingUp />}
              >
                <NavLink to={"/dashboard/monitor-hospital"}>
                  مراقبة المشفى
                </NavLink>
              </MenuItem>
            )}
            {userContext.user.role === 1 && (
              <MenuItem
                className={`${
                  checkActiveItem("mp") ? "bg-slate-800 rounded-r-full" : ""
                }`}
                icon={<FaUserInjured />}
              >
                <NavLink to={"/dashboard/monitor-patients"}>
                  مراقبة مرضى كورونا
                </NavLink>
              </MenuItem>
            )}
          </Menu>
        </ProSidebar>
        <div className="overflow-y-scroll w-full h-full min-h-screen flex pb-20">
          <Outlet />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 z-20 md:hidden flex justify-around items-center w-full min-w-full h-16 ring-inset ring-2 ring-lightGray/50 shadow-md bg-white overflow-x-scroll">
        {(userContext.user.role === 0 || userContext.user.role === 3) && (
          <>
            <div
              className={`h-full min-w-[70px] w-full ${
                userContext.user.role === 0 ? "mr-28" : ""
              }`}
            >
              <NavLink
                className={({ isActive }) =>
                  `flex flex-col justify-center items-center h-full transition ${
                    isActive
                      ? "text-my-primary border-t-2 border-t-my-primary"
                      : "text-dark"
                  }`
                }
                to={"/dashboard/statistics"}
              >
                <FaRegChartBar className="text-base" />
                <span className="text-[10px]">إحصائيات</span>
              </NavLink>
            </div>
            <div className="h-full min-w-[70px] w-full">
              <NavLink
                className={({ isActive }) =>
                  `flex flex-col justify-center items-center h-full transition ${
                    isActive
                      ? "text-my-primary border-t-2 border-t-my-primary"
                      : "text-dark"
                  }`
                }
                to={"/dashboard/hospitals/public"}
              >
                <RiHospitalFill className="text-base" />
                <span className="text-[10px]">مشافي عامة</span>
              </NavLink>
            </div>
            <div className="h-full min-w-[70px] w-full">
              <NavLink
                className={({ isActive }) =>
                  `flex flex-col justify-center items-center h-full transition ${
                    isActive
                      ? "text-my-primary border-t-2 border-t-my-primary"
                      : "text-dark"
                  }`
                }
                to={"/dashboard/hospitals/private"}
              >
                <RiHospitalFill className="text-base" />
                <span className="text-[10px]">مشافي خاصة</span>
              </NavLink>
            </div>
            <div className="h-full min-w-[70px] w-full">
              <NavLink
                className={({ isActive }) =>
                  `flex flex-col justify-center items-center h-full transition ${
                    isActive
                      ? "text-my-primary border-t-2 border-t-my-primary"
                      : "text-dark"
                  }`
                }
                to={"/dashboard/reports"}
              >
                <MdSummarize className="text-base" />
                <span className="text-[10px]">التقارير</span>
              </NavLink>
            </div>
            <div className="h-full min-w-[70px] w-full">
              <NavLink
                className={({ isActive }) =>
                  `flex flex-col justify-center items-center h-full transition ${
                    isActive
                      ? "text-my-primary border-t-2 border-t-my-primary"
                      : "text-dark"
                  }`
                }
                to={"/dashboard/requests"}
              >
                <MdRequestPage className="text-base" />
                <span className="text-[10px]">طلبات الإنضمام</span>
              </NavLink>
            </div>
          </>
        )}

        {userContext.user.role === 0 && (
          <>
            <div className="h-full min-w-[70px] w-full">
              <NavLink
                className={({ isActive }) =>
                  `flex flex-col justify-center items-center h-full transition ${
                    isActive
                      ? "text-my-primary border-t-2 border-t-my-primary"
                      : "text-dark"
                  }`
                }
                to={"/dashboard/states"}
              >
                <MdFlag className="text-base" />
                <span className="text-[10px]">المحافظات</span>
              </NavLink>
            </div>
            <div className="h-full min-w-[70px] w-full">
              <NavLink
                className={({ isActive }) =>
                  `flex flex-col justify-center items-center h-full transition ${
                    isActive
                      ? "text-my-primary border-t-2 border-t-my-primary"
                      : "text-dark"
                  }`
                }
                to={"/dashboard/state-admins"}
              >
                <MdPerson className="text-base" />
                <span className="text-[10px]">مديريات الصحة</span>
              </NavLink>
            </div>
          </>
        )}
      </div>

      <MyAccount isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Dashboard;
