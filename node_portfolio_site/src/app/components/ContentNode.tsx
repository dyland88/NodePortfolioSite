import React from "react";
import { Icon, Smile } from "react-feather";

interface Props {
  icon: any;
  color: string;
}

const ContentNode: React.FC<Props> = ({ icon, color }) => {
  return (
    <div>
      <div
        style={{
          width: 80,
          height: 80,
          backgroundColor: color,
          borderRadius: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          borderWidth: 2,
          borderColor: "white",
        }}
      >
        {icon}
      </div>
    </div>
  );
};

export default ContentNode;
