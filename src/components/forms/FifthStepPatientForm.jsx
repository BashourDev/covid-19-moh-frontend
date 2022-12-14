import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../api/api";
import WindowContext from "../../contexts/windowContext";
import AppButton from "../AppButton";
import AppCheckBox from "../AppCheckBox";
import AppForm from "../AppForm";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const FifthStepPatientForm = ({ initialValues, setPatient, setStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const windowContext = useContext(WindowContext);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await api.put(
        `/patients/fifth-step/${initialValues.id}`,
        values
      );
      setPatient({ ...initialValues, ...res.data });
      toast.success("تمت العملية بنجاح");
      setStep(initialValues.step);
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
      } else if (error?.response?.status >= 500) {
        toast.error("عذرا حدث خطأ");
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (initialValues.death === true) {
      toast.info("هذا المريض متوفي ... لا يمكن استكمال ملفه");
      setStep(4);
    }
  }, [initialValues]);

  return (
    <div className="space-y-3 pb-32">
      <AppForm
        initialValues={initialValues}
        validationSchema={Yup.object().shape({})}
        onSubmit={(values) => handleSubmit(values)}
      >
        <div className="grid">
          <AppInput
            id={"returnToWorkOrNormalLife"}
            placeholder={"تاريخ العودة للعمل أو الحياة الاعتيادية"}
            label={"تاريخ العودة للعمل أو الحياة الاعتيادية:"}
            type={"date"}
            containerClassName="grow"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5">
          <AppCheckBox id={"dyspnea"} name={"dyspnea"} text={"زلة نفسية"} />
          <AppCheckBox
            id={"laborOnLightOrMediumEfforts"}
            name={"laborOnLightOrMediumEfforts"}
            text={"تعب على الجهود الخفيفة إلى المتوسطة"}
          />
        </div>
        <div className="grid">
          <AppInput
            id={"otherDemonstrations"}
            placeholder={"تظاهرات أخرى"}
            label={"تظاهرات أحرى:"}
            containerClassName="grow"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 justify-between w-11/12">
          <AppButton
            type="button"
            onClick={() => navigate(-1)}
            className={"border-dark text-dark hover:bg-dark hover:text-white"}
          >
            إلغاء
          </AppButton>
          {windowContext.width >= 1024 && <span></span>}
          <AppSubmitButton
            disabled={initialValues.id === undefined}
            isLoading={isLoading}
            onCustomClick={() => navigate("/dashboard/monitor-patients")}
          >
            إضافة
          </AppSubmitButton>
          {/* <AppSubmitButton
            disabled={initialValues.id === undefined}
            isLoading={isLoading}
          >
            إضافة و الذهاب للخطوة التالية
          </AppSubmitButton> */}
        </div>
      </AppForm>
    </div>
  );
};

export default FifthStepPatientForm;
