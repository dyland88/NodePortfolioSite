'use client';
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { Square } from "./square";
import { useState } from "react";



const grid = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]];
const size = 60;
const gap = 10;


export default function Home() {
    const [active, setActive] = useState({ row: 0, col: 0 });
    const x = useMotionValue(0);
    const y = useMotionValue(0);

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950">

          <motion.div
              className="bg-white w-20 h-20 rounded-full"
              whileHover={{scale: 1.2}}
              whileTap={{scale: 0.8, borderRadius: "100%"}}
              drag={true}
              dragConstraints={{left: -0, right: 0, top: -0, bottom: 0}}
              dragElastic={0.5}
              dragTransition={{bounceStiffness: 100, bounceDamping: 10}}
              dragSnapToOrigin={true}
          />
          {/*<motion.div*/}
          {/*    style={{*/}
          {/*        display: "flex",*/}
          {/*        width: (size + gap) * 4 - gap,*/}
          {/*        height: (size + gap) * 4 - gap,*/}
          {/*        top: "50%",*/}
          {/*        left: "50%",*/}
          {/*        transform: "translate(-50%, -50%)",*/}
          {/*        position: "relative",*/}
          {/*        perspective: 500*/}
          {/*    }}*/}
          {/*>*/}
          {/*    {grid.map((row, rowIndex) =>*/}
          {/*        row.map((_item, colIndex) => (*/}
          {/*            <Square*/}
          {/*                x={x}*/}
          {/*                y={y}*/}
          {/*                active={active}*/}
          {/*                setActive={setActive}*/}
          {/*                rowIndex={rowIndex}*/}
          {/*                colIndex={colIndex}*/}
          {/*                key={rowIndex + colIndex}*/}
          {/*            />*/}
          {/*        ))*/}
          {/*    )}*/}
          {/*</motion.div>*/}
      </main>
  );
}
