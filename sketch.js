function preload() {
    ring = loadImage("assets/ParadoxRing3.png");
    // pattern = loadImage("assets/ParadoxPattern.png");
    patternPic = loadImage("assets/ParadoxPattern.png");
    pattern = createVideo(
        "assets/patterns/ParadoxPatternOpen.mp4",
        getDuration
    );
    patternStart = createVideo(
        "assets/patterns/ParadoxPatternClose.mp4",
        getDuration
    );
    patternTrans = createVideo("assets/patterns/CloseToOpen.mp4", getDuration);
    patternTransReverse = createVideo(
        "assets/patterns/OpenToClose.mp4",
        getDuration
    );
    title = loadImage("assets/Title.png");
    pattern.size(windowWidth, windowHeight);
    pattern.noLoop();
    patternStart.size(windowWidth, windowHeight);
    patternStart.noLoop();
    patternTrans.size(windowWidth, windowHeight);
    patternTrans.noLoop();
    patternTransReverse.size(windowWidth, windowHeight);
    patternTransReverse.noLoop();
}

function getDuration() {
    dPattern = pattern.duration();
    dPatternStart = patternStart.duration();
    dPatternTrans = patternTrans.duration();
    dPatternTransReverse = patternTransReverse.duration();
    if (
        dPattern != NaN &&
        dPatternStart != NaN &&
        dPatternTrans != NaN &&
        dPatternTransReverse != NaN
    ) {
        patternLoaded = true;
    } else {
        patternLoaded = false;
    }
}

let cnv;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight, WEBGL);
    cnv.parent("sketch-holder");

    sceneNum = 1;
    maxSceneNum = 2;
    patternNum = 0;
    scaleNum = 1;
    translateY = 0;
    opacityVal = 0;

    points = new Points(width, height);
    getStars();
    boxGraphic = createGraphics(width, height);
    boxGraphic2 = createGraphics(width, height);
    tiltAngle = PI / 20;

    pattern.hide();
    pattern.elt.setAttribute("playsinline", ""); // For newer iOS browsers
    pattern.elt.setAttribute("webkit-playsinline", ""); // For older iOS browsers
    pattern.elt.setAttribute("muted", "");
    pattern.volume(0);
    pattern.play();

    patternStart.hide();
    patternStart.elt.setAttribute("playsinline", ""); // For newer iOS browsers
    patternStart.elt.setAttribute("webkit-playsinline", ""); // For older iOS browsers
    patternStart.elt.setAttribute("muted", "");
    patternStart.volume(0);
    patternStart.play();

    patternTrans.hide();
    patternTrans.elt.setAttribute("playsinline", ""); // For newer iOS browsers
    patternTrans.elt.setAttribute("webkit-playsinline", ""); // For older iOS browsers
    patternTrans.elt.setAttribute("muted", "");
    patternTrans.volume(0);
    patternTrans.play();

    patternTransReverse.hide();
    patternTransReverse.elt.setAttribute("playsinline", ""); // For newer iOS browsers
    patternTransReverse.elt.setAttribute("webkit-playsinline", ""); // For older iOS browsers
    patternTransReverse.elt.setAttribute("muted", "");
    patternTransReverse.volume(0);
    patternTransReverse.play();

    patternTrans.stop();
    pattern.stop();
    patternTransReverse.stop();
}

let sceneNum, maxSceneNum;
let overlayContent;
let overlayHeading, overlayText;
let canvasScaleNum, canvasTranslateY, scaleNum, translateY, opacityVal;
let ring, title, pattern, patternStart, patternTrans, patternTransReverse;
let dPattern,
    dPatternStart,
    dPatternTrans,
    dPatternTransReverse,
    patternLoaded = false;
let patternNextReady = false;
let patternNum;
let vidTime, vidDuration;
let resizedWidthR,
    resizedHeightR,
    resizedWidthP,
    resizedHeightP,
    resizedWidthT,
    resizedHeightT;
let boxGraphic;
let tiltAngle;
let stars = [];

let showDetails = false;

