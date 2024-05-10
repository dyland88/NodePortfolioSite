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
  children: React.ReactNode;
  isOpen: boolean;
};

export default function Modal({ title, children, isOpen }: Props) {
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const router = useRouter();

  const closeDialog = () => {
    router.push("/");
  };

  const modal = (
    <>
      <Transition
        show={isOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog onClose={closeDialog} className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-3xl space-y-4 border-4 border-customred bg-slate-800 rounded-2xl flex-row flex-start overflow-hidden">
              <div className="bg-[#7c7c7c] w-full px-6 py-3 flex flex-row justify-between items-center">
                <DialogTitle className="font-bold">{title}</DialogTitle>
                <div className="align-end">
                  <XButton onClick={closeDialog} />
                </div>
              </div>
              <div className="px-6 py-6">{children}</div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
  return modal;
}
