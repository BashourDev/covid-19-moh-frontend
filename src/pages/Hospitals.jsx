import React, { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdSearch } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import SearchInput from "../components/SearchInput";
import api from "../api/api";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { conf } from "../components/appConfirm";
import moment from "../myMoment";
import ReactPaginate from "react-paginate";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const getHospitals = async (name = "", hType, pageNum = 0) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/api/hospitals/${hType}?name=${name}&pageNum=${pageNum + 1}`
      );
      console.log(res);
      setHospitals(res.data.data);
      setPageCount(Math.ceil(res.data.total / res.data.per_page));
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
        navigate(-1);
      } else {
        toast.error("عذرا حدث خطأ");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (location.pathname === "/dashboard/hospitals/public") {
      setType("العامة");
      getHospitals("", "public");
    } else {
      setType("الخاصة");
      getHospitals("", "private");
    }
  }, [location]);

  const handleDelete = async (id) => {
    let result = await conf("هل أنت متأكد من حذف المشفى؟");

    if (!result) {
      return;
    }

    try {
      await api.delete(`/api/hospitals/${id}/delete`);
      toast.success("تم الحذف بنجاح");

      if (location.pathname === "/dashboard/hospitals/public") {
        getHospitals("", "public");
      } else {
        getHospitals("", "private");
      }
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
      } else {
        toast.error("حدث خطأ");
      }
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (location.pathname === "/dashboard/hospitals/public") {
        getHospitals(searchText, "public");
      } else {
        getHospitals(searchText, "private");
      }
    }
  };

  const handlePageClick = (event) => {
    if (location.pathname === "/dashboard/hospitals/public") {
      getHospitals(searchText, "public", event.selected);
    } else {
      getHospitals(searchText, "private", event.selected);
    }
  };

  return (
    <div className="w-full py-5">
      <div className="flex bg-white w-full px-32 xl:px-40 py-2 justify-between border-y-[0.1px] border-lightGray/50">
        <div className="flex space-x-2">
          <span className="flex items-center text-xl font-bold text-dark ml-7">
            المشافي {type}
          </span>
          <SearchInput
            onKeyPress={handleKeyPress}
            onChange={setSearchText}
            placeholder={"بحث"}
            Icon={MdSearch}
            className={"mt-1"}
          />
        </div>
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
            <div className="overflow-y-scroll max-h-[67vh] 2xl:max-h-[70vh]">
              {loading ? (
                <Loading />
              ) : (
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-base font-semibold text-gray-900 px-6 py-4 text-right"
                      >
                        الإسم
                      </th>
                      <th
                        scope="col"
                        className="text-base font-semibold text-gray-900 px-6 py-4 text-right"
                      >
                        العنوان
                      </th>
                      <th
                        scope="col"
                        className="text-base font-semibold text-gray-900 px-6 py-4 text-right"
                      >
                        الأسرة المتاحة للقبول الإسعافي
                      </th>
                      <th
                        scope="col"
                        className="text-base font-semibold text-gray-900 px-6 py-4 text-right"
                      >
                        الأسرة المتاحة للعناية
                      </th>
                      <th
                        scope="col"
                        className="text-base font-semibold text-gray-900 px-6 py-4 text-right"
                      >
                        أجهزة التنفس الآلي المتاحة
                      </th>
                      <th
                        scope="col"
                        className="text-base font-semibold text-gray-900 px-6 py-4 text-right"
                      >
                        آخر تحديث
                      </th>
                      <th
                        scope="col"
                        className="text-base font-semibold text-gray-900 px-6 py-4 text-right"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitals.map((hospital, i) => (
                      <tr
                        key={i}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {hospital.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {hospital.location}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {hospital.emergencyReservedBeds
                            ? parseInt(hospital.emergencyBeds) -
                              parseInt(hospital.emergencyReservedBeds)
                            : hospital.emergencyBeds}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {hospital.intensiveCareReservedBeds
                            ? parseInt(hospital.intensiveCareBeds) -
                              parseInt(hospital.intensiveCareReservedBeds)
                            : hospital.intensiveCareBeds}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {hospital.reservedVentilators
                            ? parseInt(hospital.ventilators) -
                              parseInt(hospital.reservedVentilators)
                            : hospital.ventilators}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {moment(hospital.updated_at).calendar()}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex items-center">
                          <Link
                            to={`/dashboard/hospitals/edit/${hospital.id}`}
                            className="mx-3"
                          >
                            <MdEdit className="text-info text-xl" />
                          </Link>
                          <MdDelete
                            onClick={() => handleDelete(hospital.id)}
                            className="text-danger text-xl cursor-pointer mx-3"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <ReactPaginate
                className={"flex self-center my-2"}
                pageClassName={"border-2 px-2 py-1 rounded-sm mx-1"}
                activeClassName="text-white border-primary bg-primary"
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

export default Hospitals;
