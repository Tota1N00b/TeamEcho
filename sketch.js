function preload() {
  paradox = loadImage(
    "https://freight.cargo.site/t/original/i/W1536930023558211048011072795331/Paradox.png"
  );
  title = loadImage(
    "https://freight.cargo.site/t/original/i/Y1536930023539764303937363243715/Title.png"
  );
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
  image(paradox, 0, 0, resizedWidthP, resizedHeightP);
  pop();
  image(title, 0, 0, resizedWidthT, resizedHeightT);
}

function resizeImage() {
  let rP = paradox.width / paradox.height;
  let rT = title.width / title.height;
  let rW = width / height;
  let rPT = paradox.width / title.width;

  if (rW <= rP) {
    resizedWidthP = width;
    resizedHeightP = width / rP;
  } else {
    resizedHeightP = height;
    resizedWidthP = height * rP;
  }

  resizedWidthT = resizedWidthP / rPT;
  resizedHeightT = resizedWidthT / rT;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
