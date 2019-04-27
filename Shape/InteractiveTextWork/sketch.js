let textImg, font, gradient, pointRed, pointGreen, pointBlue, pointAlpha, previousLength;
let SizeSlider, DensitySlider, FontSizeSlider, PointColorBox, PointColorDrop, ShapeDrop, TextBox, NoiseBox;
let linesXAxis = [];
let linesYAxis = [];
let pointColBox = true;
let useNoise = false;
let useRotate = false;
let noiseAmount = 0;
let shapeToDraw = "X Lines";
let pointRadius = 14;
let pointColorType = "Bright";
let pixelD = 15;
let fontSize = 600;
let textTyped = "W";
let pointsLength = 0;
let animationLerp = 0;
let runAnimationBool = false;
let animationDiff = 0;
let noiseAmountX = 0;
let noiseAmountY = 0;
let rotation = 0;

function preload() {
  gradient = loadImage("data/gradient.png");
  font = loadFont("data/Roboto-Medium.ttf");
}

function setup() {
  let canvas = createCanvas(730, 600);
  canvas.parent("canvasHolder");
  background(45, 52, 54);
  angleMode(DEGREES);

  gradient.loadPixels();
  setupText();
  createPoints();

  SizeSlider = createSlider(1, 14, pointRadius);
  SizeSlider.parent("ShapeSizeSlider");
  SizeSlider.class("form-control");
  SizeSlider.input(update);

  DensitySlider = createSlider(5, 15, 18 - pixelD);
  DensitySlider.parent("DensitySlider");
  DensitySlider.class("form-control");
  DensitySlider.input(update);

  FontSizeSlider = createSlider(200, 700, fontSize);
  FontSizeSlider.parent("FontSizeSlider");
  FontSizeSlider.class("form-control");
  FontSizeSlider.input(update);

  ShapeDrop = createSelect();
  ShapeDrop.parent("ShapeDrop");
  ShapeDrop.class("form-control");
  ShapeDrop.option("X Lines");
  ShapeDrop.option("Y Lines");
  ShapeDrop.changed(update);

  PointColorBox = createCheckbox('', false);
  PointColorBox.parent("PointColorBox");
  PointColorBox.class("form-check-input");
  PointColorBox.changed(update);

  PointColorDrop = createSelect();
  PointColorDrop.parent("PointColorDrop");
  PointColorDrop.class("form-control");
  PointColorDrop.option("Bright");
  PointColorDrop.option("Dark");
  PointColorDrop.option("Red");
  PointColorDrop.option("Green");
  PointColorDrop.option("Blue");
  PointColorDrop.option("Random");
  PointColorDrop.changed(update);

  TextBox = createInput(textTyped);
  TextBox.parent("TextBox");
  TextBox.class("form-control");
  TextBox.input(update);

  RunAnimation = createButton("Start");
  RunAnimation.parent("RunAnimation");
  RunAnimation.class("form-control btn-primary");
  RunAnimation.mousePressed(runA);

  NoiseBox = createCheckbox('', false);
  NoiseBox.parent("NoiseBox");
  NoiseBox.class("form-check-input");
  NoiseBox.changed(update);

  RotateBox = createCheckbox('', false);
  RotateBox.parent("RotateBox");
  RotateBox.class("form-check-input");
  RotateBox.changed(update);
}

