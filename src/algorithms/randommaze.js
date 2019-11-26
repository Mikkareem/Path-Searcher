export const randommaze = grid => {
  let rows = grid.length;
  let columns = grid[0].length;
  let walls = [];
  while (walls.length < 250) {
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * columns);
    let currentNode = grid[row][col];
    // if (currentNode.isWall) {
    //   console.log(document.getElementById(`node-${row}-${col}`));
    // }
    if (!currentNode.isStart && !currentNode.isFinish && !currentNode.isWall) {
      currentNode.isWall = true;
      walls.push(currentNode);
    }
  }

  walls.forEach(wall => {
    document.getElementById(`node-${wall.row}-${wall.col}`).className =
      "node-wall";
  });
};
