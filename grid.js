class Grid {
  constructor() {
    this.board = []
    for (let i = 0; i < r; i++) {
      this.board.push([])
      for (let j = 0; j < c; j++) this.board[i].push({
        value: 0,
        x: j,
        y: i
      })
    }
    this.used = []
  }

  addToGrid(cells) {
    for (const cell of cells) {
      const cellX = cell.x / g
      const cellY = cell.y / g
      for (const row of this.board)
        for (const space of row)
          if (space.x === cellX && space.y === cellY) //{
            space.value = 1
    }
    this.clearLine()
  }

  clearLine() {
    let removed = 0
    let lineY = []
    for (const line of this.board) {
      if (line.every(cell => cell.value === 1)) {
        lineY.push(line[0].y)
        line.forEach(cell => {
          cell.value = 0
        })
      }
    }
    if (lineY.length >= 1) {
      removed++
      for (let item = 0; item < lineY.length; item++) {
        for (let line = lineY[item]; line > 0; line--) {
          for (let cell = 0; cell < this.board[line].length; cell++) {
            if (this.board[line][cell].value === 1) {
              this.board[line + 1][cell].value = 1
              this.board[line][cell].value = 0
            }
          }
        }
      }
    }
    this.used = []
    for (let line of this.board)
      for (let spot of line)
        if (spot.value === 1) this.used.push(spot)
    score += removed
  }

  show() {
    fill(255)
    for (const row of this.board)
      for (const space of row) {
        push()
        fill(255, 50, 50, 20)
        stroke(20)
        strokeWeight(0.5)
        if(space.y <= 1)rect(space.x * g, space.y * g, g)
        pop()
        push()
        noFill()
        stroke(20)
        strokeWeight(0.5)
        if(space.y > 1)rect(space.x * g, space.y * g, g)
        pop()
        if (space.value === 1) rect(space.x * g, space.y * g, g)
      }
  }
}