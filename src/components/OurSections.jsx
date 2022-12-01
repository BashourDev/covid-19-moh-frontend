import React from "react";
import { useTranslation } from "react-i18next";
import HospitalsCarousel from "./HospitalsCarousel";
import SectionItem from "./SectionItem";

const OurSections = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-dark-blue flex flex-col items-center py-20">
      <div className="w-full relative min-h-[30rem] max-w-7xl">
        <div
          id="hospitals"
          className="w-full absolute -top-[30%] md:-top-[40%] lg:-top-[60%]"
        >
          <HospitalsCarousel
            title={"المشافي"}
            subtitle={"تفقد بعض المشافي التي تعمل معنا"}
          />
        </div>
        <div id="services" className="pt-64 grid grid-cols-1 md:grid-cols-2">
          <SectionItem
            number={"1"}
            title={"خدمة إدارة التقارير"}
            description={
              "يمكن للمشافي إنشاء التقارير بسهولة وكفاءة في أي وقت كان لتمكين مديريات الصحة من الإطلاع على هذه التقارير في أي وقت"
            }
          />

          <SectionItem
            number={"2"}
            title={"خدمة إدارة المرضى"}
            description={
              "يمكن للمشافي إدارة المرضى من خلال السجلات الخاصة بالمرضى ومتابعة حالات المرضى وهذا يساعد أيضاً على إنشاء التقارير بشكل فعال"
            }
          />

          <SectionItem
            number={"3"}
            title={"خدمة تصنيف المرضى الذين بحاجة لعناية مركزة"}
            description={
              "يقوم النظام بتصنيف المرضى الذين بحاجة لعناية مركزة بناءً على حالتهم الصحية وتاريخهم الطبي المدخل من قبل موظف المشفى المسؤول عن إدارة المرضى"
            }
          />

          <SectionItem
            number={"4"}
            title={"خدمة تصنيف المرضى الذين بحالة حرجة"}
            description={
              "يقوم النظام بتصنيف المرضى الذين بحالة حرجة بناءً على حالتهم الصحية وتاريخهم الطبي المدخل من قبل موظف المشفى المسؤول عن إدارة المرضى"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default OurSections;
