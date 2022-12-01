import React, { useState } from "react";
import { useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../api/api";
import RequestDetailsModal from "../components/forms/modals/RequestDetailsModal";
import RequestItem from "../components/RequestItem";
import SearchInput from "../components/SearchInput";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedReq, setSelectedReq] = useState({ id: 0 });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      getRequests();
    }
  };

  const getRequests = async () => {
    const res = await api.get(`/hospitals/requests?search=${searchText}`);
    console.log(res);
    setRequests(res.data);
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleShowDetails = (req) => {
    setSelectedReq(req);
    setIsDetailsOpen(true);
  };

  const handleAccept = async (id) => {
    try {
      await api.put(`/hospitals/${id}/accept`);
      setRequests((old) => old.filter((o) => o?.id !== id));
      toast.success("تمت العملية بنجاح");
    } catch (error) {}
  };

  const handleReject = async (id) => {
    try {
      await api.delete(`/hospitals/${id}/delete`);
      setRequests((old) => old.filter((o) => o?.id !== id));
      toast.success("تمت العملية بنجاح");
    } catch (error) {}
  };

  return (
    <div className="w-full py-5">
      <div className="flex flex-col lg:flex-row bg-white w-full px-3 lg:px-32 py-2 gap-x-3 border-y-[0.1px] border-lightGray/50">
        <span className="flex items-center text-sm xl:text-base font-bold text-dark mb-1 lg:mb-0">
          طلبات الإنضمام
        </span>
        <SearchInput
          onKeyPress={handleKeyPress}
          onChange={setSearchText}
          placeholder={"بحث"}
          Icon={MdSearch}
          className={"lg:mt-2 w-48 lg:w-60"}
        />
      </div>
      <div className="w-full py-5 space-y-2">
        {requests.map((request) => (
          <RequestItem
            key={request?.id}
            req={request}
            onShowDetails={handleShowDetails}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))}
      </div>
      <RequestDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        request={selectedReq}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
};

export default Requests;
