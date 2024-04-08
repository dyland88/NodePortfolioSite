"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Engine, Render, Bodies, World, Vector } from "matter-js";
import Matter from "matter-js";

export default function Home() {
  const scene = useRef(null);
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());
  const [ballPos, setBallPos] = useState(Vector.create(0, 0));

  useEffect(() => {
    const cw = scene.current.offsetWidth;
    const ch = scene.current.offsetHeight;

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
    engine.current.gravity.scale = 0.00001;

    // Add bodies
    World.add(engine.current.world, [
      // Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      // Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      // Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      // Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.circle(300, 0, 10, {
        restitution: 0.9,
        render: {
          fillStyle: "yellow",
        },
      }),
    ]);

    // Run simulation and render
    Matter.Runner.run(engine.current);
    Render.run(render);

    Matter.Events.on(engine.current, "afterUpdate", function () {
      window.requestAnimationFrame(update);

      //setBallPos(engine.current.world.bodies[0].position);

      //console.log(engine.current.world.bodies[0].position);
    });

    // Clean up
    return () => {
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  function update(): void {
    setBallPos(engine.current.world.bodies[0].position);
  }

  const mousePosition = useMousePosition();
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
      {/* <motion.div
        className="bg-white w-20 h-20 rounded-full"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8, borderRadius: "100%" }}
        drag={true}
        dragConstraints={{ left: -0, right: 0, top: -0, bottom: 0 }}
        dragElastic={0.5}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
        dragSnapToOrigin={true}
        style={{
          position: "absolute",
          top: ballPos.y,
          left: ballPos.x,
        }}
      /> */}
      <div
        className="bg-white w-20 h-20 rounded-full"
        style={{ position: "absolute", top: ballPos.y, left: ballPos.x }}
      ></div>
      <p>
        {mousePosition.x}, {mousePosition.y}
      </p>
    </main>
  );
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};
