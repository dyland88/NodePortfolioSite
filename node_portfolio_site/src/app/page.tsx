"use client";
import Image from "next/image";
import { motion, useForceUpdate, useMotionValue } from "framer-motion";
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
    Matter.use("matter-attractors");
    engine.current.gravity.scale = 0.0;

    const body1 = Bodies.circle(300, 300, 10, {
      restitution: 1,
      render: {
        fillStyle: "yellow",
      },
      plugin: {
        plugin: {
          attractors: [
            function (bodyA, bodyB) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 1e-2,
                y: (bodyA.position.y - bodyB.position.y) * 1e-2,
              };
            },
          ],
        },
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

    World.add(engine.current.world, [
      body1,
      body2,
      body3,
      // constraint1,
      // constraint2,
    ]);

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

    // Add bodies
    World.add(engine.current.world, [
      // Bodies.circle(300, 0, 10, {
      //   restitution: 1,
      //   render: {
      //     fillStyle: "yellow",
      //   },
      // }),
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
      <motion.div
        style={{
          position: "absolute",
          left: ballPos.x,
          top: ballPos.y,
          //backgroundColor: "white",
          borderRadius: "100%",
        }}
        whileHover={{ scale: 1.2 }}
      >
        <p>hello</p>
      </motion.div>
    </main>
  );
}
