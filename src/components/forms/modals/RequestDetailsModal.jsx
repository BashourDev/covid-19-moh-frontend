import React from "react";
import AppButton from "../../AppButton";
import AppModal from "../../AppModal";

const RequestDetailsModal = ({
  isOpen,
  onClose,
  request,
  onAccept,
  onReject,
}) => {
  return (
    <AppModal isOpen={isOpen} onClose={onClose} title={"تفاصيل الطلب"}>
      <div className="space-y-4 py-4">
        <div className="flex space-x-2">
          <label className="text-dark-blue text-base font-medium">
            نوع المشفى:
          </label>
          <span className="text-dark">
            {request?.type === 0 ? "عام" : "خاص"}
          </span>
        </div>

        <div className="flex space-x-2">
          <label className="text-dark-blue text-base font-medium">الاسم:</label>
          <span className="text-dark">{request?.name}</span>
        </div>

        <div className="flex space-x-2">
          <label className="text-dark-blue text-base font-medium">
            المحافظة:
          </label>
          <span className="text-dark">{request?.province?.name}</span>
        </div>

        <div className="flex space-x-2">
          <label className="text-dark-blue text-base font-medium">
            العنوان:
          </label>
          <span className="text-dark">{request?.location}</span>
        </div>

        <div className="flex space-x-2">
          <label className="text-dark-blue text-base font-medium">
            عدد أسرة القبول الإسعافي:
          </label>
          <span className="text-dark">{request?.emergencyBeds}</span>
        </div>

        <div className="flex space-x-2">
          <label className="text-dark-blue text-base font-medium">
            عدد أسرة العناة المركزة:
          </label>
          <span className="text-dark">{request?.intensiveCareBeds}</span>
        </div>

        <div className="flex space-x-2">
          <label className="text-dark-blue text-base font-medium">
            عدد أجهزو التنفس الآلي
          </label>
          <span className="text-dark">{request?.ventilators}</span>
        </div>

        <div className="rounded-md ring-2 ring-dark-blue p-3 space-y-3">
          <h1 className="font-semibold">موظف إحصائيات المشفى:</h1>
          <div className="flex space-x-2">
            <label className="text-dark-blue text-base font-medium">
              الاسم:
            </label>
            <span className="text-dark">{request?.hospital_analyst?.name}</span>
          </div>
          <div className="flex space-x-2">
            <label className="text-dark-blue text-base font-medium">
              اسم المستخدم:
            </label>
            <span className="text-dark">
              {request?.hospital_analyst?.username}
            </span>
          </div>
        </div>

        <div className="rounded-md ring-2 ring-dark-blue p-3 space-y-3">
          <h1 className="font-semibold">موظف إحصائيات المرضى:</h1>
          <div className="flex space-x-2">
            <label className="text-dark-blue text-base font-medium">
              الاسم:
            </label>
            <span className="text-dark">{request?.patient_analyst?.name}</span>
          </div>
          <div className="flex space-x-2">
            <label className="text-dark-blue text-base font-medium">
              اسم المستخدم:
            </label>
            <span className="text-dark">
              {request?.patient_analyst?.username}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-x-3 w-full">
        <AppButton
          className="w-full bg-success hover:bg-success/95 text-white"
          onClick={() => onAccept(request?.id)}
        >
          قبول
        </AppButton>
        <AppButton
          className="w-full bg-error hover:bg-error/95 text-white"
          onClick={() => onReject(request?.id)}
        >
          رفض
        </AppButton>
        <AppButton
          className="w-full bg-gray-400  hover:bg-gray-400/95 text-white"
          onClick={() => onClose()}
        >
          إغلاق
        </AppButton>
      </div>
    </AppModal>
  );
};

export default RequestDetailsModal;
