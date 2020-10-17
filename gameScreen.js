function chooseNext() {
  nextIndex = floor(random(0, 7))
  if (this.piece >= 7) this.piece = 6

  return new Tetramino(nextIndex).createPiece()
}

function showNext() {
  push()
  stroke(255)
  noFill()
  rect((c + 5) * g, 2 * g, 5 * g)
  rect((c + 5) * g, 11 * g, 5 * g)
  pop()
  textSize(g)
  text('Next:', (c + 6.3) * g, 1.8 * g)
  text('Hold:', (c + 6.3) * g, 10.8 * g)
  text(`Lines removed: ${score}`, (c + 3.5) * g, 18.8 * g)
  
  let posN = findPos(next)
  xSN = posN[0]
  ySN = posN[1]
  nextPiece = new Player(next, (c + 5 + xSN) * g, (2 + ySN) * g)
  nextPiece.show()
  
  let posH = [null, null]
  if (held === null) return
  posH = findPos(held)
  xPH = posH[0]
  yPH = posH[1]
  heldPiece = new Player(held, (c + 5 + xPH) * g, (11 + yPH) * g)
  heldPiece.show()
}

function findPos(obj) {
  let posArr = []
  switch (obj.name) {
    case 'line':
      posArr = [2, 0.5]
      break
    case 'T':
      posArr = [1, 0.5]
      break
    case 'L':
    case 'Inverted L':
    case 'S':
    case 'Inverted S':
      posArr = [1.5, 1]
      break
    case 'square':
      posArr = [1.5, 1.5]
      break
  }
  return posArr
}