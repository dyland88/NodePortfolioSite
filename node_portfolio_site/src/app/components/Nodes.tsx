import React from "react";
import Image from "next/image";

interface NodeProps {
  icon: any;
  color: string;
}

export const ContentNode: React.FC<NodeProps> = ({ icon, color }) => {
  return (
    <div>
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
    </div>
  );
};

export const LinkNode: React.FC<NodeProps> = ({ icon, color }) => {
  return (
    <div>
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
    </div>
  );
};

export const CenterNode: React.FC = () => {
  return (
    <div>
      <div
        style={{
          width: 130,
          height: 130,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          pointerEvents: "none", // Add this line to make the image not clickable
        }}
      >
        <Image
          src="/assets/Center_node.png"
          alt="image"
          width={140}
          height={140}
          priority={true}
        />
      </div>
    </div>
  );
};
