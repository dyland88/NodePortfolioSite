import { useState, useEffect, useRef, useMemo } from "react";
import { Engine, Render, Bodies, World, Vector, Constraint } from "matter-js";
import Matter from "matter-js";
import { throttle } from "throttle-debounce";

type Node = {
  id: string;
  content: JSX.Element;
  x: number;
  y: number;
  visible: boolean;
  childrenVisible: boolean;
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
  const lastTimeUpdated = useRef(Date.now());

  const [nodeList, setNodeList] = useState<Node[]>(initialNodeList);
  const linkList = useMemo<link[]>(() => {
    // Create link list based on indexes of nodes instead of their names
    let newLinkList = [];
    for (let i = 0; i < initialLinkList.length; i++) {
      let sourceIndex = -1;
      let targetIndex = -1;
      for (let j = 0; j < initialNodeList.length; j++) {
        if (initialNodeList[j].id === initialLinkList[i].source) {
          sourceIndex = j;
        } else if (initialNodeList[j].id === initialLinkList[i].target) {
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
  }, [initialLinkList, initialNodeList]);

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
        restitution: 0.2,
        frictionAir: 0.04,
        render: {
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
        stiffness: 0.004,
        damping: 0.04,
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

    // Debug renderer
    if (debug) {
      Render.run(render);
    }

    // run the engine loop
    window.requestAnimationFrame(update);
    function update(): void {
      // Prevent deltaTime from being to large if tab is inactive
      const deltaTime = Math.min(
        Date.now() - lastTimeUpdated.current,
        1000 / 15
      );

      repelNodes(1.0);
      centerNodes(1.0);
      Matter.Engine.update(engine.current, deltaTime);
      updateNodePositions();
      lastTimeUpdated.current = Date.now();
      window.requestAnimationFrame(update);
    }

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

  // Applies force to node at index
  function applyForce(index: number, force: Vector) {
    Matter.Body.applyForce(
      engine.current.world.bodies[index],
      engine.current.world.bodies[index].position,
      force
    );
  }

  // Reposition boundary rectangles
  const resizeHandler = throttle(50, () => {
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

    // reset out-of-bounds nodes
    nodeList.forEach((node, index) => {
      if (
        engine.current.world.bodies[index].position.x >
        window.innerWidth + 20
      ) {
        Matter.Body.setPosition(engine.current.world.bodies[index], {
          x: window.innerWidth - NODERADIUS,
          y: engine.current.world.bodies[index].position.y,
        });
      }
      if (
        engine.current.world.bodies[index].position.y >
        window.innerHeight + 20
      ) {
        Matter.Body.setPosition(engine.current.world.bodies[index], {
          x: engine.current.world.bodies[index].position.x,
          y: window.innerHeight - NODERADIUS,
        });
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
          visible: prevState[i].visible,
          childrenVisible: prevState[i].childrenVisible,
        };
        return newPos;
      });
    }
  }

  function toggleChildNodeVisibility(index: number) {
    let newState = !nodeList[index].childrenVisible;
    nodeList[index].childrenVisible = newState;
    for (let i = 0; i < linkList.length; i++) {
      if (linkList[i].source == index) {
        nodeList[linkList[i].target].visible = newState;
        if (
          newState == false &&
          nodeList[linkList[i].target].childrenVisible == true
        ) {
          console.log("setting node " + index + " to " + newState);
          toggleChildNodeVisibility(linkList[i].target);
        }
      }
    }
  }

  //Apply a repellent force between all nodes
  function repelNodes(multiplier: number = 1.0) {
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        if (
          linkList.find(
            (link) =>
              (link.source == i && link.target == j) ||
              (link.source == j && link.target == i)
          ) !== undefined
        ) {
          continue;
        }
        let force = Vector.sub(
          engine.current.world.bodies[i].position,
          engine.current.world.bodies[j].position
        );
        let distance = Vector.magnitude(force);
        force = Vector.normalise(force);
        force = Vector.mult(force, (multiplier * 6) / (distance * distance));
        applyForce(i, force);
        applyForce(j, Vector.neg(force));
      }
    }
  }

  // Apply force to center nodes on screen
  function centerNodes(multiplier: number = 1.0) {
    let center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    // Apply force to center nodes
    for (let i = 0; i < 1; i++) {
      let force = Vector.sub(center, engine.current.world.bodies[i].position);
      let distance = Vector.magnitude(force);
      force = Vector.normalise(force);
      force = Vector.mult(force, multiplier * 0.000006 * distance);
      applyForce(i, force);
    }
  }

  return {
    scene,
    nodeList,
    linkList,
    setNodePosition,
    setNodeVisibility: toggleChildNodeVisibility,
  };
}

export default useNodePhysics;
