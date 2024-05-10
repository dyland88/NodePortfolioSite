import React from "react";

type ButtonProps = {
  onClick: () => void;
};

export const XButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white"
    ></button>
  );
};
