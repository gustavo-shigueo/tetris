class Tetramino {
  constructor(piece = null) {
    this.piece = piece || floor(random(0, 7))
    if (this.piece >= 7) this.piece = 6
  }

createPiece() {
  switch (this.piece) {
    case 0:
      return {
        name: 'line',
        matrix: [
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0]
        ]
      }
    case 1:
      return {
        name: 'T',
        matrix: [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0]
        ]
      }
      case 2:
        return {
          name: 'L',
          matrix: [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0]
          ]
        }
      case 3:
        return {
          name: 'Inverted L',
          matrix: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
          ]
        }
      case 4:
        return {
          name: 'S',
          matrix: [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
          ]
        }
      case 5:
        return {
          name: 'Inverted S',
          matrix: [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
          ]
        }
      case 6:
        return {
          name: 'square',
          matrix: [
            [1, 1],
            [1, 1]
          ]
        }
    }
  }
}