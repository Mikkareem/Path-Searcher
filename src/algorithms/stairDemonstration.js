export const stairDemonstration = grid => {
    let currentIDX = grid.length - 1;
    let currentIDY = 0;

    let wallNodes = [];

    while(currentIDX > 1 && currentIDY < grid[0].length) {
        let currentNode = grid[currentIDX][currentIDY];
        if(!currentNode.isStart && !currentNode.isFinish) {
            currentNode.isWall = true;
            wallNodes.push(currentNode);
        }
        currentIDX--;
        currentIDY++;
    }

    while(currentIDX < grid.length - 2 && currentIDY < grid[0].length) {
        let currentNode = grid[currentIDX][currentIDY];
        if(!currentNode.isStart && !currentNode.isFinish) {
            currentNode.isWall = true;
            wallNodes.push(currentNode);
        }
        currentIDX++;
        currentIDY++;
    }

    while(currentIDX > 0 && currentIDY < grid[0].length) {
        let currentNode = grid[currentIDX][currentIDY];
        if(!currentNode.isStart && !currentNode.isFinish) {
            currentNode.isWall = true;
            wallNodes.push(currentNode);
        }
        currentIDX--;
        currentIDY++;
    }

    wallNodes.forEach(node => {
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node-wall';
    });
}

