"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  children: React.ReactNode;
};

import React from "react";

export default function Modal({ title, children }: Props) {
  const searchParams = useSearchParams();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const modalPage = searchParams.get("page");
  const router = useRouter();

  useEffect(() => {
    if (modalPage === title) {
      showDialog();
    }
  }, [modalPage]);

  const showDialog = () => {
    console.log("showing modal");
    modalRef.current?.showModal();
  };

  const closeDialog = () => {
    modalRef.current?.close();
    router.push("/");
  };

  const modal: JSX.Element | null =
    modalPage === title ? (
      <dialog
        ref={modalRef}
        className="absolute top-0 left-0 bg-transparent h-screen w-screen flex justify-center align-middle"
      >
        <div className="mx-auto p-5 w-11/12 h-full shadow-lg rounded-xl bg-slate-800">
          <div className="flex justify-between items-center pb-3">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <button
              onClick={closeDialog}
              className="cursor-pointer z-50 text-white"
            >
              x
            </button>
          </div>
          <div>{children}</div>
        </div>
      </dialog>
    ) : null;
  return modal;
}
