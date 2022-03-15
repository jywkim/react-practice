export default class Matrix {
    constructor() {
        this.grid = [];
    }

    createMatrix(columns, rows) {
        for (var i = 0; i < columns; i++) {
            this.grid[i] = new Array(rows);
        }
        return this.grid;
    }
  }