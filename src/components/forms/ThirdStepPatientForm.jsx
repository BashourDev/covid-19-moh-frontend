import React from "react";
import * as Yup from "yup";
import AppCheckBox from "../AppCheckBox";
import AppForm from "../AppForm";
import AppFormRadioButton from "../AppFormRadioButton";
import AppInput from "../AppInput";
import AppSubmitButton from "../AppSubmitButton";

const ThirdStepPatientForm = () => {
  return (
    <div className="space-y-3">
      <AppForm
        initialValues={{ gender: 0 }}
        validationSchema={Yup.object().shape({})}
      >
        <div className="grid grid-cols-5">
          <AppInput
            id={"treatmentCourse"}
            placeholder={"الكورس العلاجي المعتمد"}
            label={"الكورس العلاجي المعتمد:"}
            containerClassName="grow col-span-2"
          />
          <AppCheckBox
            id={"givenAntivirus"}
            name={"givenAntivirus"}
            text={"هل اعطي أنتي فيروس"}
          />
          <AppInput
            id={"givenAntivirusType"}
            placeholder={"ما هو طريق إدخال الأنتي فيروس"}
            label={"ما هو طريق إدخال الأنتي فيروس"}
            containerClassName="grow col-span-2"
            disabledValue={"givenAntivirus"}
          />
        </div>

        <div className="grid grid-cols-5">
          <div className="flex justify-start items-center mt-6 grow">
            <span className="mx-2 text-lg my-2">نتيجة المسحة:</span>
            <div
              role="group"
              className="flex text-lg items-center justify-center"
            >
              <AppFormRadioButton
                id={"positive"}
                name={"pcrResult"}
                value={true}
                text={"إيجابي"}
              />
              <AppFormRadioButton
                id={"negative"}
                name={"pcrResult"}
                value={false}
                text={"سلبي"}
              />
            </div>
          </div>
          <AppCheckBox
            id={"requiredVentilation"}
            name={"requiredVentilation"}
            text={"هل إحتاج إلى دعم تنفسي"}
          />
          <AppInput
            id={"ventilationDuration"}
            placeholder={"في حال التنبيب ما هي مدة الوضع على المنفسة"}
            label={"ما هي مدة الوضع على المنفسة:"}
            containerClassName="grow col-span-3"
            disabledValue={"requiredVentilation"}
          />
        </div>
        <div className="grid grid-cols-5">
          <span className="text-lg flex items-center mt-6">
            التطور في المشفى:
          </span>
          <AppCheckBox
            id={"clinicalImprovement"}
            name={"clinicalImprovement"}
            text={"تحسن في الحالة السريرية"}
          />
          <AppInput
            id={"daysOfFever"}
            placeholder={"عدد أيام الترفع الحروري"}
            label={"عدد أيام الترفع الحروري:"}
            containerClassName="grow col-span-3"
          />
        </div>
        <div className="grid">
          <AppInput
            id={"mixing"}
            placeholder={"إذكر الإختلاطات"}
            label={"إختلاطات:"}
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

export default ThirdStepPatientForm;
