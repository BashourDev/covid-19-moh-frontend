import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Hospitals = () => {
  const [type, setType] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard/hospitals/public") {
      setType("العامة");
    } else {
      setType("الخاصة");
    }
  }, [location]);

  return (
    <div className="w-full py-5">
      <div className="flex bg-white w-full px-32 xl:px-40 py-2 justify-between">
        <span className="flex items-center text-xl font-bold text-dark">
          المشافي {type}
        </span>
        <Link
          to={"/dashboard/hospitals/add"}
          className="transition text-xl flex justify-center items-center px-3 py-2 border-4 rounded-full border-primary text-primary hover:text-white hover:bg-primary w-44"
        >
          <MdAdd />
          إضافة مشفى
        </Link>
      </div>
      <div className="flex flex-col px-16">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                    >
                      الإسم
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                    >
                      النوع
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                    >
                      العنوان
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                    >
                      الأسرة المتاحة للقبول الإسعافي
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                    >
                      الأسرة المتاحة للعناية
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                    >
                      أجهزة التنفس الآلي المتاحة
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      1
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Mark
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Otto
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      @mdo
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      @mdo
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      @mdo
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      @mdo
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      actions
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
