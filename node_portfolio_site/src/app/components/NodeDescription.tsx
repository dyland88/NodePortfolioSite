import React from "react";

interface NodeProps {
  text: string;
}

export const NodeDescription: React.FC<NodeProps> = ({ text }) => {
  return (
    <div>
      <div className="bg-[#5a5a5a] text-white font-bold text text-sm px-3 py-1 rounded-lg flex flex-row gap-1 z-50 shadow-lg mt-2">
        {text}
      </div>
    </div>
  );
};

export default NodeDescription;
