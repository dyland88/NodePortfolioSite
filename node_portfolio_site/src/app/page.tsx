"use client";
import { AnimatePresence, motion } from "framer-motion";
import useNodePhysics from "./useNodePhysics";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./components/Modal";
import { CenterNode, ContentNode, LinkNode } from "./components/Nodes";
import { GitBranch } from "react-feather";
import { Whiteboard, Welcome, Website } from "./components/ModalPages";

export default function Home() {
  const DEBUG = false;
  const [isDragging, setIsDragging] = useState(false);
  const [selectedNode, setSelectedNode] = useState<number>(-1);
  const router = useRouter();
  const modalPage = useSearchParams().get("page");
  const green = "#1DAA9A";
  // const red = "#d05252";
  const blue = "#3e75cd";

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

  const LoremIpsum = () => (
    <p className="text-white">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, magni eos
      beatae officia corporis voluptatum accusamus nihil ab ullam nisi quisquam
      perspiciatis, eum ad molestiae. Molestias sint at voluptate aut?
    </p>
  );

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
      radius: 65,
      visible: true,
      childrenVisible: true,
    },
    {
      id: "Projects",
      content: (
        <LinkNode
          icon={<GitBranch size={40} />}
          color={green}
          description={"Projects"}
        />
      ),
      x: windowWidth / 4,
      y: windowHeight / 2,
      radius: 45,
      visible: true,
      childrenVisible: false,
    },
    {
      id: "Work",
      content: (
        <LinkNode
          icon={<GitBranch size={40} />}
          color={blue}
          description={"Work Experience"}
        />
      ),
      x: windowWidth * (3 / 4),
      y: windowHeight / 2,
      radius: 45,
      visible: true,
      childrenVisible: false,
    },
    {
      id: "Rocky Mountain Chocolate Factory",
      content: (
        <ContentNode
          icon={<GitBranch size={40} />}
          color={blue}
          description={"Rocky Mountain\nChocolate Factory"}
        />
      ),
      hasModal: true,
      modalContent: <LoremIpsum />,
      x: windowWidth * (3 / 4),
      y: windowHeight * (3 / 4),
      radius: 50,
      visible: false,
      childrenVisible: false,
    },
    {
      id: "Reddit Bot",
      content: (
        <ContentNode
          icon={<GitBranch size={40} />}
          color={green}
          description={"Reddit Bot"}
        />
      ),
      hasModal: true,
      modalContent: <LoremIpsum />,
      x: windowWidth / 4,
      y: windowHeight * (3 / 4),
      radius: 50,
      visible: false,
      childrenVisible: false,
    },
    {
      id: "This Website",
      content: (
        <ContentNode
          icon={<GitBranch size={40} />}
          color={green}
          description={"This Website"}
        />
      ),
      hasModal: true,
      modalContent: <Website />,
      x: windowWidth / 4,
      y: windowHeight * (1 / 4),
      radius: 50,
      visible: false,
      childrenVisible: false,
    },
    {
      id: "Robotic Whiteboard",
      content: (
        <ContentNode
          icon={<GitBranch size={40} />}
          color={green}
          description={"Robotic Whiteboard"}
        />
      ),
      hasModal: true,
      modalContent: <Whiteboard />,
      modalTags: ["Python", "C++"],
      x: windowWidth / 5,
      y: windowHeight * (1 / 4),
      radius: 50,
      visible: false,
      childrenVisible: false,
    },
  ];
  const initialLinkList = [
    { source: "Dylan Coben", target: "Projects" },
    { source: "Dylan Coben", target: "Work" },
    { source: "Work", target: "Rocky Mountain Chocolate Factory" },
    { source: "Projects", target: "Reddit Bot" },
    { source: "Projects", target: "This Website" },
    { source: "Projects", target: "Robotic Whiteboard" },
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
