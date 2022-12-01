/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  MenuIcon,
  SupportIcon,
  UserGroupIcon,
  PhoneIncomingIcon,
  XIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
// import logo from "../assets/images/logo.png";
import ChooseLanguage from "./ChooseLanguage";
import { useTranslation } from "react-i18next";
import { MdOutlineCoronavirus } from "react-icons/md";
import UserContext from "../contexts/userContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const resources = [
    // {
    //   name: t("our_strategy"),
    //   description: t("our_strategy_description"),
    //   href: "/#our-strategy",
    //   icon: SupportIcon,
    //   type: "hash",
    // },
    // {
    //   name: t("create_community"),
    //   description: t("create_community_description"),
    //   href: "/#create-community",
    //   icon: SupportIcon,
    //   type: "hash",
    // },
    // {
    //   name: "In The Making",
    //   description: "Check out our in the making section.",
    //   href: "/#in-the-making",
    //   icon: SupportIcon,
    //   type: "hash",
    // },
    // {
    //   name: "Connect To Nature",
    //   description: "Check out our connect to nature section.",
    //   href: "/#connect-to-nature",
    //   icon: SupportIcon,
    //   type: "hash",
    // },
    // {
    //   name: "Our Philosophy",
    //   description: "Check out our our philosophy section.",
    //   href: "/#our-philosophy",
    //   icon: SupportIcon,
    //   type: "hash",
    // },
    // {
    //   name: "FAQs",
    //   description:
    //     "Get all of your questions answered in our frequently asked questions section.",
    //   href: "/faqs",
    //   icon: SupportIcon,
    //   type: "link",
    // },
    {
      name: "اتصل بنا",
      description: "اتصل بنا في حال وجود أي استفسارات",
      href: "/#contact-us",
      icon: PhoneIcon,
      type: "hash",
    },
    {
      name: "من نحن",
      description: "تعلم من نحن وما هي مهمتنا",
      href: "/#about-us",
      icon: UserGroupIcon,
      type: "hash",
    },
  ];

  return (
    <Popover className="z-50 sticky w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-dark-blue py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex">
              <span className="sr-only">Workflow</span>
              <h1 className="text-3xl font-semibold text-white">
                {/* <img src={logo} alt={"logo"} className={"h-14"} /> */}
                <MdOutlineCoronavirus className="text-light w-12 h-12" />
              </h1>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-dark-blue rounded-md p-2 inline-flex items-center justify-center text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-blue">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex gap-10">
            <HashLink
              to="/#hospitals"
              className="text-base font-medium text-white hover:text-white/95"
              smooth
            >
              مشافي
            </HashLink>

            <HashLink
              to="/#services"
              className="text-base font-medium text-white hover:text-white/95"
              smooth
            >
              خدمات
            </HashLink>

            <HashLink
              to="/#goals"
              className="text-base font-medium text-white hover:text-white/95"
              smooth
            >
              أهداف
            </HashLink>

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-white/90" : "text-white",
                      "group rounded-md inline-flex items-center text-base font-medium hover:text-white/90 focus:outline-none"
                    )}
                  >
                    <span>المزيد</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-white/90" : "text-white",
                        "ml-2 h-5 w-5 group-hover:text-white/90"
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
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) =>
                            item.type === "link" ? (
                              <Link
                                key={item.name}
                                to={item.href}
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                <item.icon
                                  className="flex-shrink-0 h-6 w-6 text-dark-blue"
                                  aria-hidden="true"
                                />
                                <div className="mx-4">
                                  <p className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            ) : (
                              <HashLink
                                key={item.name}
                                to={item.href}
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                smooth
                              >
                                <item.icon
                                  className="flex-shrink-0 h-6 w-6 text-dark-blue"
                                  aria-hidden="true"
                                />
                                <div className="mx-4">
                                  <p className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.description}
                                  </p>
                                </div>
                              </HashLink>
                            )
                          )}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            {/* <ChooseLanguage /> */}
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {user.id ? (
              <Link
                to="/dashboard"
                className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-dark-gold hover:bg-dark-blue"
              >
                لوحة التحكم
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-dark-gold hover:bg-dark-blue"
                >
                  انضم إلينا
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 bg-dark-blue">
              <div className="flex items-center justify-between">
                <div>
                  <Link to="/" className="flex outline-none">
                    <span className="sr-only">Workflow</span>
                    <h1 className="text-3xl font-semibold text-white outline-none">
                      {/* <img src={logo} alt={"logo"} className={"h-14"} /> */}
                      <MdOutlineCoronavirus className="text-light w-8 h-8" />
                    </h1>
                  </Link>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-white hover:text-white/90 focus:outline-none">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <HashLink
                  to="/#hospitals"
                  className="text-base font-medium text-dark-blue hover:text-dark-blue/95"
                  smooth
                >
                  مشافي
                </HashLink>

                <HashLink
                  to="/#services"
                  className="text-base font-medium text-dark-blue hover:text-dark-blue/95"
                  smooth
                >
                  خدمات
                </HashLink>

                <HashLink
                  to="/#goals"
                  className="text-base font-medium text-dark-blue hover:text-dark-blue/95"
                  smooth
                >
                  أهداف
                </HashLink>
                {resources.map((item) =>
                  item.type === "link" ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-base font-medium text-dark-blue hover:text-dark-blue/95"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <HashLink
                      key={item.name}
                      to={item.href}
                      className="text-base font-medium text-dark-blue hover:text-dark-blue/95"
                      smooth
                    >
                      {item.name}
                    </HashLink>
                  )
                )}
                {/* <ChooseLanguage isMobile={true} /> */}
              </div>
              <div>
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-light-gold hover:bg-dark-gold"
                >
                  انضم إلينا
                </Link>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  لديك حساب؟{" "}
                  <Link
                    to="/login"
                    className="text-dark-green hover:text-dark-green"
                  >
                    تسجيل الدخول
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
