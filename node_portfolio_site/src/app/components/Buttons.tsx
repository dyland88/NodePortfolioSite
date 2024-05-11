import React from "react";
import { X } from "react-feather";

type ButtonProps = {
  onClick: () => void;
};

export const XButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-1.5 flex items-center justify-center rounded-full bg-[#7c7c7c]"
    >
      <X size={22} strokeWidth={2.5} color={"#ffffff"} />
    </button>
  );
};
