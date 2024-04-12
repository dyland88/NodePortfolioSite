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
import usePhysics from "./usePhysics";

export default function Home() {
  const ComponentOne = () => (
    <div
      style={{
        minWidth: 40,
        minHeight: 40,
        backgroundColor: "red",
        borderRadius: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <p>Hello</p>
    </div>
  );
  const ComponentTwo = () => (
    <div
      style={{
        width: 40,
        height: 40,
        backgroundColor: "blue",
        borderRadius: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <p>World</p>
    </div>
  );

  const initialNodes = [
    { id: "hello", content: <ComponentOne />, x: 100, y: 100 },
    { id: "world", content: <ComponentTwo />, x: 50, y: 50 },
    { id: "three", content: <ComponentTwo />, x: 150, y: 400 },
  ];
  const initialLinkList = [
    { source: "hello", target: "world" },
    { source: "world", target: "three" },
    { source: "three", target: "hello" },
  ];

  const { scene, nodeList, linkList, setNodePosition } = usePhysics(
    initialNodes,
    initialLinkList
  );

  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-24 bg-slate-950">
      <div
        ref={scene}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      {nodeList.map((component, index) => (
        <motion.div
          id={index}
          drag={true}
          whileDrag={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          onDrag={(event, info) => {
            setNodePosition(index, info.point.x, info.point.y);
          }}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.0}
          style={{
            position: "absolute",
            left: nodeList[index].x - 20,
            top: nodeList[index].y - 20,
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
