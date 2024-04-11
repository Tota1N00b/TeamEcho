function preload() {
  ring = loadImage("assets/ParadoxRing3.png");
  pattern = loadImage("assets/ParadoxPattern.png");
  title = loadImage("assets/Title.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  sceneNum = 1;
  maxSceneNum = 2;

  points = new Points(width, height);
  getStars();
}

let sceneNum, maxSceneNum;
let ring, pattern, title;
let resizedWidthR, resizedHeightR, resizedWidthP, resizedHeightP, resizedWidthT, resizedHeightT;
let stars = [];

function draw() {
  resizeImage();
  if (sceneNum == 1) {
    push();
    clear();
    background(0);
    imageMode(CENTER);
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
    pop();
  }
  else if (sceneNum == 2) {
    push();
    background(0, 50);
    const acc = map(mouseX, 0, width, 0.005, 0.2);
    stars.forEach((star) => {
      star.draw();
      star.update(acc);
      if (!star.isActive()) {
        star.reset();
      }
    });
    pop();
  }
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

class Points {
  constructor(width, height) {
    this.updateXY(width, height);
  }

  updateXY(width, height) {
    // let x1 = width / 3;
    // let x3 = width / 3;
    // let x2 = (2 * width) / 3;
    // let x4 = (2 * width) / 3;
    // let y1 = height / 3;
    // let y3 = (2 * height) / 3;
    // let y2 = height / 3;
    // let y4 = (2 * height) / 3;
    let x1 = (width - resizedWidthT) / 2;
    let x3 = (width - resizedWidthT) / 2;
    let x2 = (width + resizedWidthT) / 2;
    let x4 = (width + resizedWidthT) / 2;
    let y1 = (height - resizedWidthT) / 2;
    let y2 = (height - resizedWidthT) / 2;
    let y3 = (height + resizedWidthT) / 2;
    let y4 = (height + resizedWidthT) / 2;

    let w = x2 - x1;
    let h = y3 - y1;

    this.points = {
      P1: createVector(x1, y1),
      P2: createVector(x2, y2),
      P3: createVector(x3, y3),
      P4: createVector(x4, y4),
      A: createVector(x1 + w / 4, y3 - h / 6),
      B: createVector(x4 - w / 4, y4),
      C: createVector(x1 + w / 2, y1 + h / 3),
      D: createVector(x1 + (3 * w) / 8, y1 + h / 2),
      E: createVector(x4 - w / 8, y4 - h / 3),
      F: createVector(x2 - w / 4 - w / 12, y1 + h / 2 - h / 12),
      G: createVector(x2 - w / 4 - w / 6, y3 - h / 3),
    };
  }
}

function getStars() {
  stars = [];
  stars.push(new Star(points.points.P1, points.points.P2));
  stars.push(new Star(points.points.P2, points.points.P4));
  stars.push(new Star(points.points.P4, points.points.P3));
  stars.push(new Star(points.points.P3, points.points.P1));
  stars.push(new Star(points.points.P1, points.points.A));
  stars.push(new Star(points.points.P3, points.points.A));
  stars.push(new Star(points.points.A, points.points.D));
  stars.push(new Star(points.points.D, points.points.C));
  stars.push(new Star(points.points.C, points.points.P1));
  stars.push(new Star(points.points.P2, points.points.C));
  stars.push(new Star(points.points.P2, points.points.F));
  stars.push(new Star(points.points.F, points.points.D));
  stars.push(new Star(points.points.F, points.points.E));
  stars.push(new Star(points.points.P4, points.points.E));
  stars.push(new Star(points.points.P4, points.points.G));
  stars.push(new Star(points.points.G, points.points.C));
  stars.push(new Star(points.points.G, points.points.A));
  stars.push(new Star(points.points.A, points.points.B));
  stars.push(new Star(points.points.E, points.points.B));
}

class Star {
  constructor(startPoint, endPoint) {
    this.initPos = createVector(startPoint.x, startPoint.y);
    this.endPos = createVector(endPoint.x, endPoint.y);
    this.pos = createVector(startPoint.x, startPoint.y);
    this.prevPos = createVector(startPoint.x, startPoint.y);

    this.vel = createVector(0, 0);

    this.ang = atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
  }

  reset() {
    this.pos.set(this.initPos);
    this.prevPos.set(this.initPos);
    this.vel.set(0, 0);
  }

  isActive() {
    // Calculate the vector from initPos to endPos
    let segment = p5.Vector.sub(this.endPos, this.initPos);
    // Calculate the vector from initPos to current position
    let movement = p5.Vector.sub(this.pos, this.initPos);

    // Calculate the projection scalar of the movement vector onto the segment vector
    let projection = movement.dot(segment) / segment.magSq();

    // Check if the projection scalar is within the bounds of 0 and 1 inclusive
    // Projection > 1 means pos is beyond endPos
    return projection >= 0 && projection <= 1;
  }


  update(acc) {
    this.vel.add(cos(this.ang) * acc, sin(this.ang) * acc);

    this.prevPos.set(this.pos);

    this.pos.add(this.vel);
  }

  draw() {
    push();
    strokeWeight(2);
    strokeCap(ROUND);
    stroke(255, 3);
    line(this.initPos.x, this.initPos.y, this.endPos.x, this.endPos.y);
    pop();

    push();
    const alpha = map(this.vel.mag(), 0, 3, 0, 255);
    strokeWeight(3);
    stroke(255, alpha);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  points.updateXY(width, height);
  getStars();
}

document.addEventListener("DOMContentLoaded", function () {
  const leftButton = document.getElementById("leftButton");
  const rightButton = document.getElementById("rightButton");

  leftButton.addEventListener("click", function () {
    sceneNum--;
    if (sceneNum < 1) {
      sceneNum = maxSceneNum;
    }

    if (sceneNum == 2) {
      points.updateXY(width, height);
      getStars();
    }
  });

  rightButton.addEventListener("click", function () {
    sceneNum++;
    if (sceneNum > maxSceneNum) {
      sceneNum = 1;
    }

    if (sceneNum == 2) {
      points.updateXY(width, height);
      getStars();
    }
  });
});
