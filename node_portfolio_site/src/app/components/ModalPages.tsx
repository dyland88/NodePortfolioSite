import React from "react";
import Image from "next/image";
import Modal from "./Modal";

export function Welcome() {
  return <div></div>;
}

export const Dylan: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/assets/Center_node.png"
        alt="Dylan"
        width={200}
        height={200}
        className="rounded-full"
      />
      <p className="text-white text-lg mt-4">
        Hi! I'm Dylan, a software developer from the United States. I love
        creating things and learning new technologies. I'm currently working on
        a few projects, including this portfolio site.
      </p>
    </div>
  );
};
