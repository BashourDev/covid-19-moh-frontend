import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "../api/api";
import AppButton from "./AppButton";
import AppModal from "./AppModal";

const HospitalUsers = ({ isOpen, setIsOpen, hid }) => {
  const [users, setUsers] = useState({});
  const [isPAPasswordVisible, setIsPAPasswordVisible] = useState(false);
  const [isHAPasswordVisible, setIsHAPasswordVisible] = useState(false);

  // ● •

  const getUsers = async () => {
    try {
      const res = await api.get(`/hospitals/${hid}/users`);
      setUsers(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (hid !== 0 && isOpen) {
      setIsPAPasswordVisible(false);
      setIsHAPasswordVisible(false);
      getUsers();
    }
  }, [hid]);

  return (
    <AppModal isOpen={isOpen} onClose={setIsOpen} title={"موظفي المشفى"}>
      <div className="text-dark mt-4 font-droid-kufi">
        <h3 className="mb-2 text-sm font-semibold">
          الموظف المسئول عن التقارير:
        </h3>
        <div className="flex">
          <label className="ml-2 text-sm font-medium">اسم المستخدم:</label>
          <span className="text-sm">{users?.hospital_analyst?.username}</span>
        </div>
        <div className="flex">
          <label className="ml-2 text-sm font-medium">كلمة المرور:</label>
          <span className="text-sm ml-2">
            {isHAPasswordVisible
              ? users?.hospital_analyst?.plainPassword
              : "•".repeat(users?.hospital_analyst?.plainPassword.length)}
          </span>
          {isHAPasswordVisible ? (
            <AiOutlineEye
              className="w-5 h-5"
              onClick={() => setIsHAPasswordVisible(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="w-5 h-5"
              onClick={() => setIsHAPasswordVisible(true)}
            />
          )}
        </div>
        <h3 className="mt-4 mb-2 text-sm font-semibold">
          الموظف المسئول عن المرضى:
        </h3>
        <div className="flex">
          <label className="ml-2 text-sm font-medium">اسم المستخدم:</label>
          <span className="text-sm">{users?.patient_analyst?.username}</span>
        </div>
        <div className="flex">
          <label className="ml-2 text-sm font-medium">كلمة المرور:</label>
          <span className="text-sm ml-2">
            {isPAPasswordVisible
              ? users?.patient_analyst?.plainPassword
              : "•".repeat(users?.patient_analyst?.plainPassword.length)}
          </span>
          {isPAPasswordVisible ? (
            <AiOutlineEye
              className="w-5 h-5"
              onClick={() => setIsPAPasswordVisible(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="w-5 h-5"
              onClick={() => setIsPAPasswordVisible(true)}
            />
          )}
        </div>
        <div className="flex mt-4 mb-1">
          <AppButton
            onClick={() => setIsOpen(false)}
            className={
              "border-light mt-0 mb-0 text-sky-700 bg-sky-light hover:bg-sky-100 hover:text-sky-700 disabled:text-light disabled:bg-lightGray disabled:hover:bg-light disabled:hover:text-lightGray w-36 border-4"
            }
          >
            {"إغلاق"}
          </AppButton>
        </div>
      </div>
    </AppModal>
  );
};

export default HospitalUsers;
