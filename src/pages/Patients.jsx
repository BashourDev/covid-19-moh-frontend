import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdAdd,
  MdCheck,
  MdClose,
  MdDelete,
  MdEdit,
  MdError,
  MdSearch,
} from "react-icons/md";
import SearchInput from "../components/SearchInput";
import api from "../api/api";
import { toast } from "react-toastify";
import { conf } from "../components/appConfirm";
import moment from "../myMoment";
import ReactPaginate from "react-paginate";
import Loading from "../components/Loading";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getPatients = async (name = "", pageNum = 0) => {
    setIsLoading(true);
    try {
      const res = await api.get(
        `/patients/hospital-patients?searchKey=${name}&pageNum=${pageNum + 1}`
      );
      setPatients(res.data.data);
      setPageCount(Math.ceil(res.data.total / res.data.per_page));
    } catch (error) {
      toast.error("عذرا لا تملك صلاحية");
      navigate(-1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPatients();
  }, []);

  const handleDelete = async (id) => {
    let result = await conf("هل أنت متأكد من حذف المريض؟");

    if (!result) {
      return;
    }

    try {
      await api.delete(`/patients/${id}/delete`);
      toast.success("تم الحذف بنجاح");

      getPatients(searchText);
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
      } else if (error?.response?.status >= 500) {
        toast.error("حدث خطأ");
      }
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      getPatients(searchText);
    }
  };

  const handlePageClick = (event) => {
    getPatients(searchText, event.selected);
  };

  return (
    <div className="w-full py-5">
      <div className="flex flex-col lg:flex-row bg-white w-full px-3 xl:px-40 py-2 justify-between border-y-[0.1px] border-lightGray/50">
        <div className="flex space-x-2">
          <span className="flex items-center text-sm lg:text-base font-bold text-dark ml-7">
            سجلات المرضى
          </span>
          <SearchInput
            onKeyPress={handleKeyPress}
            onChange={setSearchText}
            placeholder={"بحث"}
            Icon={MdSearch}
            className={"lg:mt-2 w-36 lg:w-60"}
          />
        </div>
        <Link
          to={"add"}
          className="transition mt-2 lg:mt-0 h-8 lg:h-11 text-xs lg:text-sm flex justify-center items-center px-3 py-1 lg:py-2 border-4 rounded-full border-my-primary text-my-primary hover:text-white hover:bg-my-primary w-44"
        >
          <MdAdd />
          إضافة مريض
        </Link>
      </div>
      <div className="flex flex-col px-3 lg:px-16">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-y-scroll max-h-[67vh] 2xl:max-h-[70vh]">
              {isLoading ? (
                <Loading />
              ) : (
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        الإسم
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        بحاجة لعناية مشددة
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        توقع الوفاة
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
                        تاريخ الولادة
                      </th>
                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      >
                        رقم الهاتف المحمول
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
                    {patients.map((patient, i) => (
                      <tr
                        key={i}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {patient.name}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {patient.require_icu === null ? (
                            "غير معروف"
                          ) : patient.require_icu === 1 ? (
                            <div className="tooltip" data-tip="بحاجة">
                              <MdCheck className="text-lg text-success" />
                            </div>
                          ) : (
                            <div className="tooltip" data-tip="ليس بحاجة">
                              <MdClose className="text-lg text-error" />
                            </div>
                          )}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {patient.is_gtd === null ? (
                            "غير معروف"
                          ) : patient.require_icu === 1 ? (
                            <div
                              className="tooltip"
                              data-tip="حالة المريض حرجة"
                            >
                              <MdCheck className="text-lg text-success" />
                            </div>
                          ) : (
                            <div
                              className="tooltip"
                              data-tip="حالة المريض ليست حرجة"
                            >
                              <MdClose className="text-lg text-error" />
                            </div>
                          )}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {patient.address}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {patient.birthday}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {patient.mobileNumber}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {patient.patient_analyst.name}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {moment(patient.updated_at).calendar()}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light pr-2 pl-16 lg:px-6 py-3 lg:py-4 whitespace-nowrap flex items-center">
                          <Link
                            to={`/dashboard/monitor-patients/complete/${patient.id}`}
                            className="mx-2 lg:mx-3"
                          >
                            <MdEdit className="text-info text-xl" />
                          </Link>
                          <MdDelete
                            onClick={() => handleDelete(patient.id)}
                            className="text-danger text-xl cursor-pointer mx-2 lg:mx-3"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <ReactPaginate
                className={"flex self-center my-2 text-xs lg:text-sm"}
                pageClassName={"border-2 px-2 py-1 rounded-sm mx-1"}
                activeClassName="text-white border-my-primary bg-my-primary"
                previousClassName="border-2 px-2 py-1 rounded-sm mx-1"
                nextClassName="border-2 px-2 py-1 rounded-sm mx-1"
                breakLabel="..."
                nextLabel="التالي >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< السابق"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
