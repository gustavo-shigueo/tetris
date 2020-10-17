class Player {
  constructor(piece, x = null, y = null) {
    this.x = x || c / 2 * g - g
    this.y = y || 0
    this.piece = piece
    this.matrix = this.piece.matrix

    this.inputs = {
      ' ': 'slam',
      'ArrowUp': 'up',
      'ArrowLeft': -1,
      'ArrowDown': 0,
      'ArrowRight': 1,
      c: 'hold',
      C: 'hold'
    }
  }

  update() {
    this.y += g
  }

  show() {
    let obj = {
      command: (row, block) => rect(this.x + block * g, this.y + row * g, g)
    }
    this.iterateBlock(obj)
  }

  movement(key) {
    if (!this.inputs[key]) return
    if (key === 'ArrowUp') return this.rotate()
    if (this.inputs[key] === 'hold') this.hold()
    else return this.move(this.inputs[key])
  }

  move(dir) {
    if (dir === 0) {
      let i = 0
      while (i < 2) {
        i++
        if (!this.collisionCheck()) this.update()
      }
      return
    }

    if (dir === 'slam') {
      while (!this.collisionCheck()) this.update()
      f = 0.5 * fr
      return
    }

    if (this.sideCheck(dir)) return
    return this.x += dir === 1 ? g : -g
  }

  rotate() {
    let rotMatrix = []
    const len = this.matrix.length
    for (let i = 0; i < len; i++) {
      rotMatrix.push(Array(len))
      let k = len - 1
      for (let j = 0; j < len; j++) {
        rotMatrix[i][j] = this.matrix[k][i]
        k--
      }
    }
    if (!this.checkRotation(rotMatrix)) {
      this.y -= g
      this.matrix = rotMatrix
    }
  }

  hold() {
    if (holding) return
    let buffer = this.piece.piece
    console.log(buffer)
    player = new Player(held || nextPiece)
    if (!held) next = chooseNext()
    held = buffer
    showNext()
    holding = true
  }

  sideCheck(side) {
    let obj = {
      command: () => {},
      calledBy: 'sideCheck'
    }
    if (side === -1) obj.command = block => this.x + block * g <= 0
    if (side === 1) obj.command = block => this.x + block * g + g >= c * g
    if (this.iterateBlock(obj)) return true

    obj.calledBy = 'checkRotation or pieceSideCheck'
    if (side === -1) obj.command = (row, block) => grid.used.some(
      s => s.x * g === this.x + block * g - g && s.y * g === this.y + row * g
    )
    if (side === 1) obj.command = (row, block) => grid.used.some(
      s => s.x * g === this.x + block * g + g && s.y * g === this.y + row * g
    )
    return this.iterateBlock(obj)
  }

  iterateBlock(callback, matrix = this.matrix) {
    let arr = []
    for (let row = 0; row < matrix.length; row++)
      for (let block = 0; block < matrix[row].length; block++)
        if (matrix[row][block]) {
          if (callback.calledBy === 'collisionCheckFloor' && callback.command(row)) return true
          else if (callback.calledBy === 'collisionCheckPiece' && callback.command(row, block)) return true
          else if (callback.calledBy === 'sideCheck' && callback.command(block)) return true
          else if (callback.calledBy === 'checkRotation or pieceSideCheck' && callback.command(row, block)) return true
          else if (callback.calledBy === 'collide') callback.command(row, block, arr)
          else callback.command(row, block)
        }
    if (callback.calledBy === 'collide') return arr
  }

  collisionCheck() {
    let obj = {
      command: row => this.y + row * g + g >= r * g,
      calledBy: 'collisionCheckFloor'
    }
    if (this.iterateBlock(obj)) return true

    obj = {
      command: (row, block) => grid.used.some(
        s => s.x * g === this.x + block * g && this.y + row * g + g === s.y * g
      ),
      calledBy: 'collisionCheckPiece'
    }
    return this.iterateBlock(obj)
  }

  checkRotation(rotMatrix) {
    let obj = {
      command: (row, block) => grid.used.some(
        s => (s.x * g === this.x + block * g && this.y + row * g - g === s.y * g) ||
        (this.x + block * g <= 0 || this.x + block * g >= c * g) ||
        (this.y + row * g >= r * g)
      ),
      calledBy: 'checkRotation or pieceSideCheck'
    }
    return this.iterateBlock(obj, rotMatrix)
  }

  collide() {
    let obj = {
      command: (row, block, arr = []) => {
        arr.push({
          x: this.x + block * g,
          y: this.y + row * g
        })
      },
      calledBy: 'collide'
    }
    player = new Player(nextPiece)
    holding = false
    return this.iterateBlock(obj)
  }

  death() {
    return this.collisionCheck() && this.y <= 0
  }
}