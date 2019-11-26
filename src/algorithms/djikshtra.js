const djikshtra = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    //if we encounter a wall, skip it
    if (closestNode.isWall) continue;
    //if the closest node is at a distance of infinity
    //We must be trapped and should therefore stop
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbours(closestNode, grid);
  }
};

const sortNodesByDistance = unvisitedNodes => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbours = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbour of unvisitedNeighbors) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
  }
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbours = [];
  const { row, col } = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter(neighbour => !neighbour.isVisited);
};

const getAllNodes = grid => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

//Backtracks from the finishNode to find the shortest path
//Only works when called *after* the djikshtra method above
const getNodesInShortestPathOrder = finishNode => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

const animateShortestPath = nodesInShortestPathOrder => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    if (i === nodesInShortestPathOrder.length - 1) {
      document.getElementById("maze").disabled = false;
      document.getElementById("clearmaze").disabled = false;
      document.getElementById("clearpath").disabled = false;
      document.getElementById("visualise").disabled = false;
      document.getElementById("clearboard").disabled = false;
    }
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node-shortest-path";
    }, 75 * i);
  }
};

const animateDjikshtra = (
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  timeout
) => {
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, timeout * i);
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      if (!node.isStart && !node.isFinish)
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited";
    }, timeout * i);
  }
};

export const visualiseDjikshtra = (
  grid,
  startrow,
  startcol,
  finishrow,
  finishcol,
  speed
) => {
  const startNode = grid[startrow][startcol];
  const finishNode = grid[finishrow][finishcol];
  const visitedNodesInOrder = djikshtra(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  let timeout;
  if (speed === "Fast") timeout = 10;
  else if (speed === "Average") timeout = 35;
  else if (speed === "Slow") timeout = 70;
  animateDjikshtra(visitedNodesInOrder, nodesInShortestPathOrder, timeout);
};
