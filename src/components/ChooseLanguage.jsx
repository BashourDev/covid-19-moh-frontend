import React, { Fragment, useEffect, useState } from "react";
import { MdLanguage } from "react-icons/md";
import i18next from "i18next";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ChooseLanguage = ({ isMobile }) => {
  const languages = [
    {
      code: "en",
      name: "EN",
      dir: "ltr",
    },
    {
      code: "ar",
      name: "AR",
      dir: "rtl",
    },
  ];
  const currentLanguageCode = localStorage.getItem("i18nextLng");
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const [direction, setDirection] = useState(currentLanguage.dir);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = direction;
  }, [direction, t]);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              isMobile
                ? "text-dark-blue hover:text-dark-blue/95"
                : "text-white",
              "group rounded-md inline-flex items-center text-base font-medium focus:outline-none"
            )}
          >
            <span>{t("language")}</span>
            <ChevronDownIcon
              className={classNames(
                isMobile
                  ? "text-dark-blue hover:text-dark-blue/95"
                  : "text-white",
                "ml-2 h-5 w-5 group-hover:text-white"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-[5rem] sm:px-0">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {languages.map((language, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        i18next.changeLanguage(language.code);
                        setDirection(language.dir);
                      }}
                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                    >
                      <div className="">
                        <p className="text-base font-medium text-gray-900">
                          {language.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ChooseLanguage;
