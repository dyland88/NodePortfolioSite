import React from "react";

interface NodeProps {
  text: string;
}

export const NodeDescription: React.FC<NodeProps> = ({ text }) => {
  return (
    <div className="bg-[#5a5a5a] text-white text-center font-bold text text-sm px-3 py-1 rounded-lg gap-1 z-50 shadow-lg mt-2 resize-none">
      {text}
    </div>
  );
};

export default NodeDescription;