function draw() {
  background(45, 52, 54, 75);

  if(useNoise) {
    noiseAmount += 1/10;
    noiseAmountX = map(mouseX, 0, width, 0, 5);
    noiseAmountY = map(mouseY, 0, height, 0, 5);
  }

  if(useRotate) {
    rotation = map(mouseX + mouseY, 0, width + height, 0, 12);
  }

  if(runAnimationBool) {
    animationLerp += 1/300;
    if(animationLerp >= 1) {
      runAnimationBool = false;
      noiseAmountX = 0;
      noiseAmountY = 0;
      animationDiff = 0;
    }
  }

  if(shapeToDraw === "X Lines") {
    for(var i = 0; i < linesXAxis.length; i++) {
      let x1 = linesXAxis[i].x1Pos;
      let y1 = linesXAxis[i].y1Pos;
      let x2 = linesXAxis[i].x2Pos;
      let y2 = linesXAxis[i].y2Pos;

      let xDiff = (x1 - x2) / 2;
      let yDiff = (y1 - y2) / 2;

      let lineX = x1 - xDiff;
      let lineY = y1 - yDiff;

      let xNoise = 0;
      let yNoise = 0;
      if(useNoise) {
        xNoise = noise(lineX + noiseAmount) * (linesXAxis[i].xFrac * noiseAmountX);
        yNoise = noise(lineY + noiseAmount) * (linesXAxis[i].yFrac * noiseAmountY);
      }

      stroke(linesXAxis[i].point1Color);
      strokeWeight(pointRadius);
      noFill();

      push();

      translate(lineX + xNoise, lineY + yNoise);

      if(useRotate) {
        rotate(linesXAxis[i].rot * rotation);
      }

      if(runAnimationBool) {
        animationDiff = map(animationLerp, 0, 1, 0, height);
        if(animationDiff > y1 && animationDiff < y2) {
          line(xDiff, yDiff, -xDiff, animationDiff - y2 - yDiff);
        } else if(animationDiff > y2) {

          line(xDiff, yDiff, -xDiff, -yDiff);

        }
      } else {
        line(xDiff, yDiff, -xDiff, -yDiff);
      }

      pop();
    }
  }

  if(shapeToDraw === "Y Lines") {
    for(var i = 0; i < linesYAxis.length; i++) {
      let x1 = linesYAxis[i].x1Pos;
      let y1 = linesYAxis[i].y1Pos;
      let x2 = linesYAxis[i].x2Pos;
      let y2 = linesYAxis[i].y2Pos;

      let xDiff = (x1 - x2) / 2;
      let yDiff = (y1 - y2) / 2;

      let lineX = x1 - xDiff;
      let lineY = y1 - yDiff;

      let xNoise = 0;
      let yNoise = 0;
      if(useNoise) {
        xNoise = noise(lineX + noiseAmount) * (linesYAxis[i].xFrac * noiseAmountX);
        yNoise = noise(lineY + noiseAmount) * (linesYAxis[i].yFrac * noiseAmountY);
      }

      stroke(linesYAxis[i].point1Color);
      strokeWeight(pointRadius);
      noFill();

      push();
      translate(lineX + xNoise, lineY + yNoise);
      if(useRotate) {
        rotate(linesYAxis[i].rot * rotation);
      }

      if(runAnimationBool) {
        animationDiff = map(animationLerp, 0, 1, 0, width);
        if(animationDiff > x1 && animationDiff < x2) {
          line(xDiff, yDiff, animationDiff - x2 - xDiff , -yDiff);
        } else if(animationDiff > x2) {
          line(xDiff, yDiff, -xDiff, -yDiff);
        }
      } else {
        line(xDiff, yDiff, -xDiff, -yDiff);
      }
      pop();
    }
  }
}

function setupText() {
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.fill(0);
  textImg.textSize(fontSize);
  textImg.textAlign(CENTER, CENTER);
  textImg.textFont("Roboto");
  textImg.text(textTyped, width/2 , (3*height)/5);
  textImg.loadPixels();
}

