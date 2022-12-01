import React from "react";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import AboutUsHero from "../components/heros/AboutUsHero";
import Welcome2 from "../components/heros/Welcome2";
import OurSections from "../components/OurSections";

const Home = () => {
  return (
    <div className="space-y-5">
      <div className="w-full h-full bg-doctor bg-[#001724] bg-blend-overlay bg-no-repeat">
        <Header />
        <Welcome2 />
      </div>
      <div id="about-us" className="w-full flex justify-center py-10">
        <AboutUsHero
          title={"من نحن"}
          subtitle={"تعلم المزيد عن من نحن وما هي مهمتنا"}
          description={
            "الموقع الرئيسي لإدارة ومراقبة الأمراض الوبائية في المشافي بحيث نقوم بتوفير مكان مركزي للمشافي للتسجيل والبدء بتسجيل الحالات و إعداد التقارير بشكل سهل وفعال دون الحاجة إلى القيام بالعملية بشكل يدوي"
          }
        />
      </div>
      <div className="w-full flex justify-center pt-40 lg:pt-56 pb-10">
        <OurSections />
      </div>
      <div id="goals" className="w-full flex justify-center py-10">
        <AboutUsHero
          title={"أهدافنا"}
          subtitle={"تعلم المزيد عن أهدافنا"}
          description={
            "نهدف إلى توفير قاعدة بيانات مركزية للتقارير اليومية وإدارة المرضى للأمراض الوبائية والعمل على تسهيل هذه العملية وزيادة الكفاءة وتقليل الوقت المستهلك لهذه العملية"
          }
        />
      </div>
      <div
        id="contact-us"
        className="relative w-full flex justify-center bg-dark-blue mt-10"
      >
        <svg
          className="absolute top-0 w-full h-6 -mt-4 sm:-mt-10 sm:h-16 text-dark-blue"
          preserveAspectRatio="none"
          viewBox="0 0 1440 80"
        >
          <path
            fill="#204066"
            d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
          />
        </svg>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
