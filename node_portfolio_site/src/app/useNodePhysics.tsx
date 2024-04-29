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
import { throttle } from "throttle-debounce";

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

function useNodePhysics(
  initialNodeList: Node[],
  initialLinkList: nameLink[],
  debug: boolean
) {
  const NODERADIUS = 40;
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
    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight;
    window.addEventListener("resize", resizeHandler);

    // Create render scene
    const render = Render.create({
      element: scene.current!,
      engine: engine.current,

      options: {
        width: clientWidth,
        height: clientHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    // Disable gravity
    engine.current.gravity.scale = 0.0;

    // Create simulation bodies
    nodeList.forEach((node) => {
      const body = Bodies.circle(node.x, node.y, NODERADIUS, {
        //TODO: make size dynamic
        restitution: 1,
        render: {
          fillStyle: "yellow",
          visible: false,
        },
      });
      World.add(engine.current.world, body);
    });

    // Create links between nodes
    linkList.forEach((link) => {
      const constraint = Constraint.create({
        bodyA: engine.current.world.bodies[link.source],
        bodyB: engine.current.world.bodies[link.target],
        length: (clientWidth + clientHeight) / 10,
        stiffness: 0.00004,
      });
      World.add(engine.current.world, constraint);
    });

    // Add rectangle bounding boxes
    World.add(engine.current.world, [
      Bodies.rectangle(clientWidth / 2, 0, clientWidth, 20, {
        isStatic: true,
        restitution: 1,
      }),
      Bodies.rectangle(0, clientHeight / 2, 10, clientHeight, {
        isStatic: true,
        restitution: 1,
      }),
      Bodies.rectangle(clientWidth / 2, clientHeight, clientWidth, 20, {
        isStatic: true,
        restitution: 1,
      }),
      Bodies.rectangle(clientWidth, clientHeight / 2, 20, clientHeight, {
        isStatic: true,
        restitution: 1,
      }),
    ]);

    // Debug renderer and mouse control
    if (debug) {
      Render.run(render);
      // Create mouse constraint
      // var mouse = Mouse.create(render.canvas);
      // var mouseConstraint = MouseConstraint.create(engine.current, {
      //   mouse: mouse,
      //   constraint: {
      //     render: {
      //       visible: false,
      //     },
      //   },
      // });
      // Composite.add(engine.current.world, mouseConstraint);
    }

    // run the engine loop
    function update(): void {
      Matter.Engine.update(engine.current, 1000 / 60);
      updateNodePositions();
      repelNodes();
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
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // Sets the position of a specific node
  function setNodePosition(index: number, newX: number, newY: number) {
    newX = Math.max(
      NODERADIUS + 5,
      Math.min(newX, window.innerWidth - NODERADIUS - 5)
    );
    newY = Math.max(
      NODERADIUS + 5,
      Math.min(newY, window.innerHeight - NODERADIUS - 5)
    );
    Matter.Body.setPosition(engine.current.world.bodies[index], {
      x: newX,
      y: newY,
    });
  }
  // Reposition boundary rectangles
  const resizeHandler = throttle(100, () => {
    // Update boundary box positions
    Matter.Body.setPosition(
      engine.current.world.bodies[engine.current.world.bodies.length - 4],
      {
        x: window.innerWidth / 2,
        y: 0,
      }
    );
    Matter.Body.setPosition(
      engine.current.world.bodies[engine.current.world.bodies.length - 3],
      {
        x: 0,
        y: window.innerHeight / 2,
      }
    );
    Matter.Body.setPosition(
      engine.current.world.bodies[engine.current.world.bodies.length - 2],
      {
        x: window.innerWidth / 2,
        y: window.innerHeight,
      }
    );
    Matter.Body.setPosition(
      engine.current.world.bodies[engine.current.world.bodies.length - 1],
      {
        x: window.innerWidth,
        y: window.innerHeight / 2,
      }
    );

    //TODO: fix this
    nodeList.forEach((node, index) => {
      if (node.x > window.innerWidth + 10) {
        Matter.Body.setPosition(engine.current.world.bodies[index], {
          x: 1,
          y: 1,
        });
      }
      if (node.y > window.innerHeight + 10) {
        node.y = window.innerHeight - NODERADIUS;
      }
    });
  });

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

  function repelNodes() {
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        let force = Vector.sub(
          engine.current.world.bodies[i].position,
          engine.current.world.bodies[j].position
        );
        let distance = Vector.magnitude(force);
        force = Vector.normalise(force);
        force = Vector.mult(force, 0.6 / (distance * distance));
        applyForce(i, force);
        applyForce(j, Vector.neg(force));
      }
    }
  }

  function applyForce(index: number, force: Vector) {
    Matter.Body.applyForce(
      engine.current.world.bodies[index],
      engine.current.world.bodies[index].position,
      force
    );
  }

  return { scene, nodeList, linkList, setNodePosition };
}

export default useNodePhysics;
