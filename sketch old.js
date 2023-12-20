function preload() {
  ring = loadImage("assets/Paradox.png");
  title = loadImage("assets/Title.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

let paradox, title;
let resizedWidthP, resizedHeightP, resizedWidthT, resizedHeightT;

function draw() {
  clear();
  background(0);
  imageMode(CENTER);
  resizeImage();
  translate(width / 2, height / 2);
  blendMode(DIFFERENCE);
  push();
  rotate(millis() / 5000);
  image(ring, 0, 0, resizedWidthR, resizedHeightR);
  pop();
  image(title, 0, 0, resizedWidthT, resizedHeightT);
}

function resizeImage() {
  let rP = ring.width / ring.height;
  let rT = title.width / title.height;
  let rW = width / height;
  let rPT = ring.width / title.width;

  if (rW <= rP) {
    resizedWidthR = width;
    resizedHeightR = width / rP;
  } else {
    resizedHeightR = height;
    resizedWidthR = height * rP;
  }

  resizedWidthT = resizedWidthR / rPT;
  resizedHeightT = resizedWidthT / rT;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
