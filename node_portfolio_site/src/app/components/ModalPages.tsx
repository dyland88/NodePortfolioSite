"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const Welcome: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const router = useRouter();

  const closeDialog = () => {
    router.push("/?page=nodes");
  };

  return (
    <Dialog
      static
      onClose={closeDialog}
      open={isOpen}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-3xl space-y-4 border-4 border-customred bg-[#232323] rounded-3xl flex-row flex-start overflow-hidden"
        >
          <div className="py-12 px-12"></div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

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
