import React from "react";
import Node from "./Node";
import { visualiseBFS } from "../algorithms/breadthfirstsearch";
import { visualiseDFS } from "../algorithms/depthfirstsearch";
import { visualiseDjikshtra } from "../algorithms/djikshtra";
import { stairDemonstration } from "../algorithms/stairDemonstration";
import { randommaze } from "../algorithms/randommaze";

const length = 56;
const height = 20;

const START_NODE_ROW = Math.floor(Math.random() * height);
const START_NODE_COLUMN = Math.floor(Math.random() * (length / 2) + 1);
const FINISH_NODE_ROW = Math.floor(Math.random() * height);
const FINISH_NODE_COLUMN = Math.floor(
  Math.random() * (length - 2 - length / 2 + 1) + length / 2
);

const Board = props => {
  const [grid, setgrid] = React.useState([]);
  const [mouseIsPressed, setmouseIsPressed] = React.useState(false);

  React.useEffect(() => {
    const grid = getInitialGrid();
    setgrid(grid);
  }, [setgrid]);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setgrid(newGrid);
    setmouseIsPressed(true);
  };

  const handleMouseUp = () => {
    setmouseIsPressed(false);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setgrid(newGrid);
  };

  const visualise = () => {
    document.getElementById("maze").disabled = true;
    document.getElementById("clearmaze").disabled = true;
    document.getElementById("clearpath").disabled = true;
    document.getElementById("visualise").disabled = true;
    document.getElementById("clearboard").disabled = true;
    if (props.algorithm === "BFS")
      visualiseBFS(
        grid,
        START_NODE_ROW,
        START_NODE_COLUMN,
        FINISH_NODE_ROW,
        FINISH_NODE_COLUMN,
        props.speed
      );
    else if (props.algorithm === "DFS")
      visualiseDFS(
        grid,
        START_NODE_ROW,
        START_NODE_COLUMN,
        FINISH_NODE_ROW,
        FINISH_NODE_COLUMN,
        props.speed
      );
    else if (props.algorithm === "Djiksthra")
      visualiseDjikshtra(
        grid,
        START_NODE_ROW,
        START_NODE_COLUMN,
        FINISH_NODE_ROW,
        FINISH_NODE_COLUMN,
        props.speed
      );
  };

  const maze = () => {
    console.log(props.maze);
    if (props.maze === "Random Maze") randommaze(grid);
    if (props.maze === "Staircase") stairDemonstration(grid);
  };

  const clearMaze = grid => {
    const newGrid = resetGrid(grid);
    setgrid(newGrid);
  };

  const clearBoard = grid => {
    const newGrid = clearGrid(grid);
    setgrid(newGrid);
  };

  const clearPath = grid => {
    const newGrid = clearPathGrid(grid);
    setgrid(newGrid);
  };

  return (
    <React.Fragment>
      <div className="buttons">
        <button id="clearboard" onClick={() => clearBoard(grid)}>
          Clear Board
        </button>
        <button id="clearpath" onClick={() => clearPath(grid)}>
          Clear Path
        </button>
        <button id="visualise" onClick={() => visualise()}>
          Visualise {props.algorithm}
        </button>
        <button id="maze" onClick={() => maze()}>
          Maze
        </button>
        <button id="clearmaze" onClick={() => clearMaze(grid)}>
          Clear Maze
        </button>
      </div>

      <table border={1}>
        {grid.map((row, rowId) => {
          return (
            <tr key={rowId}>
              {row.map((node, nodeId) => {
                return (
                  <Node
                    key={nodeId}
                    row={node.row}
                    col={node.col}
                    isStart={node.isStart}
                    isFinish={node.isFinish}
                    isWall={node.isWall}
                    onMouseDown={() => handleMouseDown(node.row, node.col)}
                    onMouseUp={() => handleMouseUp()}
                    onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                  />
                );
              })}
            </tr>
          );
        })}
      </table>
    </React.Fragment>
  );
};

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < height; row++) {
    let currentRow = [];
    for (let col = 0; col < length; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }

  return grid;
};

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COLUMN,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COLUMN,
    isWall: false,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
    totalDistance: 0,
    g: 0,
    heuristic: 0
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
};

const resetGrid = grid => {
  const newGrid = grid.slice();
  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[row].length; col++) {
      const node = newGrid[row][col];
      const newNode = {
        ...node,
        isWall: false,
        isVisited: false,
        distance: Infinity
      };
      newGrid[row][col] = newNode;
      if (
        document.getElementById(`node-${row}-${col}`).className === "node-wall"
      ) {
        document.getElementById(`node-${row}-${col}`).className = "node ";
      }
    }
  }
  return newGrid;
};

const clearGrid = grid => {
  const newGrid = grid.slice();
  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[row].length; col++) {
      const node = newGrid[row][col];
      if (!node.isStart && !node.isFinish) {
        node.isWall = false;
        node.distance = Infinity;
        node.isVisited = false;
        node.previousNode = null;
        node.totalDistance = 0;
        node.g = 0;
        node.heuristic = 0;
        document.getElementById(`node-${row}-${col}`).className = "node ";
      } else if (node.isStart) {
        document.getElementById(`node-${row}-${col}`).className =
          "node node-start";
        node.isVisited = false;
      } else if (node.isFinish) {
        document.getElementById(`node-${row}-${col}`).className =
          "node node-finish";
        node.isVisited = false;
      }
      newGrid[row][col] = node;
    }
  }
  return newGrid;
};

const clearPathGrid = grid => {
  const newGrid = grid.slice();
  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[row].length; col++) {
      const node = newGrid[row][col];
      if (!node.isStart && !node.isFinish && !node.isWall) {
        node.distance = Infinity;
        node.isVisited = false;
        node.previousNode = null;
        document.getElementById(`node-${row}-${col}`).className = "node ";
      } else if (node.isStart) {
        document.getElementById(`node-${row}-${col}`).className =
          "node node-start";
        node.isVisited = false;
      } else if (node.isFinish) {
        document.getElementById(`node-${row}-${col}`).className =
          "node node-finish";
        node.isVisited = false;
      }
      newGrid[row][col] = node;
    }
  }
  return newGrid;
};

export default Board;
