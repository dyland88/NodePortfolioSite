"use client";
import { AnimatePresence, motion } from "framer-motion";
import useNodePhysics from "./useNodePhysics";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./components/Modal";
import ContentNode from "./components/ContentNode";
import { GitBranch } from "react-feather";

export default function Home() {
  const DEBUG = false;
  const [isDragging, setIsDragging] = useState(false);
  const [selectedNode, setSelectedNode] = useState<number>(-1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalPage = searchParams.get("page");

  useEffect(() => {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].id === modalPage && nodeList[i].hasModal) {
        setSelectedNode(i);
        return;
      }
    }
    setSelectedNode(-1);
    if (modalPage !== null && modalPage !== "") router.push("/");
  }, [modalPage]);

  const ComponentOne = () => (
    <div
      style={{
        minWidth: 80,
        minHeight: 80,
        backgroundColor: "red",
        borderRadius: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        borderWidth: 2,
        borderColor: "white",
      }}
    >
      <p>Hello</p>
    </div>
  );
  const ComponentTwo = () => (
    <div
      style={{
        width: 80,
        height: 80,
        backgroundColor: "blue",
        borderRadius: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        borderWidth: 2,
        borderColor: "white",
      }}
    >
      <p>World</p>
    </div>
  );
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
      id: "main",
      content: <ComponentOne />,
      modalContent: <LoremIpsum />,
      hasModal: true,
      x: windowWidth / 2,
      y: windowHeight / 2,
      visible: true,
      childrenVisible: true,
    },
    {
      id: "two",
      content: <ComponentTwo />,
      x: windowWidth / 4,
      y: windowHeight / 2,
      visible: true,
      childrenVisible: false,
    },
    {
      id: "three",
      content: <ComponentTwo />,
      x: windowWidth * (3 / 4),
      y: windowHeight / 2,
      visible: true,
      childrenVisible: false,
    },
    {
      id: "3.1",
      content: <ContentNode icon={<GitBranch />} color="#1DAA9A" />,
      hasModal: true,
      modalContent: <LoremIpsum />,
      x: windowWidth * (3 / 4),
      y: windowHeight * (3 / 4),
      visible: false,
      childrenVisible: false,
    },
    {
      id: "3.2",
      content: <ComponentTwo />,
      hasModal: true,
      modalContent: <LoremIpsum />,
      x: windowWidth * (3 / 4),
      y: windowHeight * (1 / 4),
      visible: false,
      childrenVisible: false,
    },
    {
      id: "2.1",
      content: <ComponentTwo />,
      hasModal: true,
      modalContent: <LoremIpsum />,
      x: windowWidth / 4,
      y: windowHeight * (3 / 4),
      visible: false,
      childrenVisible: false,
    },
    {
      id: "2.2",
      content: <ComponentTwo />,
      hasModal: true,
      modalContent: <LoremIpsum />,
      x: windowWidth / 4,
      y: windowHeight * (1 / 4),
      visible: false,
      childrenVisible: false,
    },
  ];
  const initialLinkList = [
    { source: "main", target: "two" },
    { source: "main", target: "three" },
    { source: "three", target: "3.1" },
    { source: "three", target: "3.2" },
    { source: "two", target: "2.1" },
    { source: "two", target: "2.2" },
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
      <main className="flex min-h-screen flex-col items-start justify-start overflow-clip p-24 bg-slate-950">
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
              stroke="gray"
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
                  whileDrag={{ scale: 1.1 }}
                  whileHover={{ scale: 1.2 }}
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
                    left: nodeList[index].x - 40,
                    top: nodeList[index].y - 40,
                  }}
                >
                  {component.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <AnimatePresence>
          {selectedNode != -1 && (
            <Modal title={nodeList[selectedNode].id}>
              {nodeList[selectedNode].modalContent}
            </Modal>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
