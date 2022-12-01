import React, { useEffect, useState } from "react";
import { MdAdd, MdCheck, MdError, MdWarning } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import Loading from "../components/Loading";
import moment from "../myMoment";

const options = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [end, setEnd] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [dateError, setDateError] = useState(false);
  const navigate = useNavigate();

  const getReports = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/all-reports?start=${start}&end=${end}`);
      setReports(res.data);
    } catch (error) {
      toast.error("عذرا لا تملك صلاحية");
      navigate(-1);
    }
    setLoading(false);
  };

  const isValidDate = (dateObject) =>
    new Date(dateObject).toString() !== "Invalid Date";

  const handleStartDate = (value) => {
    setDateError(!isValidDate(value));
    setStart(moment(value).format("YYYY-MM-DD"));
  };

  const handleEndDate = (value) => {
    setDateError(!isValidDate(value));
    setEnd(moment(value).format("YYYY-MM-DD"));
  };

  const handleSearch = async () => {
    getReports();
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className="w-full py-5">
      <div className="flex flex-col lg:flex-row bg-white w-full px-3 lg:px-32 py-2 space-x-3 border-y-[0.1px] border-lightGray/50">
        <span className="flex items-center text-sm xl:text-base font-bold text-dark mb-1 lg:mb-0">
          تقارير المشافي
        </span>
        <div className="flex">
          <div className="flex">
            <label
              htmlFor="start"
              className="text-xs xl:text-base text-dark mt-2 mx-1 mr-2 lg:mx-2"
            >
              من:
            </label>
            <input
              type="date"
              name="start"
              id="start"
              className="h-10 w-24 lg:w-36 text-xs xl:text-sm border-lightGray border-[0.5px] rounded-lg text-center"
              value={moment(start).format("YYYY-MM-DD")}
              onChange={(e) => handleStartDate(e.target.value)}
            />
          </div>
          <div className="flex">
            <label
              htmlFor="end"
              className="text-xs xl:text-base text-dark mt-2 mx-1 mr-2 lg:mx-2"
            >
              إلى:
            </label>
            <input
              type="date"
              name="end"
              id="end"
              className="h-10 w-24 lg:w-36 text-xs xl:text-sm border-lightGray border-[0.5px] rounded-lg text-center"
              value={moment(end).format("YYYY-MM-DD")}
              onChange={(e) => handleEndDate(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          disabled={dateError}
          className="transition text-base w-32 mt-2 mx-0 lg:mx-5 lg:mt-0 flex justify-center items-center px-3 border-4 rounded-full border-my-primary text-my-primary hover:text-white hover:bg-my-primary disabled:border-lightGray disabled:text-lightGray disabled:hover:text-white disabled:hover:bg-lightGray"
          onClick={() => handleSearch()}
        >
          بحث
        </button>
        {dateError && (
          <span className="text-lg text-danger self-center mx-3">
            الرجاء التواريخ بشكل صحيح
          </span>
        )}
      </div>
      <div className="flex flex-col px-3 lg:px-16">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full">
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
                        اسم المشفى
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        العنوان
                      </th>
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
                        مُضاف من قِبَل
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 pr-2 pl-16 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        مُضاف في
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, i) => (
                      <tr
                        key={i}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {report.hospital.name}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {report.hospital.location}
                        </td>
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
                        <td className="text-xs lg:text-sm text-gray-900 font-light pr-2 pl-16 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {moment(report.updated_at).calendar()}
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

export default AllReports;
