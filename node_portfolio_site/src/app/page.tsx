"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Engine,
  Render,
  Bodies,
  World,
  Vector,
  Constraint,
  Composite,
  Mouse,
  MouseConstraint,
} from "matter-js";
import Matter from "matter-js";
import useNodePhysics from "./useNodePhysics";

export default function Home() {
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

  const initialNodes = window && [
    {
      id: "main",
      content: <ComponentOne />,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    },
    {
      id: "two",
      content: <ComponentTwo />,
      x: window.innerWidth / 4,
      y: window.innerHeight / 2,
    },
    {
      id: "three",
      content: <ComponentTwo />,
      x: window.innerWidth * (3 / 4),
      y: window.innerHeight / 2,
    },
    {
      id: "3.1",
      content: <ComponentTwo />,
      x: window.innerWidth * (3 / 4),
      y: window.innerHeight * (3 / 4),
    },
    {
      id: "3.2",
      content: <ComponentTwo />,
      x: window.innerWidth * (3 / 4),
      y: window.innerHeight * (1 / 4),
    },
    {
      id: "2.1",
      content: <ComponentTwo />,
      x: window.innerWidth / 4,
      y: window.innerHeight * (3 / 4),
    },
    {
      id: "2.2",
      content: <ComponentTwo />,
      x: window.innerWidth / 4,
      y: window.innerHeight * (1 / 4),
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

  const { scene, nodeList, linkList, setNodePosition } = useNodePhysics(
    initialNodes,
    initialLinkList
  );

  return (
    <main className="flex min-h-screen flex-col items-start justify-start overflow-hidden p-24 bg-slate-950">
      <div ref={scene} className="h-screen w-screen absolute top-0 left-0" />
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
          />
        ))}
      </svg>
      {nodeList.map((component, index) => (
        <motion.div
          key={index}
          drag={true}
          whileDrag={{ scale: 1.1 }}
          whileHover={{ scale: 1.2 }}
          onDrag={(event, info) => {
            setNodePosition(index, info.point.x, info.point.y);
          }}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.0}
          style={{
            position: "absolute",
            left: nodeList[index].x - 40,
            top: nodeList[index].y - 40,
            // width: 40,
            // height: 40,
            // backgroundColor: "white",
            // borderRadius: "100%",
            // transform: `translate(${nodeList[index].x - 20}px, ${
            //   nodeList[index].y - 20
            // }px)`,
          }}
        >
          {component.content}
        </motion.div>
      ))}
    </main>
  );
}
