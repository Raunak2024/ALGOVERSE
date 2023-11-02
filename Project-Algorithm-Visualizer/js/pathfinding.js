const GRID_SIZE = 10;
const gridContainer = document.getElementById("grid-container");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
let grid = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(0));
let startNode = [2, 2];
let endNode = [7, 7];
let isDrawingStart = false;
let isDrawingEnd = false;
let isDrawingWall = false;
let isPathfinding = false;

function createGrid() {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const node = document.createElement("div");
            node.classList.add("grid-item");
            node.dataset.row = i;
            node.dataset.col = j;
            gridContainer.appendChild(node);
            grid[i][j] = node;

            node.addEventListener("mousedown", handleMouseDown);
            node.addEventListener("mouseup", handleMouseUp);
            node.addEventListener("mouseover", handleMouseOver);
        }
    }
}

function clearGrid() {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const node = grid[i][j];
            node.classList.remove("start-node", "end-node", "wall-node", "visited-node", "shortest-path-node");
        }
    }
}

function handleMouseDown(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (isPathfinding) return;

    if (row === startNode[0] && col === startNode[1]) {
        isDrawingStart = true;
    } else if (row === endNode[0] && col === endNode[1]) {
        isDrawingEnd = true;
    } else {
        isDrawingWall = true;
        event.target.classList.add("wall-node");
    }
}

function handleMouseUp() {
    isDrawingStart = false;
    isDrawingEnd = false;
    isDrawingWall = false;
}

function handleMouseOver(event) {
    if (isPathfinding) return;
    
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (isDrawingStart) {
        grid[startNode[0]][startNode[1]].classList.remove("start-node");
        startNode = [row, col];
        event.target.classList.add("start-node");
    } else if (isDrawingEnd) {
        grid[endNode[0]][endNode[1]].classList.remove("end-node");
        endNode = [row, col];
        event.target.classList.add("end-node");
    } else if (isDrawingWall) {
        event.target.classList.add("wall-node");
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizePathfinding(path) {
    isPathfinding = true;
    for (let node of path) {
        const [row, col] = node;
        grid[row][col].classList.add("visited-node");
        await sleep(50);
    }
    isPathfinding = false;
}

function resetGrid() {
    clearGrid();
    startNode = [2, 2];
    endNode = [7, 7];
}

startBtn.addEventListener("click", async () => {
    if (isPathfinding) return;

    resetGrid();
    clearGrid();
    
    const path = await pathfindingAlgorithm();
    if (path) {
        visualizePathfinding(path);
    }
});

resetBtn.addEventListener("click", () => {
    if (isPathfinding) return;

    resetGrid();
    clearGrid();
});

createGrid();
