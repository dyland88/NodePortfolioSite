"use client";
import Image from "next/image";
import {
  motion,
  useForceUpdate,
  useMotionValue,
  DragControls,
  useDragControls,
} from "framer-motion";
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
  const nodes = [
    { id: 0, name: "hello" },
    { id: 1, name: "world" },
  ];
  const links = [{ source: 0, target: 1 }];
  const scene = useRef(null);
  const engine = useRef(Engine.create());
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [dragState, setDragState] = useState({ dragging: false, x: 0, y: 0 });

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

    // Create bodies
    const body1 = Bodies.circle(300, 300, 10, {
      restitution: 1,
      render: {
        fillStyle: "yellow",
      },
    });
    const body2 = Bodies.circle(600, 600, 10, {
      restitution: 1,
      render: {
        fillStyle: "yellow",
      },
    });
    const body3 = Bodies.circle(400, 300, 10, {
      restitution: 1,
      render: {
        fillStyle: "yellow",
      },
    });
    var constraint1 = Constraint.create({
      bodyA: body1,
      bodyB: body2,
      length: 100,
      stiffness: 0.00004,
    });
    var constraint2 = Constraint.create({
      bodyA: body1,
      bodyB: body3,
      length: 100,
      stiffness: 0.00004,
    });
    // Add bodies
    World.add(engine.current.world, [
      body1,
      body2,
      body3,
      constraint1,
      constraint2,
    ]);

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

    // Run the renderer for debugging
    Render.run(render);

    // run the engine loop
    function update(): void {
      Matter.Engine.update(engine.current, 1000 / 60);
      setBallPos({
        x: engine.current.world.bodies[0].position.x,
        y: engine.current.world.bodies[0].position.y,
      });

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

  useEffect(() => {
    if (dragState.dragging) {
      Matter.Body.setPosition(engine.current.world.bodies[0], {
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
      <div
        style={
          {
            // backgroundColor: "white",
            // borderRadius: "100%",
          }
        }
      >
        <motion.div
          drag={true}
          whileDrag={{ scale: 0.9 }}
          whileHover={{ scale: 1.2 }}
          onDrag={(event, info) => {
            setDragState({ dragging: true, x: info.point.x, y: info.point.y });
            console.log(dragState);
          }}
          onDragEnd={(event, info) => {
            setDragState({ dragging: false, x: info.point.x, y: info.point.y });
          }}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.0}
          style={{
            position: "absolute",
            left: ballPos.x - 20,
            top: ballPos.y - 20,
            width: 40,
            height: 40,
            backgroundColor: "white",
            borderRadius: "100%",
          }}
        ></motion.div>
      </div>
    </main>
  );
}
