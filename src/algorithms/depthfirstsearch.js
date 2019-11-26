const depthFirstSearch = (grid, startNode, finishNode) => {
  const stack = [];
  stack.push(startNode);
  startNode.isVisited = true;

  const visitedNodesInOrder = [];
  while (stack.length !== 0) {
    let currentNode = stack.pop();

    if (currentNode.isWall) continue;

    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;

    let neighbours = getNeighbours(grid, currentNode);

    neighbours.forEach(neighbour => {
      neighbour.isVisited = true;
      neighbour.previousNode = currentNode;
      stack.push(neighbour);
    });
  }

  return visitedNodesInOrder;
};

const getNeighbours = (grid, node) => {
  const neighbours = [];
  const { row, col } = node;

  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);

  return neighbours.filter(neighbour => !neighbour.isVisited);
};

const getNodesInShortestPathOrder = node => {
  const nodesInShortestPathOrder = [];
  let currentNode = node;
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

const animateDFS = (visitedNodesInOrder, nodesInShortestPathOrder, timeout) => {
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

export const visualiseDFS = (
  grid,
  startrow,
  startcol,
  finishrow,
  finishcol,
  speed
) => {
  const startNode = grid[startrow][startcol];
  const finishNode = grid[finishrow][finishcol];
  const visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  let timeout;
  if (speed === "Fast") timeout = 10;
  else if (speed === "Average") timeout = 35;
  else if (speed === "Slow") timeout = 70;
  animateDFS(visitedNodesInOrder, nodesInShortestPathOrder, timeout);
};
