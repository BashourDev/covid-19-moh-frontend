import React from "react";

const AppCheckBox = ({ value, onClick }) => {
  return (
    <label>
      <input
        onClick={onClick}
        className="sr-only peer"
        name="size"
        type="checkbox"
        value={value}
      />
      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
        {value}
      </div>
    </label>
  );
};

export default AppCheckBox;
