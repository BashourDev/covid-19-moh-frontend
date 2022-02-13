import React from "react";
import * as Yup from "yup";
import AppCheckBox from "../AppCheckBox";
import AppForm from "../AppForm";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const FifthStepPatientForm = () => {
  return (
    <div className="space-y-3 overflow-y-scroll pb-32">
      <AppForm
        initialValues={{ gender: 0 }}
        validationSchema={Yup.object().shape({})}
      >
        <div className="grid">
          <AppInput
            id={"deathDateTime"}
            placeholder={"تاريخ العودة للعمل أو الحياة الاعتيادية"}
            label={"تاريخ العودة للعمل أو الحياة الاعتيادية:"}
            containerClassName="grow"
            disabledValue={"death"}
          />
        </div>

        <div className="grid grid-cols-5">
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

        <div className="grid grid-cols-3 gap-10">
          <AppSubmitButton
            className={"border-dark text-dark hover:bg-dark hover:text-white"}
          >
            إلغاء
          </AppSubmitButton>
          <AppSubmitButton>إضافة</AppSubmitButton>
          <AppSubmitButton>إضافة و الذهاب للخطوة التالية</AppSubmitButton>
        </div>
      </AppForm>
    </div>
  );
};

export default FifthStepPatientForm;
