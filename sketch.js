r = 22
c = 10
g = 30
f = 0
fr = 10
next = null
held = null
holding = false

function setup() {
  createCanvas(c * g + 15 * g, r * g);
  frameRate(fr)
  score = 0
  grid = new Grid()
  tetramino = new Tetramino()
  player = new Player(tetramino.createPiece())
  next = chooseNext()
}

function draw() {
  background(0);
  grid.show()
  player.show()
  if (keyIsDown(DOWN_ARROW)) player.move(0)
  else if (!player.collisionCheck()) {
    f = 0
    player.update()
  } else if (player.collisionCheck() && f >= 0.5 * fr) {
    next = chooseNext()
    grid.addToGrid(player.collide())
    f = 0
  } else f++
  showNext()
  if (player.death()) noLoop()
  
}

function keyPressed() {
  player.movement(key)
}