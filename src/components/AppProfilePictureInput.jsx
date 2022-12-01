import React from "react";
import { FaCamera } from "react-icons/fa";

const AppProfilePictureInput = ({
  id,
  label,
  onChange,
  containerClassName,
  selectedFile,
  existingImage,
}) => {
  return (
    <div
      className={`flex w-full h-32 items-center justify-center  bg-grey-lighter space-x-5 ${containerClassName}`}
    >
      <label className="bg-light w-32 h-32 flex flex-col overflow-hidden items-center justify-center text-dark rounded-full shadow-sm tracking-wide uppercase border border-light cursor-pointer bg-light-gray/30">
        {selectedFile || existingImage ? (
          <img
            src={
              selectedFile ? URL.createObjectURL(selectedFile) : existingImage
            }
            alt={"profile picture"}
            className={"w-full h-full"}
          />
        ) : (
          <span className="text-sm leading-normal">
            <FaCamera className="text-xl" />
          </span>
        )}

        <input
          id={id}
          type="file"
          className="hidden"
          multiple
          onChange={onChange}
        />
      </label>
      {/* <div className="w-24 flex flex-col justify-center items-center">
        {selectedFile && <FaFile className="text-5xl text-dark self-start" />}
        <p className="text-xs text-dark">
          {selectedFile ? selectedFile?.name : "No Attachment"}
        </p>
      </div> */}
    </div>
  );
};

export default AppProfilePictureInput;
