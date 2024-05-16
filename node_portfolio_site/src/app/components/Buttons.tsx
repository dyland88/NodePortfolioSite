import React from "react";
import { X } from "react-feather";
import { motion } from "framer-motion";

type ButtonProps = {
  onClick: () => void;
};

export const XButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="p-1.5 flex items-center justify-center rounded-full bg-[#7c7c7c] shadow-md"
    >
      <X size={22} strokeWidth={2.5} color={"#ffffff"} />
    </motion.button>
  );
};
