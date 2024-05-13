"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";
import { XButton } from "./Buttons";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";

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
  const modalRef = useRef<null | HTMLDialogElement>(null);
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
        <DialogPanel className="max-w-3xl space-y-4 border-4 border-customred bg-[#232323] rounded-3xl flex-row flex-start overflow-hidden">
          <div className="bg-[#393939] w-full pr-3 pl-12 py-3 flex flex-row justify-between items-center">
            <DialogTitle className="font-bold text-2xl">{title}</DialogTitle>
            <div className="flex flex-row space-x-2 ml-auto mr-4">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className={`text-md px-5 py-1 rounded-full text-white`}
                  style={{ backgroundColor: tagColor }}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="align-end">
              <XButton onClick={closeDialog} />
            </div>
          </div>
          <div className="py-12 px-12">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
  return modal;
}
