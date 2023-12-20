function preload() {
  ring = loadImage("assets/ParadoxRing3.png");
  pattern = loadImage("assets/ParadoxPattern.png");
  title = loadImage("assets/Title.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

let ring, pattern, title;
let resizedWidthR, resizedHeightR, resizedWidthP, resizedHeightP, resizedWidthT, resizedHeightT;

function draw() {
  clear();
  background(0);
  imageMode(CENTER);
  resizeImage();
  translate(width / 2, height / 2);
  blendMode(BLEND);
  push();
  rotate(-millis() / 10000);
  image(pattern, 0, 0, resizedWidthP, resizedHeightP);
  pop();
  push();
  rotate(millis() / 5000);
  image(ring, 0, 0, resizedWidthR, resizedHeightR);
  pop();
  blendMode(DIFFERENCE);
  image(title, 0, 0, resizedWidthT, resizedHeightT);
}

function resizeImage() {
  let rR = ring.width / ring.height;
  let rP = pattern.width / pattern.height;
  let rT = title.width / title.height;
  let rW = width / height;
  let rRT = ring.width / title.width;
  let rRP = ring.width / pattern.width;

  if (rW <= rR) {
    resizedWidthR = width;
    resizedHeightR = width / rR;
  } else {
    resizedHeightR = height;
    resizedWidthR = height * rR;
  }
  resizedWidthP = resizedWidthR / rRP;
  resizedHeightP = resizedWidthP / rP;
  resizedWidthT = resizedWidthR / rRT;
  resizedHeightT = resizedWidthT / rT;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
