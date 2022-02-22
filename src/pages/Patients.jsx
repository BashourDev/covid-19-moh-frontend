import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAdd, MdDelete, MdEdit, MdSearch } from "react-icons/md";
import SearchInput from "../components/SearchInput";
import api from "../api/api";
import { toast } from "react-toastify";
import { conf } from "../components/appConfirm";
import moment from "../myMoment";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const getPatients = async (name = "") => {
    try {
      const res = await api.get(
        `/api/patients/hospital-patients?searchKey=${name}`
      );
      setPatients(res.data);
    } catch (error) {
      toast.error("عذرا لا تملك صلاحية");
      navigate(-1);
    }
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
      await api.delete(`/api/patients/${id}/delete`);
      toast.success("تم الحذف بنجاح");

      getPatients(searchText);
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
      getPatients(searchText);
    }
  };

  return (
    <div className="w-full py-5">
      <div className="flex bg-white w-full px-32 xl:px-40 py-2 justify-between border-y-[0.1px] border-lightGray/50">
        <div className="flex space-x-2">
          <span className="flex items-center text-xl font-bold text-dark ml-7">
            سجلات المرضى
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
          to={"add"}
          className="transition text-xl flex justify-center items-center px-3 py-2 border-4 rounded-full border-primary text-primary hover:text-white hover:bg-primary w-44"
        >
          <MdAdd />
          إضافة مريض
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
                      تاريخ الولادة
                    </th>
                    <th
                      scope="col"
                      className="text-base font-semibold text-gray-900 px-6 py-4 text-right"
                    >
                      رقم الهاتف المحمول
                    </th>
                    <th
                      scope="col"
                      className="text-base font-semibold text-gray-900 px-6 py-4 text-right"
                    >
                      مضُاف من قِبَل
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
                  {patients.map((patient, i) => (
                    <tr
                      key={i}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {patient.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {patient.address}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {patient.birthday}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {patient.mobileNumber}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {patient.patient_analyst.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {moment(patient.updated_at).calendar()}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex">
                        <Link
                          to={`/dashboard/monitor-patients/complete/${patient.id}`}
                          className="mx-3"
                        >
                          <MdEdit className="text-info text-xl" />
                        </Link>
                        <MdDelete
                          onClick={() => handleDelete(patient.id)}
                          className="text-danger text-xl cursor-pointer mx-3"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
