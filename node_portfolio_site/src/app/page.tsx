"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Engine, Render, Bodies, World } from "matter-js";
import Matter from "matter-js";

export default function Home() {
  const scene = useRef(null);
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

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

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.circle(150, 0, 10, {
        restitution: 0.9,
        render: {
          fillStyle: "yellow",
        },
      }),
    ]);

    Matter.Runner.run(engine.current);
    Render.run(render);

    return () => {
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950">
      {/* <motion.div
            className="bg-white w-20 h-20 rounded-full"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8, borderRadius: "100%" }}
            drag={true}
            dragConstraints={{ left: -0, right: 0, top: -0, bottom: 0 }}
            dragElastic={0.5}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
            dragSnapToOrigin={true}
        /> */}
      <div ref={scene} style={{ width: "100%", height: "100%" }} />
    </main>
  );
}
