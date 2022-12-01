import React, { useEffect, useState } from "react";
import { MdAdd, MdCheck, MdDelete, MdError, MdWarning } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import { conf } from "../components/appConfirm";
import Loading from "../components/Loading";
import moment from "../myMoment";

const HospitalReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getReports = async () => {
    setLoading(true);
    try {
      const res = await api.get("/hospital-reports");
      setReports(res.data);
    } catch (error) {
      toast.error("عذرا لا تملك صلاحية");
      navigate(-1);
    }
    setLoading(false);
  };

  useEffect(() => {
    getReports();
  }, []);

  const handleDelete = async (id) => {
    let result = await conf("هل أنت متأكد من حذف التقرير؟");

    if (!result) {
      return;
    }

    try {
      await api.delete(`/hospital-reports/delete/${id}`);
      toast.success("تم الحذف بنجاح");
      getReports();
    } catch (error) {
      toast.error("حدث خطأ");
    }
  };

  return (
    <div className="w-full py-5">
      <div className="flex bg-white w-full px-3 xl:px-40 py-2 justify-evenly lg:justify-between border-y-[0.1px] border-lightGray/50">
        <span className="flex items-center text-sm lg:text-base font-bold text-dark">
          تقارير المشفى
        </span>
        <Link
          to={"/dashboard/monitor-hospital/add"}
          className="transition h-8 lg:h-11 text-xs lg:text-sm flex justify-center items-center ml-5 lg:ml-0 px-3 py-1 lg:py-2 border-4 rounded-full border-my-primary text-my-primary hover:text-white hover:bg-my-primary w-32 lg:w-44"
        >
          <MdAdd />
          إضافة تقرير
        </Link>
      </div>
      <div className="flex flex-col px-3 lg:px-16">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-y-scroll max-h-[67vh] 2xl:max-h-[70vh]">
              {loading ? (
                <Loading />
              ) : (
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        الأسرة المتوفرة للقبول الإسعافي
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        الأسرة المشغولة في القبول الإسعافي
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        الأسرة المتوفرة للعناية
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        الأسرة المشغولة في العناية
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        أجهزة التنفس الآلي المتوفرة
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        أجهزة التنفس الآلي المشغولة
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        الحالة
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        مضُاف من قِبَل
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        آخر تحديث
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, i) => (
                      <tr
                        key={i}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {report.emergencyBeds}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {report.emergencyReservedBeds}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {report.intensiveCareBeds}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {report.intensiveCareReservedBeds}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {report.ventilators}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {report.reservedVentilators}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {report.status ? (
                            <div
                              className="tooltip"
                              data-tip="البيانات مطابقة لمرضى المشفى"
                            >
                              <MdCheck className="text-success text-lg" />
                            </div>
                          ) : (
                            <div
                              className="tooltip"
                              data-tip="البيانات غير مطابقة لمرضى المشفى"
                            >
                              <MdWarning className="text-yellow-500 text-lg" />
                            </div>
                          )}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {report.hospital_analyst.name}
                        </td>

                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {moment(report.updated_at).calendar()}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light pr-2 pl-16 lg:px-6 py-3 lg:py-4 whitespace-nowrap flex items-center">
                          <MdDelete
                            onClick={() => handleDelete(report.id)}
                            className="text-danger text-xl cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalReports;
