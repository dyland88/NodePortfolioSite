"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

import React from "react";

export default function Modal({ title, children }: Props) {
  const searchParams = useSearchParams();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const modalPage = searchParams.get("page");

  useEffect(() => {
    if (modalPage === title) {
      showDialog();
    } else {
      closeDialog();
    }
  }, [modalPage]);

  const showDialog = () => {
    console.log("showing modal");
    modalRef.current?.showModal();
  };

  const closeDialog = () => {
    modalRef.current?.close();
  };

  const modal: JSX.Element | null =
    modalPage === title ? (
      <dialog ref={modalRef}>
        <div>
          <div>
            <h1>{title}</h1>
            <button onClick={closeDialog}>x</button>
          </div>
          <div>{children}</div>
        </div>
      </dialog>
    ) : null;

  return modal;
}
