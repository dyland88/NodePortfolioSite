"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";
import { XButton } from "./Buttons";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type Props = {
  title: string;
  tags: string[];
  tagColor: string;
  children: React.ReactNode;
  isOpen: boolean;
};

export default function Modal({
  title,
  children,
  isOpen,
  tags,
  tagColor,
}: Props) {
  const router = useRouter();

  const closeDialog = () => {
    router.push("/?page=nodes");
  };

  const modal = (
    <Dialog
      static
      onClose={closeDialog}
      open={isOpen}
      className="relative z-50"
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-30">
        <DialogPanel className="max-w-3xl border-4 border-customred bg-[#232323] rounded-3xl flex-row flex-start overflow-hidden max-h-full">
          <div className="bg-[#393939] w-full pr-3 pl-12 py-3 flex flex-row justify-between items-center">
            <div className="flex flex-row items-start flex-wrap justify-between grow mr-4">
              <DialogTitle className="font-bold text-2xl mr-2">
                {title}
              </DialogTitle>
              <div className="flex flex-row flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className={`text-md font-bold px-5 py-1 rounded-full text-white shadow-md text-nowrap`}
                    style={{ backgroundColor: tagColor }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <XButton onClick={closeDialog} />
            </div>
          </div>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
  return modal;
}
