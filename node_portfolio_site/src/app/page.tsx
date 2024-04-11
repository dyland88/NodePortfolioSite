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

export default function Home() {
  const DEBUG = true;
  const scene = useRef(null);
  const engine = useRef(Engine.create());

  const [dragState, setDragState] = useState({ dragItem: -1, x: 0, y: 0 });

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
      <img
        src={"/assets/Profile Pic.jpeg"}
        style={{ width: 100, height: 100 }}
        alt="image"
      />
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

  const [nodeList, setNodeList] = useState([
    { id: "hello", content: <ComponentOne />, x: 100, y: 100 },
    { id: "world", content: <ComponentTwo />, x: 50, y: 50 },
    { id: "three", content: <ComponentTwo />, x: 150, y: 400 },
  ]);
  const linkList = [
    { source: "hello", target: "world" },
    { source: "world", target: "three" },
    { source: "three", target: "hello" },
  ];

  useEffect(() => {
    const cw = scene.current.offsetWidth;
    const ch = scene.current.offsetHeight;

    // Create render scene
    const render = Render.create({
      element: scene.current!,
      engine: engine.current,

      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    // Disable gravity
    engine.current.gravity.scale = 0.0;

    // Create simulation bodies
    nodeList.forEach((node) => {
      const body = Bodies.circle(node.x, node.y, 20, {
        restitution: 1,
        render: {
          fillStyle: "yellow",
        },
      });
      World.add(engine.current.world, body);
      console.log(body.position.x, body.position.y);
    });

    // Create links between nodes
    linkList.forEach((link) => {
      const sourceNode = nodeList.find((node) => node.id === link.source);
      const targetNode = nodeList.find((node) => node.id === link.target);

      if (sourceNode && targetNode) {
        const constraint = Constraint.create({
          bodyA: engine.current.world.bodies[nodeList.indexOf(sourceNode)],
          bodyB: engine.current.world.bodies[nodeList.indexOf(targetNode)],
          length: 100,
          stiffness: 0.00004,
        });

        World.add(engine.current.world, constraint);
      }
    });

    // Add rectangle bounding boxes
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true, restitution: 1 }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true, restitution: 1 }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, {
        isStatic: true,
        restitution: 1,
      }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, {
        isStatic: true,
        restitution: 1,
      }),
    ]);

    // Debug renderer and mouse control
    if (DEBUG) {
      Render.run(render);
      // Create mouse constraint
      var mouse = Mouse.create(render.canvas);
      var mouseConstraint = MouseConstraint.create(engine.current, {
        mouse: mouse,
        constraint: {
          render: {
            visible: false,
          },
        },
      });
      Composite.add(engine.current.world, mouseConstraint);
    }

    // run the engine loop
    function update(): void {
      Matter.Engine.update(engine.current, 1000 / 60);
      updateNodePositions();
      window.requestAnimationFrame(update);
    }

    window.requestAnimationFrame(update);

    // Clean up
    return () => {
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  // Update all node positions
  function updateNodePositions() {
    for (let i = 0; i < nodeList.length; i++) {
      setNodeList((prevState) => {
        let newPos = [...prevState];
        newPos[i] = {
          id: prevState[i].id,
          content: prevState[i].content,
          x: engine.current.world.bodies[i].position.x,
          y: engine.current.world.bodies[i].position.y,
        };
        return newPos;
      });
    }
  }

  // Update drag item position
  useEffect(() => {
    if (dragState.dragItem != -1) {
      Matter.Body.setPosition(engine.current.world.bodies[dragState.dragItem], {
        x: dragState.x,
        y: dragState.y,
      });
    }
  }, [dragState]);

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
          key={index}
          drag={true}
          whileDrag={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          onDrag={(event, info) => {
            setDragState({ dragItem: index, x: info.point.x, y: info.point.y });
          }}
          onDragEnd={(event, info) => {
            setDragState({ dragItem: -1, x: info.point.x, y: info.point.y });
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
