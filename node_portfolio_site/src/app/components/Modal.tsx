"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Modal({ title, children }: Props) {
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const router = useRouter();

  const closeDialog = () => {
    router.push("/");
  };

  const modal = (
    <>
      <motion.dialog
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        ref={modalRef}
        className="bg-transparent flex justify-center align-middle self-center justify-self-center"
      >
        <motion.div className="mx-auto h-auto w-1/2 p-5 shadow-lg rounded-xl bg-slate-800">
          <motion.div className="flex justify-between items-center pb-3">
            <motion.h1 className="text-2xl font-bold text-white">
              {title}
            </motion.h1>
            <motion.button
              onClick={closeDialog}
              className="cursor-pointer z-50 text-white"
            >
              x
            </motion.button>
          </motion.div>
          <motion.div>{children}</motion.div>
        </motion.div>
      </motion.dialog>
    </>
  );
  return modal;
}
