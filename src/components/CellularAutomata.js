mounted () {
  // create new p5 instance
  new p5(this.sketch);
},
methods: {
    sketch(p) {
    // p5 sketch code here
    let canvas;
    let cellSize = 10; // width and height of each cell
    let numRows;
    let numCols;
    let cells; // array to store the state of each cell
    let nextCells; // array to store the next state of each cell
    let isRunning = true; // flag to indicate if the simulation is running or not

    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('canvas-container'); // set the parent element of the canvas

      numRows = p.ceil(p.height / cellSize);
      numCols = p.ceil(p.width / cellSize);
      cells = new Array(numCols);
      nextCells = new Array(numCols);
      for (let i = 0; i < numCols; i++) {
        cells[i] = new Array(numRows);
        nextCells[i] = new Array(numRows);
        for (let j = 0; j < numRows; j++) {
          cells[i][j] = p.floor(p.min(1.5, p.random(4))); // randomly initialize each cell to either 0 or 1
          nextCells[i][j] = 0; // initialize nextCells array to all 0s
        }
      }
    };

    p.draw = () => {
      p.background(255); // set background color to white
        // calculate the next state of each cell
      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
          let state = cells[i][j];
          let neighbors = countNeighbors(cells, i, j);
          if (state === 0 && neighbors === 3) {
            nextCells[i][j] = 1; // dead cell with 3 live neighbors becomes alive
          } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
            nextCells[i][j] = 0; // live cell with fewer than 2 or more than 3 live neighbors dies
          } else {
            nextCells[i][j] = state; // otherwise, cell stays the same
          }
        }
      }
      let xMouseGrid = p.floor(p.mouseX / cellSize);
      let yMouseGrid = p.floor(p.mouseY / cellSize);
      if(xMouseGrid >= 0 && xMouseGrid < numCols && yMouseGrid >= 0 && yMouseGrid < numRows){
        nextCells[xMouseGrid][yMouseGrid] = 1;
      }

      
      // draw the cells
      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
          let x = i * cellSize;
          let y = j * cellSize;
          if (cells[i][j] == 1) {
            p.rect(x, y, cellSize, cellSize);
          }
        }
      }

      cells = nextCells

      // draw the cells
      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
          let x = i * cellSize;
          let y = j * cellSize;
          if (cells[i][j] == 1) {
            p.fill(0);
            p.rect(x, y, cellSize, cellSize);
          }
        }
      }
    };

    function countNeighbors(grid, x, y) {
      let sum = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let col = (x + i + numCols) % numCols;
          let row = (y + j + numRows) % numRows;
          sum += grid[col][row];
        }
      }
      sum -= grid[x][y];
      return sum;
    }
  }
  
}