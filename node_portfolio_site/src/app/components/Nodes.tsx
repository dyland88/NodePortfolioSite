import React from "react";
import Image from "next/image";
import NodeDescription from "./NodeDescription";

interface NodeProps {
  icon: any;
  color: string;
  description: string;
  radius: number;
}

export const ContentNode: React.FC<NodeProps> = ({
  icon,
  color,
  description,
  radius,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-44">
      <div
        style={{
          width: radius * 2,
          height: radius * 2,
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

export const LinkNode: React.FC<NodeProps> = ({
  icon,
  color,
  description,
  radius,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-40">
      <div
        style={{
          width: radius * 2,
          height: radius * 2,
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
      <div className="justify-center items-center flex flex-col pointer-events-none w-40">
        <Image
          src="/assets/Center_node.png"
          alt="image"
          width={120}
          height={120}
          priority={true}
        />
        <NodeDescription text="Dylan Coben" />
      </div>
    </div>
  );
};
