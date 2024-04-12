import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

type Node = {
  id: string;
  content: JSX.Element;
  x: number;
  y: number;
};

type nameLink = {
  source: string;
  target: string;
};
type link = {
  source: number;
  target: number;
};

function usePhysics(initialNodeList: Node[], initialLinkList: nameLink[]) {
  const DEBUG = true;
  const scene = useRef(null);
  const engine = useRef(Engine.create());

  const [nodeList, setNodeList] = useState<Node[]>(initialNodeList);
  const [linkList, setLinkList] = useState<link[]>(() => {
    // Create link list based on indexes of nodes instead of their names
    let newLinkList = [];
    for (let i = 0; i < initialLinkList.length; i++) {
      let sourceIndex = -1;
      let targetIndex = -1;
      for (let j = 0; j < nodeList.length; j++) {
        if (nodeList[j].id === initialLinkList[i].source) {
          sourceIndex = j;
        } else if (nodeList[j].id === initialLinkList[i].target) {
          targetIndex = j;
        }
      }
      // Add link if both source and target nodes are found
      if (sourceIndex !== -1 && targetIndex !== -1) {
        newLinkList.push({ source: sourceIndex, target: targetIndex });
      } else {
        console.log("Error: Node not found in nodeList for link");
      }
    }
    return newLinkList;
  });

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
    });

    // Create links between nodes
    linkList.forEach((link) => {
      const constraint = Constraint.create({
        bodyA: engine.current.world.bodies[link.source],
        bodyB: engine.current.world.bodies[link.target],
        length: 100,
        stiffness: 0.00004,
      });
      World.add(engine.current.world, constraint);
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

  const setNodePosition = useCallback(
    (index: number, newX: number, newY: number) => {
      setNodeList((prevState) => {
        let newPos = [...prevState];
        newPos[index] = {
          id: prevState[index].id,
          content: prevState[index].content,
          x: newX,
          y: newY,
        };
        return newPos;
      });
    },
    []
  );
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

  return { scene, nodeList, linkList, setNodePosition };
}

export default usePhysics;