function createPoints() {
  linesXAxis = [];
  linesYAxis = [];

  if(shapeToDraw === "X Lines") {
    for(let x = 0; x < textImg.width; x += pixelD) {

      let lineBegin = false;
      let lineColPicked = false;
      let lineX1, lineY1, lineX2, lineY2;

      for(let y = 0; y < textImg.height; y += pixelD) {

        let index = (y * textImg.width + x) * 4;
        let r = textImg.pixels[index];

        if(!pointColBox) {

          pointRed = gradient.pixels[index];
          pointGreen = gradient.pixels[index+1];
          pointBlue = gradient.pixels[index+2];
          pointAlpha = 255;
        } else {
          createAColor();
        }

        pointColor = color(pointRed, pointGreen, pointBlue, pointAlpha);

        if(r <= 128) {

          if(!lineBegin) {
            lineX1 = x;
            lineY1 = y;
            if(!lineColPicked) {
              lineColPicked = true;
              lineCol1 = pointColor;
            }
            lineBegin = true;
          }

        } else {

            if(lineBegin) {
              lineBegin = false;
              lineX2 = x;
              lineY2 = y - pixelD;
              lineCol2 = pointColor;

              let rand = random();
              let xDisplacement = 5;
              let yDisplacement = 5;
              let rotateAmount = floor(random(-5,5));

              if(rand < 0.25) {
                xDisplacement *= 1;
                yDisplacement *= 1;
              } else if (rand < 0.5) {
                xDisplacement *= -1;
                yDisplacement *= 1;
              } else if (rand < 0.5) {
                xDisplacement *= 1;
                yDisplacement *= -1;
              } else {
                xDisplacement *= -1;
                yDisplacement *= -1;
              }

              linesXAxis.push({
                x1Pos: lineX1,
                y1Pos: lineY1,
                point1Color: lineCol1,
                x2Pos: lineX2,
                y2Pos: lineY2,
                xFrac: xDisplacement,
                yFrac: yDisplacement,
                rot: rotateAmount
              });

          }
        }
      }
    }
  }

  if(shapeToDraw === "Y Lines") {

    for(let y = 0; y < textImg. height; y += pixelD) {

      let lineBegin = false;
      let lineColPicked = false;
      let lineX1, lineY1, lineX2, lineY2;

      for(let x = 0; x < textImg.width; x += pixelD) {

        let index = (y * textImg.width + x) * 4;
        let r = textImg.pixels[index];

        if(!pointColBox) {
          pointRed = gradient.pixels[index];
          pointGreen = gradient.pixels[index+1];
          pointBlue = gradient.pixels[index+2];
          pointAlpha = 255;
        } else {
          createAColor();
        }

        pointColor = color(pointRed, pointGreen, pointBlue, pointAlpha);

        if(r <= 128) {

          if(!lineBegin) {
            lineX1 = x;
            lineY1 = y;
            if(!lineColPicked) {
              lineCol1 = pointColor;
              lineColPicked = true;
            }
            lineBegin = true;
          }

        } else {

            if(lineBegin) {
              lineBegin = false;
              lineX2 = x - pixelD;
              lineY2 = y;

              let rand = random();
              let xDisplacement = 5;
              let yDisplacement = 5;
              let rotateAmount = floor(random(-5,5));

              if(rand < 0.25) {
                xDisplacement *= 1;
                yDisplacement *= 1;
              } else if (rand < 0.5) {
                xDisplacement *= -1;
                yDisplacement *= 1;
              } else if (rand < 0.5) {
                xDisplacement *= 1;
                yDisplacement *= -1;
              } else {
                xDisplacement *= -1;
                yDisplacement *= -1;
              }

              linesYAxis.push({
                x1Pos: lineX1,
                y1Pos: lineY1,
                point1Color: lineCol1,
                x2Pos: lineX2,
                y2Pos: lineY2,
                xFrac: xDisplacement,
                yFrac: yDisplacement,
                rot: rotateAmount
              });
          }

        }
      }
    }
  }
}

function createAColor() {
  if(pointColBox) {
    if (pointColorType === "Dark") {
      pointRed = floor(random(10, 105));
      pointGreen = floor(random(10, 105));
      pointBlue = floor(random(10, 105));
      pointAlpha = floor(random(150, 255));
    } else if (pointColorType === "Bright") {
      pointRed = floor(random(105, 210));
      pointGreen = floor(random(105, 210));
      pointBlue = floor(random(105, 210));
      pointAlpha = floor(random(200, 255));
    } else if (pointColorType === "Random") {
      pointRed = floor(random(0, 255));
      pointGreen = floor(random(0, 255));
      pointBlue = floor(random(0, 255));
      pointAlpha = floor(random(0, 255));
    } else if (pointColorType === "Red") {
      pointRed = floor(random(150, 255));
      pointGreen = floor(random(20, 50));
      pointBlue = floor(random(20, 50));
      pointAlpha = floor(random(150, 255));
    } else if (pointColorType === "Green") {
      pointRed = floor(random(20, 50));
      pointGreen = floor(random(150, 200));
      pointBlue = floor(random(20, 50));
      pointAlpha = floor(random(150, 255));
    } else if (pointColorType === "Blue") {
      pointRed = floor(random(20, 50));
      pointGreen = floor(random(20, 50));
      pointBlue = floor(random(150, 255));
      pointAlpha = floor(random(150, 255));
    }
  }
}

function runA() {
  animationLerp = 0;
  runAnimationBool = true;
}

function update() {
  pointRadius = SizeSlider.value();
  pixelD =  20 - DensitySlider.value();
  fontSize = FontSizeSlider.value();
  textTyped = TextBox.value();
  pointColorType = PointColorDrop.value();
  shapeToDraw = ShapeDrop.value();

  if (PointColorBox.checked()) {
    pointColBox = true;
  } else {
    pointColBox = false;
  }

  if (NoiseBox.checked()) {
    useNoise = true;
  } else {
    useNoise = false;
  }

  if (RotateBox.checked()) {
    useRotate = true;
  } else {
    useRotate = false;
  }

  setupText();
  createPoints();
}

function keyPressed() {
  if(key === "a" || key === "A") {
      runA();
  }
}
