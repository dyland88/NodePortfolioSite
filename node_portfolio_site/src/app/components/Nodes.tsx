import React from "react";
import Image from "next/image";
import NodeDescription from "./NodeDescription";

interface NodeProps {
  icon: any;
  color: string;
  description: string;
}

export const ContentNode: React.FC<NodeProps> = ({
  icon,
  color,
  description,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: color,
          borderRadius: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          borderWidth: 2,
          borderColor: "white",
          boxShadow: "0px 0px 30px 0px" + color,
        }}
      >
        {icon}
      </div>
      <NodeDescription text={description} />
    </div>
  );
};

export const LinkNode: React.FC<NodeProps> = ({ icon, color, description }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        style={{
          width: 90,
          height: 90,
          backgroundColor: color,
          borderRadius: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          borderWidth: 3,
          borderColor: "white",
          borderStyle: "dashed",
          boxShadow: "0px 0px 30px 0px" + color,
        }}
      >
        {icon}
      </div>
      <NodeDescription text={description} />
    </div>
  );
};

export const CenterNode: React.FC = () => {
  return (
    <div>
      <div className="justify-center items-center flex flex-col pointer-events-none">
        <Image
          src="/assets/Center_node.png"
          alt="image"
          width={140}
          height={140}
          priority={true}
        />
        <NodeDescription text="Dylan Coben" />
      </div>
    </div>
  );
};
