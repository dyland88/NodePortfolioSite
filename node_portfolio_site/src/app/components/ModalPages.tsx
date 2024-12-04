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
                  className="bg-[#5a5a5a] text-white text-sm px-4 py-2 rounded-full flex flex-row items-center justify-center gap-1.5"
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
                  className="bg-[#5a5a5a] text-white text-sm px-4 py-2 rounded-full flex flex-row items-center justify-center gap-1.5"
                >
                  <Image
                    src="/assets/linkedin.svg"
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
                width={260}
                height={260}
                className="w-52 md:w-64"
                priority
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
    <div className="text-bodyTextColor pb-12 pt-6 px-12 max-sm:px-6">
      <p className="text-md">
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
          width={500}
          height={300}
          className="w-96 border-2 border-customred rounded-lg"
        />
      </div>
    </div>
  );
};

export const Website: React.FC = () => {
  return (
    <>
      <div className="text-bodyTextColor pb-12 pt-6 px-12 max-sm:px-6">
        <p className="text-md text-pretty">
          This website was created to try out an experimental navigation method
          for websites. It uses React and NextJS for page navigation, Matter.js
          for the physics simulations, and Framer Motion for animations.
        </p>
      </div>
      <div className="bg-gray py-3 px-3 w-full flex flex-wrap justify-center items-center gap-5">
        <p className="font-bold text-lg">Check it out:</p>
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

export const RedditBot: React.FC = () => {
  return (
    <>
      <div className="text-bodyTextColor pb-12 pt-6 px-12 max-sm:px-6">
        <p className="text-md">
          In 2020, I noticed that many comments on Reddit had broken links to
          subreddits that were incorrectly formatted, often without the
          commenter noticing.
        </p>
        <p className="mt-6">
          To fix this, I created a python bot that interfaced with the Reddit
          API wrapper to find new comments and used regular expressions to
          detect broken links. When it found a broken link, it would leave a
          comment to notify the user that their link was broken and provide a
          link with correct formatting.
        </p>
      </div>
    </>
  );
};

export const RMCF: React.FC = () => {
  return (
    <div className="text-bodyTextColor pb-8 pt-8 px-12 max-sm:px-6">
      <p className="text-md">
        From October 2022 to July 2023, I worked at Rocky Mountain Chocolate
        Factory. I ensured customer satisfaction by providing personalized
        product recommendations based on customer preferences and resolved
        customer concerns through problem-solving.
      </p>
    </div>
  );
};

export const Hackathon: React.FC = () => {
  return (
    <>
      <div className="text-bodyTextColor pb-12 pt-12 px-12 max-sm:px-6 flex flex-col justify-center items-center gap-10">
        <p className="text-md">
          For the 2024 OSCHack 24-hour hackathon, two of my friends and I
          tackled the challenge to redesign the the website of Dino Luzzi, one
          of the hackathon's sponsors with new functionality, UI/UX design, and
          style to make it more engaging and easier for people to purchase the
          product.
        </p>
        <Image
          src="/assets/Dino Page 1.png"
          alt="Dino Page 1"
          width={500}
          height={300}
          className="w-96 border-2 border-customred rounded-lg"
        />
        <p>
          We decided to give the website interactive 3d elements, including a 3d
          can that follows the user's mouse and a racecar that drives down the
          webpage, revealing the features of Dino Luzzi's product.
        </p>
        <p>
          We built the website using React and used Three.js and
          react-three-fiber for the 3d animations. On top of this, we used
          Framer Motion for animations of regular webpage elements.
        </p>
        <Image
          src="/assets/Dino Page 2.png"
          alt="Dino Page 2"
          width={500}
          height={300}
          className="w-96 border-2 border-customred rounded-lg"
        />
        <p>
          I was in charge of creating the 3d models for the elements on the
          webpage and all of the 2d styles and animations. I also worked on
          getting the physics simulation working correctly for the the racecar.
        </p>
        <Image
          src="/assets/Dino Page 3.png"
          alt="Dino Page 3"
          width={500}
          height={300}
          className="w-96 border-2 border-customred rounded-lg"
        />
        <p>We ended up winning the hackathon for making this website!🎉</p>
        <Image
          src="/assets/hackathoncheck.PNG"
          alt="Winning Photo"
          width={500}
          height={300}
          className="w-96 border-2 border-customred rounded-lg"
        />
      </div>
      <div className="bg-gray py-3 px-2 w-full flex flex-row flex-wrap justify-center items-center gap-5">
        <p className="font-bold text-lg text-nowrap">Check it out:</p>

        <div className="flex flex-row justify-center flex-wrap gap-3">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/rdg922/hackathon"
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
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://hackathon-s3ma.vercel.app/"
            rel="noopener noreferrer"
            className="text-white font-medium text-md flex bg-[#7c7c7c] px-4 py-2 rounded-full gap-2"
          >
            <Image
              src="/assets/vercel.svg"
              alt="GitHub"
              width={18}
              height={18}
              className="fill-white"
            />
            Website
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://devpost.com/software/dino-luzzi-website"
            rel="noopener noreferrer"
            className="text-white font-medium text-md flex bg-[#7c7c7c] px-4 py-2 rounded-full gap-2"
          >
            <Image
              src="/assets/devpost.svg"
              alt="Devpost"
              width={18}
              height={18}
              className="fill-white"
            />
            Devpost
          </motion.a>
        </div>
      </div>
    </>
  );
};

export const MFYM: React.FC = () => {
  return (
    <>
      <div className="text-bodyTextColor pb-12 pt-12 px-12 max-sm:px-6 flex flex-col justify-center items-center gap-10">
        <p className="text-md">
          Have you ever wanted to listen to music that matches your current
          mood? Well now you can! Music for Your Mood allows you to input your
          current happiness, energy, and level of focus and get a curated
          playlist of songs to match your mood. The frontend was designed using
          React and shadcn.
        </p>
        <Image
          src="/assets/mfym.png"
          alt="Dino Page 1"
          width={500}
          height={300}
          className="w-[96] border-2 border-customred rounded-lg"
        />
      </div>
      <div className="bg-gray py-3 px-2 w-full flex flex-row flex-wrap justify-center items-center gap-5">
        <p className="font-bold text-lg text-nowrap">Check it out:</p>

        <div className="flex flex-row justify-center flex-wrap gap-3">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/dyland88/music-for-your-mood"
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
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="https://music-for-your-mood.vercel.app/"
            rel="noopener noreferrer"
            className="text-white font-medium text-md flex bg-[#7c7c7c] px-4 py-2 rounded-full gap-2"
          >
            <Image
              src="/assets/vercel.svg"
              alt="GitHub"
              width={18}
              height={18}
              className="fill-white"
            />
            Website
          </motion.a>
        </div>
      </div>
    </>
  );
};

export const Ensemble: React.FC = () => {
  return (
    <div className="text-bodyTextColor pb-8 pt-8 px-12 max-sm:px-6 items-center flex flex-col gap-8">
      <p className="text-md">
        I play the Cello in the University of Florida Honors Ensemble, an honors
        orchestra organization that performs at various events throughout the
        year.
      </p>
      <Image
        src="/assets/ensemble.JPEG"
        alt="Honors Ensemble"
        width={1256}
        height={533}
        className="border-2 border-customred rounded-lg"
      />
    </div>
  );
};

export const OSC: React.FC = () => {
  return (
    <>
      <div className="text-bodyTextColor pb-12 pt-12 px-12 max-sm:px-6 flex flex-col justify-center items-center gap-10">
        <p className="text-md">
          The Open Source Club at the University of Florida is an organization
          that is split into different teams that work on various open source
          coding projects projects.
        </p>
        <p>
          I am the lead frontend developer for Echo Chat, a React Native app
          that is a proximity based chat app designed to allow users to connect
          with strangers nearby.
        </p>
        <Image
          src="/assets/echo_chat.png"
          alt="Echo Chat"
          width={500}
          height={500}
          className="w-40 border-2 border-customred rounded-3xl"
        />
      </div>
      <div className="bg-gray py-3 w-full flex justify-center items-center gap-5">
        <p className="font-bold text-lg">Check it out:</p>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="https://github.com/ufosc/OSC-Proximity-Chat-App"
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
