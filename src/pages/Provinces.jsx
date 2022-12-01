import React, { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import api from "../api/api";
import CreateProvinceModal from "../components/forms/modals/CreateProvinceModal";
import EditProvinceModal from "../components/forms/modals/EditProvinceModal";
import Loading from "../components/Loading";
import SearchInput from "../components/SearchInput";
import swal from "sweetalert";

const Provinces = () => {
  const [searchText, setSearchText] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState({ id: 0 });

  const getProvinces = async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`/provinces?name=${searchText}`);
      setProvinces(res.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      getProvinces();
    }
  };
  const handleDelete = async (id) => {
    swal({
      title: "هل أنت متأكد؟",
      text: "لا يمكن استرجاع البيانات بعد الحذف",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await api.delete(`/provinces/${id}/delete`);
        setProvinces((old) => old.filter((o) => o.id !== id));
        swal("تمت العملية بنجاح", {
          icon: "success",
        });
      } else {
        swal("لم يطرأ أي تغيير");
      }
    });
  };

  const handleEdit = async (province) => {
    setSelectedProvince(province);
    setIsEditOpen(true);
  };

  useEffect(() => {
    getProvinces();
  }, []);

  return (
    <div className="w-full py-5">
      <div className="flex flex-col lg:flex-row bg-white w-full px-3 lg:px-40 py-2 justify-between border-y-[0.1px] border-lightGray/50">
        <div className="flex space-x-2">
          <span className="flex items-center text-sm lg:text-base font-bold text-dark ml-7">
            المحافظات / الولايات
          </span>
          <SearchInput
            onKeyPress={handleKeyPress}
            onChange={setSearchText}
            placeholder={"بحث"}
            Icon={MdSearch}
            className={"lg:mt-2 w-48 lg:w-60"}
          />
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="transition mt-2 lg:mt-0 h-8 lg:h-11 text-xs lg:text-sm flex justify-center items-center px-3 py-1 lg:py-2 border-4 rounded-full border-my-primary text-my-primary hover:text-white hover:bg-my-primary w-36 lg:w-44"
        >
          <MdAdd />
          إضافة محافظة
        </button>
      </div>
      <div className="flex flex-col px-3 lg:px-16">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full">
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
                        عدد المشافي
                      </th>

                      <th
                        scope="col"
                        className="text-xs lg:text-sm font-semibold text-gray-900 px-2 lg:px-6 py-3 lg:py-4 text-right"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {provinces.map((province, i) => (
                      <tr
                        key={i}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {province.name}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {province.hospitals_count}
                        </td>

                        <td className="text-xs lg:text-sm text-gray-900 font-light pr-2 pl-16 lg:px-6 py-3 lg:py-4 whitespace-nowrap flex items-center">
                          <button
                            onClick={() => handleEdit(province)}
                            className="mx-2 lg:mx-3"
                          >
                            <MdEdit className="text-info text-lg lg:text-xl" />
                          </button>
                          <MdDelete
                            onClick={() => handleDelete(province.id)}
                            className="text-danger text-lg lg:text-xl cursor-pointer mx-2 lg:mx-3"
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
      <CreateProvinceModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        setProvinces={setProvinces}
      />
      <EditProvinceModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        province={selectedProvince}
        setProvinces={setProvinces}
      />
    </div>
  );
};

export default Provinces;
