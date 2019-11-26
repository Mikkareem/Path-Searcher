import React, { useState } from "react";
import Header from "./Header";
import Board from "./Board";

const PathSearcher = () => {
  const Algorithms = ["Djiksthra", "BFS", "DFS"];
  const Speeds = ["Fast", "Average", "Slow"];
  const Mazes = ["Random Maze", "Staircase"];

  const [algorithm, setalgorithm] = useState(Algorithms[0]);
  const [speed, setspeed] = useState(Speeds[0]);
  const [maze, setmaze] = useState(Mazes[0]);

  return (
    <>
      <Header
        Algorithms={Algorithms}
        Speeds={Speeds}
        Mazes={Mazes}
        algorithm={algorithm}
        changeAlgorithm={algorithm => setalgorithm(algorithm)}
        changeMaze={maze => setmaze(maze)}
        speed={speed}
        maze={maze}
        changeSpeed={speed => setspeed(speed)}
      />
      <Board algorithm={algorithm} speed={speed} maze={maze} />
    </>
  );
};

export default PathSearcher;