function togglePrototypeDetail() {
    showDetails = !showDetails;
    if (showDetails) {
        document.getElementById("prototype-info-tooltip").textContent =
            "HIDE PROTOTYPE DETAILS";
    } else {
        document.getElementById("prototype-info-tooltip").textContent =
            "SHOW MORE ABOUT THIS PROTOTYPE";
    }
}

function closePrototypeDetail() {
    if (showDetails) togglePrototypeDetail();
}

function draw() {
    push();
    background(0);
    resizeImage();
    overlayContent = select("div.overlay-content");
    if (showDetails) {
        switch (sceneNum) {
            case 0:
                overlayHeading = select("div.overlay-content h1");
                overlayHeading.html("Prototype 3");
                overlayText = select("div.overlay-content h3");
                overlayText.html(
                    "Entering the ECHO chamber...");
                break;
            case 1:
                overlayHeading = select("div.overlay-content h1");
                overlayHeading.html("Prototype 2");
                overlayText = select("div.overlay-content h3");
                overlayText.html(
                    "A symphony of vibrant, interactive projection mapping on a mesh structure. This avant-garde Installation prototype delves into the dichotomies of digital discourse, juxtaposing the empowerment of voices with the pitfalls of misinformation. It’s a compelling exploration of digital ethics, challenging the narrative of collective intelligence with the imperative of critical thought through mesmerizing performative projection mapping."
                );
                break;
            case 2:
                overlayHeading = select("div.overlay-content h1");
                overlayHeading.html("Prototype 1");
                overlayText = select("div.overlay-content h3");
                overlayText.html(
                    "The Power Paradox is an audio-reactive projection-mapped installation inspired by the intoxicated and imbalanced powers in current society that result in numerous conflicts around us. This project aims to reilluminate the constant conflicts by questioning the essential roles and power of institutions and governments, what power is, and the influence of social connections on power."
                );
                break;
        }

        overlayContent.style("opacity", opacityVal.toString());
        scale(scaleNum);
        translate(0, translateY, 0);

        canvasScaleNum = 2;
        calcCanvasTranslateY();

        if (scaleNum < canvasScaleNum) {
            scaleNum += 0.04;
        } else {
            scaleNum = canvasScaleNum;
        }
        if (translateY < canvasTranslateY) {
            translateY += canvasTranslateY / 25;
        } else {
            translateY = canvasTranslateY;
        }
        if (opacityVal < 1) {
            opacityVal += 0.04;
        } else {
            opacityVal = 1;
        }
    } else {
        overlayContent.style("opacity", opacityVal.toString());
        scale(scaleNum);
        translate(0, translateY, 0);

        canvasScaleNum = 1;
        calcCanvasTranslateY();

        if (scaleNum > canvasScaleNum) {
            scaleNum -= 0.04;
            if (scaleNum < canvasScaleNum) scaleNum = canvasScaleNum;
        }
        if (translateY > 0) {
            translateY -= canvasTranslateY / 25;
        } else {
            translateY = 0;
        }
        if (opacityVal > 0) {
            opacityVal -= 0.04;
        } else {
            opacityVal = 0;
        }
    }

    if (sceneNum == 1) {
        push();
        translate(-width / 2, -height / 2, 0);
        clear();
        background(0);
        imageMode(CENTER);
        translate(width / 2, height / 2);
        blendMode(BLEND);
        push();
        rotate(-millis() / 10000);
        if (patternLoaded)
            switch (patternNum) {
                case 0:
                    image(patternStart, 0, 0, resizedWidthP, resizedHeightP);
                    vidTime = patternStart.time();
                    vidDuration = dPatternStart;
                    if (vidEnd() && !patternNextReady) patternStart.play();
                    break;

                case 1:
                    image(patternTrans, 0, 0, resizedWidthP, resizedHeightP);
                    vidTime = patternTrans.time();
                    vidDuration = dPatternTrans;
                    if (vidEnd()) patternNextReady = true;
                    break;

                case 2:
                    image(pattern, 0, 0, resizedWidthP, resizedHeightP);
                    vidTime = pattern.time();
                    vidDuration = dPattern;
                    if (vidEnd() && !patternNextReady) pattern.play();
                    break;

                case 3:
                    image(
                        patternTransReverse,
                        0,
                        0,
                        resizedWidthP,
                        resizedHeightP
                    );
                    vidTime = patternTransReverse.time();
                    vidDuration = dPatternTransReverse;
                    if (vidEnd()) patternNextReady = true;
                    break;
            }
        else image(patternPic, 0, 0, resizedWidthP, resizedHeightP); //show static image if pattern video is not loaded
        if (patternNextReady && vidEnd()) {
            patternNextReady = false;
            patternNum++;
            if (patternNum > 3) patternNum = 0;
            switch (patternNum) {
                case 0:
                    patternStart.play();
                    patternTrans.stop();
                    pattern.stop();
                    patternTransReverse.stop();
                    break;
                case 1:
                    patternStart.stop();
                    patternTrans.play();
                    pattern.stop();
                    patternTransReverse.stop();
                    break;
                case 2:
                    patternStart.stop();
                    patternTrans.stop();
                    pattern.play();
                    patternTransReverse.stop();
                    break;
                case 3:
                    patternStart.stop();
                    patternTrans.stop();
                    pattern.stop();
                    patternTransReverse.play();
                    break;
            }
        }
        pop();
        push();
        rotate(millis() / 5000);
        image(ring, 0, 0, resizedWidthR, resizedHeightR);
        pop();
        // blendMode(MULTIPLY);
        image(title, 0, 0, resizedWidthT, resizedHeightT);
        pop();
    } else if (sceneNum == 2) {
        push();
        let ry = map(
            constrain(mouseX, 0, width),
            0,
            width,
            tiltAngle,
            -tiltAngle
        );
        let rx = map(
            constrain(mouseY, 0, height),
            0,
            height,
            -tiltAngle,
            tiltAngle
        );
        rotateX(rx);
        rotateY(ry);
        scale(scaleVal());
        translate(-width / 2, -height / 2, 0);
        image(boxGraphic, 0, 0, 0);
        boxGraphic.background(0, 25);
        const acc = map(mouseX, 0, width, 0.005, 0.2);
        stars.forEach((star) => {
            star.draw();
            star.update(acc);
            if (!star.isActive()) {
                star.reset();
            }
        });
        pop();
    } else if (sceneNum == 0) {
        push();
        // let ry = map(
        //     constrain(mouseX, 0, width),
        //     0,
        //     width,
        //     tiltAngle,
        //     -tiltAngle
        // );
        // let rx = map(
        //     constrain(mouseY, 0, height),
        //     0,
        //     height,
        //     -tiltAngle,
        //     tiltAngle
        // );
        // rotateX(rx);
        // rotateY(ry);
        // scale(scaleVal());
        translate(-width / 2, -height / 2, 0);

        boxGraphic2.clear();
        boxGraphic2.background(0);

        // boxGraphic2.push();
        // boxGraphic2.image(boxGraphic, 0, 0, 0);
        // boxGraphic2.pop();

        boxGraphic2.push();
        boxGraphic2.scale(0.75);
        boxGraphic2.translate(width / 3, height / 3);
        boxGraphic2.image(boxGraphic, 0, 0, 0);
        boxGraphic2.pop();

        boxGraphic2.push();
        boxGraphic2.scale(0.25);
        boxGraphic2.translate(width - resizedHeightT, height * 2 + resizedHeightT);
        boxGraphic2.image(boxGraphic, 0, 0, 0);
        boxGraphic2.pop();

        boxGraphic2.push();
        boxGraphic2.scale(0.5);
        boxGraphic2.translate(width / 2 - resizedHeightT + resizedHeightT / 4, height / 2 - resizedHeightT / 2);
        boxGraphic2.image(boxGraphic, 0, 0, 0);
        boxGraphic2.pop();

        // quarter box
        // boxGraphic2.push();
        // boxGraphic2.scale(0.5);
        // boxGraphic2.translate(width / 2 - resizedHeightT / 2, height / 2 - resizedHeightT / 2);
        // boxGraphic2.image(boxGraphic, 0, 0, 0);
        // boxGraphic2.pop();

        boxGraphic.background(0, 25);
        boxGraphic2.blendMode(LIGHTEST);
        image(boxGraphic2, 0, 0, 0);

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

    pop();
}

function calcCanvasTranslateY() {
    if (sceneNum == 1)
        canvasTranslateY =
            (resizedWidthT + resizedWidthR) / 4 -
            height / 4 +
            overlayContent.position().y / 2 +
            overlayContent.size().height / 2;
    else if (sceneNum == 2 || sceneNum == 0)
        canvasTranslateY =
            resizedWidthT / 2 -
            height / 4 +
            overlayContent.position().y / 2 +
            overlayContent.size().height / 2;
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

function mousePressed() {
    if (patternLoaded && sceneNum == 1 && mouseIsInsideTheRing()) {
        patternNextReady = true;
        // console.log("pattern Next Ready in " + (vidDuration - vidTime) + " seconds");
    }
}

function mouseIsInsideTheRing() {
    if (
        mouseX > width / 2 - resizedWidthR / 2 &&
        mouseX < width / 2 + resizedWidthR / 2 &&
        mouseY > height / 2 - resizedHeightR / 2 &&
        mouseY < height / 2 + resizedHeightR / 2
    )
        return true;
    else return false;
}

function vidEnd() {
    if (vidDuration - vidTime == 0) return true;
    else return false;
}

class Points {
    constructor(width, height) {
        this.updateXY(width, height);
    }

    updateXY(width, height) {
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
        boxGraphic.push();
        if (sceneNum == 0 && mouseIsPressed) {
            boxGraphic.strokeWeight(20);
            boxGraphic.stroke(random(255),random(255),random(255), 3);
        } else {
            boxGraphic.strokeWeight(2);
            boxGraphic.stroke(255, 3);
        }
        boxGraphic.strokeCap(ROUND);
        boxGraphic.line(
            this.initPos.x,
            this.initPos.y,
            this.endPos.x,
            this.endPos.y
        );
        boxGraphic.pop();

        boxGraphic.push();
        const alpha = map(this.vel.mag(), 0, 3, 0, 255);
        if (sceneNum == 0 && mouseIsPressed) {
            boxGraphic.strokeWeight(30);
            boxGraphic.colorMode(HSB);
            let col = map(noise(frameCount/300 + this.initPos.x + this.initPos.y + this.endPos.x + this.endPos.y), 0, 1, 0, 360);
            // let col = map(noise(frameCount + this.initPos.x + this.initPos.y + this.endPos.x + this.endPos.y), 0, 1, 0, 360);
            // let col = map(noise(frameCount/300 + this.initPos.x + this.initPos.y + this.endPos.x + this.endPos.y), 0, 1, 120, 360);
            // let col = map(noise(frameCount + this.initPos.x + this.initPos.y + this.endPos.x + this.endPos.y), 0, 1, 120, 360);
            boxGraphic.stroke(col, 100, 100, map(alpha, 0, 255, 0, 1));
        } else {
            boxGraphic.strokeWeight(3);
            boxGraphic.stroke(255, alpha);
        }
        boxGraphic.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        boxGraphic.pop();
    }
}

function scaleVal() {
    let maxScale = 1.1;
    if (width > height) {
        return calcScaleVal(mouseX, width);
    } else {
        return calcScaleVal(mouseY, height);
    }

    function calcScaleVal(x, X) {
        return map(abs(x - X / 2), 0, X / 2, 1, maxScale);
    }
}

function windowResized() {
    cnv = resizeCanvas(windowWidth, windowHeight);
    calcCanvasTranslateY();
    points.updateXY(width, height);
    getStars();
    boxGraphic.clear();
}

document.addEventListener("DOMContentLoaded", function () {
    const leftButton = document.getElementById("leftButton");
    const rightButton = document.getElementById("rightButton");

    leftButton.addEventListener("click", function () {
        sceneNum--;
        if (sceneNum < 0) {
            sceneNum = maxSceneNum;
        }

        if (sceneNum == 2 || sceneNum == 0) {
            points.updateXY(width, height);
            getStars();
        }
    });

    rightButton.addEventListener("click", function () {
        sceneNum++;
        if (sceneNum > maxSceneNum) {
            sceneNum = 0;
        }

        if (sceneNum == 2 || sceneNum == 0) {
            points.updateXY(width, height);
            getStars();
        }
    });
});
