"use client";
import React from "react";
import Image from "next/image";
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
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-30 text-white">
        <DialogPanel className=" max-w-[52rem] p-1.5 bg-gradient-to-br from-customblue to-customred rounded-3xl">
          <div className="bg-[#232323] rounded-2xl flex md:flex-row flex-col-reverse justify-center align-middle overflow-hidden py-16 md:pt-16 pt-8 px-8 md:px-16 gap-6 md:gap-10">
            <div className="inline-block md:w-3/5 w-full">
              <DialogTitle className="font-bold text-4xl flex align-middle mb-2 text-nowrap">
                Hey, I'm Dylan
              </DialogTitle>
              <DialogTitle className="font-bold text-4xl inline-block bg-gradient-to-r from-customblue to-customred text-transparent bg-clip-text text-nowrap">
                Software Developer
              </DialogTitle>
              <div className="flex flex-row items-center gap-3 my-7">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/dyland88"
                  rel="noopener noreferrer"
                  className="bg-[#5a5a5a] text-white max-sm:text-xs text-sm px-4 py-2 rounded-full flex flex-row items-center justify-center gap-1.5"
                >
                  <Image
                    src="/assets/github.svg"
                    alt="GitHub"
                    width={16}
                    height={16}
                    className=" fill-white"
                  />
                  Github
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/dylancoben/"
                  rel="noopener noreferrer"
                  className="bg-[#5a5a5a] text-white max-sm:text-xs text-sm px-4 py-2 rounded-full flex flex-row items-center justify-center gap-1.5"
                >
                  <Image
                    src="/assets/github.svg"
                    alt="Linkedin"
                    width={16}
                    height={16}
                    className=" fill-white"
                  />
                  LinkedIn
                </motion.a>
              </div>
              <p className=" text-stone-400 text-md mb-8 max-w-sm">
                Hi, I am Dylan, a software developer attending the Honors
                College at the University of Florida. I have experience in
                React, Next, C++, Python, and Java.
              </p>

              <motion.button
                onClick={closeDialog}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white text-md underline flex"
              >
                Get to know me →
              </motion.button>
            </div>
            <div className="flex justify-center items-center">
              <Image
                src="/assets/Center_node.png"
                alt="Dylan"
                width={240}
                height={240}
                className="w-52 md:w-64"
              />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export const Whiteboard: React.FC = () => {
  return (
    <div className="text-bodyTextColor pb-12 pt-6 px-12">
      <p className="text-md text-pretty">
        In 2023, I wrote custom software to control a whiteboard drawing robot.
        This included creating a gcode parser in Python, which translates gcode
        into machine instructions to be transferred to the arduino over serial.
      </p>
      <p className="my-6">
        In addition, I rewrote the software on the control board to drive the
        stepper motors using C++. The original whiteboard, created by JJrobots,
        was no longer supported due to server shutdowns, so I had to write my
        own control software to continue using it.
      </p>
      <div className="flex justify-center">
        <Image
          src="/assets/robot_whiteboard.png"
          alt="Robotic Whiteboard"
          width={240}
          height={240}
          className="w-96 border-2 border-customred rounded-lg"
        />
      </div>
    </div>
  );
};

export const Website: React.FC = () => {
  return (
    <>
      <div className="text-bodyTextColor pb-12 pt-6 px-12">
        <p className="text-md text-pretty">
          This website was created to try out an experimental navigation method
          for websites. It uses React and NextJS for page navigation, Matter.js
          for the physics simulations, and Framer Motion for animations.
        </p>
      </div>
      <div className="bg-gray py-3 w-full flex justify-center items-center gap-5">
        <p className="font-bold text-lg">Check it out on Github:</p>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="https://github.com/dyland88/NodePortfolioSite"
          rel="noopener noreferrer"
          className="text-white font-medium text-md flex bg-[#7c7c7c] px-4 py-2 rounded-full gap-2"
        >
          <Image
            src="/assets/github.svg"
            alt="GitHub"
            width={18}
            height={18}
            className="fill-white"
          />
          Github
        </motion.a>
      </div>
    </>
  );
};
