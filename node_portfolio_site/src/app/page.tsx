"use client";
import { AnimatePresence, motion } from "framer-motion";
import useNodePhysics from "./useNodePhysics";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./components/Modal";
import { CenterNode, ContentNode, LinkNode } from "./components/Nodes";
import {
  Briefcase,
  Code,
  Coffee,
  Edit2,
  Monitor,
  Terminal,
  Zap,
} from "react-feather";
import {
  Whiteboard,
  Welcome,
  Website,
  RedditBot,
  RMCF,
  Hackathon,
  Ensemble,
  OSC,
} from "./components/ModalPages";

export default function Home() {
  const DEBUG = false;
  const [isDragging, setIsDragging] = useState(false);
  const [selectedNode, setSelectedNode] = useState<number>(-1);
  const router = useRouter();
  const modalPage = useSearchParams().get("page");
  const green = "#1DAA9A";
  const red = "#d05252";
  const blue = "#3e75cd";
  const linkNodeRadius = 40;
  const contentNodeRadius = 40;

  useEffect(() => {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].id === modalPage && nodeList[i].hasModal) {
        setSelectedNode(i);
        return;
      }
    }
    setSelectedNode(-1);
    if (modalPage !== null && modalPage !== "nodes")
      router.push("/?page=nodes");
  }, [modalPage]);

  let windowWidth = 0;
  let windowHeight = 0;
  if (typeof window !== "undefined") {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }

  const initialNodes = [
    {
      id: "Dylan Coben",
      content: <CenterNode />,
      hasModal: true,
      x: windowWidth / 2,
      y: windowHeight / 2,
      radius: 55,
      visible: true,
      childrenVisible: true,
    },
    {
      id: "Projects",
      content: (
        <LinkNode
          icon={<Code size={40} />}
          color={green}
          description={"Projects"}
          radius={linkNodeRadius}
        />
      ),
      x: windowWidth / 4,
      y: windowHeight * (3 / 4),
      radius: linkNodeRadius,
      visible: true,
      childrenVisible: false,
    },
    {
      id: "Work",
      content: (
        <LinkNode
          icon={<Briefcase size={40} />}
          color={blue}
          description={"Work Experience"}
          radius={linkNodeRadius}
        />
      ),
      x: windowWidth * (3 / 4),
      y: windowHeight * (3 / 4),
      radius: linkNodeRadius,
      visible: true,
      childrenVisible: false,
    },
    {
      id: "Rocky Mountain Chocolate Factory",
      content: (
        <ContentNode
          icon={<Coffee size={40} />}
          color={blue}
          description={"Rocky Mountain\nChocolate Factory"}
          radius={contentNodeRadius}
        />
      ),
      hasModal: true,
      modalContent: <RMCF />,
      modalTags: ["Customer Service"],
      x: windowWidth * (3 / 4),
      y: windowHeight * (3 / 4),
      radius: contentNodeRadius,
      visible: false,
      childrenVisible: false,
    },
    {
      id: "Reddit Bot",
      content: (
        <ContentNode
          icon={
            <img src="/assets/reddit.png" alt="Reddit" width={40} height={40} />
          }
          color={green}
          description={"Reddit Bot"}
          radius={contentNodeRadius}
        />
      ),
      hasModal: true,
      modalContent: <RedditBot />,
      modalTags: ["Python", "Regex"],
      x: windowWidth / 4,
      y: windowHeight * (3 / 4),
      radius: contentNodeRadius,
      visible: false,
      childrenVisible: false,
    },
    {
      id: "This Website",
      content: (
        <ContentNode
          icon={<Monitor size={40} />}
          color={green}
          description={"This Website"}
          radius={contentNodeRadius}
        />
      ),
      hasModal: true,
      modalContent: <Website />,
      modalTags: ["React", "NextJS", "Matter.js"],
      x: windowWidth / 4,
      y: windowHeight * (1 / 4),
      radius: contentNodeRadius,
      visible: false,
      childrenVisible: false,
    },
    {
      id: "Robotic Whiteboard",
      content: (
        <ContentNode
          icon={<Edit2 size={40} />}
          color={green}
          description={"Robotic Whiteboard"}
          radius={contentNodeRadius}
        />
      ),
      hasModal: true,
      modalContent: <Whiteboard />,
      modalTags: ["Python", "C++"],
      x: windowWidth / 5,
      y: windowHeight * (1 / 4),
      radius: contentNodeRadius,
      visible: false,
      childrenVisible: false,
    },
    {
      id: "2024 Hackathon",
      content: (
        <ContentNode
          icon={<Terminal size={40} />}
          color={green}
          description={"2024 Hackathon"}
          radius={contentNodeRadius}
        />
      ),
      hasModal: true,
      modalContent: <Hackathon />,
      modalTags: ["React", "Three.js", "Framer Motion"],
      x: windowWidth / 5,
      y: windowHeight * (2 / 4),
      radius: contentNodeRadius,
      visible: false,
      childrenVisible: false,
    },
    {
      id: "Extracurriculars",
      content: (
        <LinkNode
          icon={<Zap size={40} />}
          color={red}
          description={"Extracurriculars"}
          radius={linkNodeRadius}
        />
      ),
      x: windowWidth * (1 / 2),
      y: windowHeight * (1 / 4),
      radius: linkNodeRadius,
      visible: true,
      childrenVisible: false,
    },
    {
      id: "Honors Ensemble",
      content: (
        <ContentNode
          icon={<Terminal size={40} />}
          color={red}
          description={"Honors Ensemble"}
          radius={contentNodeRadius}
        />
      ),
      hasModal: true,
      modalContent: <Ensemble />,
      x: windowWidth * (1 / 2.5),
      y: windowHeight * (1 / 4),
      radius: contentNodeRadius,
      visible: false,
      childrenVisible: false,
    },
    {
      id: "Open Source Club",
      content: (
        <ContentNode
          icon={<Terminal size={40} />}
          color={red}
          description={"Open Source Club"}
          radius={contentNodeRadius}
        />
      ),
      hasModal: true,
      modalContent: <OSC />,
      modalTags: ["React Native"],
      x: windowWidth * (1 / 1.5),
      y: windowHeight * (1 / 4),
      radius: contentNodeRadius,
      visible: false,
      childrenVisible: false,
    },
  ];
  const initialLinkList = [
    { source: "Dylan Coben", target: "Projects" },
    { source: "Dylan Coben", target: "Work" },
    { source: "Dylan Coben", target: "Extracurriculars" },
    { source: "Work", target: "Rocky Mountain Chocolate Factory" },
    { source: "Projects", target: "Reddit Bot" },
    { source: "Projects", target: "This Website" },
    { source: "Projects", target: "Robotic Whiteboard" },
    { source: "Projects", target: "2024 Hackathon" },
    { source: "Extracurriculars", target: "Honors Ensemble" },
    { source: "Extracurriculars", target: "Open Source Club" },
  ];

  const {
    scene,
    nodeList,
    linkList,
    setNodePosition,
    setNodeVisibility: toggleChildNodeVisibility,
  } = useNodePhysics(initialNodes, initialLinkList, DEBUG);

  return (
    <>
      <main
        className="w-screen relative h-screen flex-col items-start justify-start overflow-hidden bg-gray"
        style={{
          backgroundImage:
            "radial-gradient(circle at 3px 3px, #353535 2px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      >
        <AnimatePresence>
          {(modalPage === null || modalPage === "Dylan Coben") && (
            <Welcome
              isOpen={modalPage === null || modalPage === "Dylan Coben"}
            />
          )}
        </AnimatePresence>
        {DEBUG && (
          <div
            ref={scene}
            className="h-screen w-screen absolute top-0 left-0"
          />
        )}
        <svg className="h-screen w-screen absolute top-0 left-0">
          {linkList.map((link, index) => (
            <line
              key={index}
              x1={nodeList[linkList[index].source].x}
              y1={nodeList[linkList[index].source].y}
              x2={nodeList[linkList[index].target].x}
              y2={nodeList[linkList[index].target].y}
              stroke="#b5b5b5"
              strokeWidth={2.5}
              opacity={nodeList[link.target].visible ? 1 : 0}
            />
          ))}
        </svg>

        {nodeList.map((component, index) => (
          <div key={index}>
            <AnimatePresence>
              {nodeList[index].visible && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  drag={true}
                  whileDrag={{ scale: 1.0 }}
                  whileHover={{ scale: 1.1 }}
                  onDrag={(
                    event: any,
                    info: { point: { x: number; y: number } }
                  ) => {
                    setIsDragging(true);
                    setNodePosition(index, info.point.x, info.point.y);
                  }}
                  onDragEnd={() => {
                    setTimeout(() => {
                      setIsDragging(false);
                    }, 10);
                  }}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.0}
                  onTap={() => {
                    if (!isDragging) {
                      if (nodeList[index]?.hasModal)
                        router.push("/?page=" + nodeList[index].id);
                      else toggleChildNodeVisibility(index);
                    }
                  }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: "absolute",
                    left: nodeList[index].x,
                    top: nodeList[index].y,
                    translateX: "-50%",
                    translateY: -1 * nodeList[index].radius,
                  }}
                >
                  {component.content}
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedNode === index && index > 0 && (
                <Modal
                  title={component.id}
                  isOpen={selectedNode === index}
                  tags={nodeList[index]?.modalTags ?? []}
                  tagColor="#e49518"
                >
                  {nodeList[index]?.modalContent}
                </Modal>
              )}
            </AnimatePresence>
          </div>
        ))}
      </main>
    </>
  );
}
