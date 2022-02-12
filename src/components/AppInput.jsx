import React from "react";
import { getIn, useFormikContext } from "formik";

const AppInput = ({
  id,
  label,
  type = "text",
  placeholder,
  Icon,
  className,
  containerClassName,
}) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <label
        htmlFor={id}
        className="text-dark text-lg focus:text-primary mt-5 mb-1 mx-1 focus-within:text-primary"
      >
        {label}
      </label>
      <div
        className={`w-11/12 h-11 border-[1px] border-darkGray transition duration-150 rounded-lg flex items-center text-dark focus-within:border-primary ${className} ${
          touched[id] && errors[id] && "border-danger"
        }`}
      >
        <div className="px-2">{Icon && <Icon />}</div>
        <input
          id={id}
          name={id}
          type={type}
          value={values[id]}
          placeholder={placeholder}
          onChange={handleChange(id)}
          onBlur={(e) => setFieldTouched(id)}
          className="border-0 outline-none px-2 w-full bg-inherit"
        />
      </div>
      {touched[id] && errors[id] && (
        <p className="text-danger mt-1">{errors[id]}</p>
      )}
    </div>
  );
};

export default AppInput;
