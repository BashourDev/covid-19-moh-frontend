import React from "react";
import { MdLocationOn } from "react-icons/md";
import AppButton from "./AppButton";

const RequestItem = ({ req, onShowDetails, onAccept, onReject }) => {
  return (
    <div className="flex flex-col h-36 w-full bg-white px-2 py-3 shadow-sm max-w-3xl mx-auto">
      <div className="flex">
        <div className="min-h-[4rem] min-w-[4rem] max-h-[4rem] max-w-[4rem] rounded-full bg-light-gray/70">
          <img src={req?.profile_picture?.original_url} alt="profile pic" />
        </div>
        <div className="w-full flex flex-col justify-between p-2">
          <h4 className="text-base text-dark font-medium">{req?.name}</h4>
          <span className="flex text-sm text-dark/60">
            <MdLocationOn className="mt-0.5" /> {req?.province?.name},{" "}
            {req?.location}
          </span>
        </div>
      </div>
      <div className="flex gap-x-5 px-20">
        <AppButton
          className="mt-2 w-3/4 self-center bg-success hover:bg-success/95 text-white"
          onClick={() => onAccept(req?.id)}
        >
          قبول
        </AppButton>
        <AppButton
          className="mt-2 w-3/4 self-center bg-error hover:bg-error/95 text-white"
          onClick={() => onReject(req?.id)}
        >
          رفض
        </AppButton>
        <AppButton
          className="mt-2 w-3/4 self-center bg-gray-400 hover:bg-gray-400/95 text-white"
          onClick={() => onShowDetails(req)}
        >
          تفاصيل
        </AppButton>
      </div>
    </div>
  );
};

export default RequestItem;
