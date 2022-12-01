import React, { useState } from "react";
import { useEffect } from "react";
import { MdAdd, MdDelete, MdEdit, MdPerson, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import api from "../api/api";
import Loading from "../components/Loading";
import SearchInput from "../components/SearchInput";
import swal from "sweetalert";
import CreateProvincialAdminModal from "../components/forms/modals/CreateProvincialAdminModal";
import EditProvincialAdminModal from "../components/forms/modals/EditProvincialAdminModal";

const ProvincialAdmins = () => {
  const [searchText, setSearchText] = useState("");
  const [provAdmins, setProvAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProvAdmin, setSelectedProvAdmin] = useState({ id: 0 });

  const getProvAdmins = async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`/provincial-admins?name=${searchText}`);
      setProvAdmins(res.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      getProvAdmins();
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
        await api.delete(`/provincial-admins/${id}/delete`);
        setProvAdmins((old) => old.filter((o) => o.id !== id));
        swal("تمت العملية بنجاح", {
          icon: "success",
        });
      } else {
        swal("لم يطرأ أي تغيير");
      }
    });
  };

  const handleEdit = (provAdmin) => {
    setSelectedProvAdmin(provAdmin);
    setIsEditOpen(true);
  };

  useEffect(() => {
    getProvAdmins();
  }, []);

  return (
    <div className="w-full py-5">
      <div className="flex flex-col lg:flex-row bg-white w-full px-3 lg:px-40 py-2 justify-between border-y-[0.1px] border-lightGray/50">
        <div className="flex space-x-2">
          <span className="flex items-center text-sm lg:text-base font-bold text-dark ml-7">
            مديريات الصحة
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
          إضافة مديرية صحة
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
                        المحافظة / الولاية
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
                    {provAdmins.map((proAdmin, i) => (
                      <tr
                        key={i}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {proAdmin.name}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {proAdmin?.province?.name}
                        </td>
                        <td className="text-xs lg:text-sm text-gray-900 font-light px-2 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {proAdmin.hospitals_count}
                        </td>

                        <td className="text-xs lg:text-sm text-gray-900 font-light pr-2 pl-16 lg:px-6 py-3 lg:py-4 whitespace-nowrap flex items-center">
                          {/* <MdPerson
                            onClick={() => showInfo(proAdmin.id)}
                            className="text-my-primary text-lg lg:text-xl cursor-pointer mx-2 lg:mx-3"
                          /> */}
                          <button
                            onClick={() => handleEdit(proAdmin)}
                            className="mx-2 lg:mx-3"
                          >
                            <MdEdit className="text-info text-lg lg:text-xl" />
                          </button>
                          <MdDelete
                            onClick={() => handleDelete(proAdmin.id)}
                            className="text-danger text-lg lg:text-xl cursor-pointer mx-2 lg:mx-3"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {/* <ReactPaginate
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
              /> */}
            </div>
          </div>
        </div>
      </div>
      <CreateProvincialAdminModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        setProvincialAdmins={setProvAdmins}
      />
      <EditProvincialAdminModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        selectedProvAdmin={selectedProvAdmin}
        setProvincialAdmins={setProvAdmins}
      />
    </div>
  );
};

export default ProvincialAdmins;
