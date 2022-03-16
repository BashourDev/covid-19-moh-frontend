import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { MdCheck, MdChevronLeft } from "react-icons/md";

const AppSelectDoughnut = ({ value, options, handleChange }) => {
  return (
    <div className="flex flex-col text-dark text-lg mt-5 mb-1 w-full px-4">
      <Listbox value={value} onChange={(value) => handleChange(value)}>
        <div className="relative mt-1">
          <Listbox.Button className="h-8 relative w-11/12 py-1 pr-6 pl-10 text-left bg-inherit border-[1px] border-lightGray rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-sky-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate text-right pb-2">{value}</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <MdChevronLeft
                className="w-5 h-5 -rotate-90 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-11/12 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? "text-sky-700 bg-sky-100" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option?.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-700">
                          <MdCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default AppSelectDoughnut;
