import React from "react";

interface Props {
  icon: any;
  color: string;
}

export const ContentNode: React.FC<Props> = ({ icon, color }) => {
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

export const LinkNode: React.FC<Props> = ({ icon, color }) => {
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
          width: 120,
          height: 120,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          pointerEvents: "none", // Add this line to make the image not clickable
        }}
      >
        <img src="/assets/Center_node.png" alt="image" />
      </div>
    </div>
  );
};
