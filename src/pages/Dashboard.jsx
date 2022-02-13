import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { MdTrendingUp, MdOutlineCoronavirus } from "react-icons/md";
import { RiHospitalFill } from "react-icons/ri";
import { FaUserInjured, FaRegChartBar } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";

const Dashboard = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  return (
    <div dir="rtl" className="flex flex-col h-screen bg-light">
      <div className="px-6 py-4 bg-sky-700 shadow-md flex items-center gap-5">
        <MdOutlineCoronavirus className="text-light w-8 h-8" />
        <h1 className="text-2xl text-light font-semibold">
          نظام إبلاغ المشافي عن مرضى كورونا
        </h1>
      </div>
      <div className="flex h-full">
        <ProSidebar rtl collapsed={sideBarCollapsed}>
          <Menu iconShape="circle">
            <MenuItem
              icon={<AiOutlineMenu />}
              onClick={() => setSideBarCollapsed(!sideBarCollapsed)}
            ></MenuItem>
            <MenuItem icon={<FaRegChartBar />}>
              <NavLink to={"/dashboard/statistics"}>إحصائيات</NavLink>
            </MenuItem>
            <SubMenu title="المشافي" icon={<RiHospitalFill />}>
              <MenuItem>
                <NavLink to={"/dashboard/hospitals/public"}>عامة</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to={"/dashboard/hospitals/private"}>خاصة</NavLink>
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<MdTrendingUp />}>
              <NavLink to={"/dashboard/monitor-hospitals"}>
                مراقبة المشافي
              </NavLink>
            </MenuItem>
            <MenuItem icon={<FaUserInjured />}>
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
