export default class Matrix {
    constructor(columns, rows) {
        this.grid = [];
        this.boundaryLeft = 0;
        this.boundaryRight = columns;
        this.boundaryBottom = 0;
        this.boundaryTop = rows;
        for (var i = 0; i < columns; i++) {
            this.grid[i] = new Array(rows);
        }
    }
  }