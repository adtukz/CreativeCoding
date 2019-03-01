//setting up variables that are used throughout
let textImg, font, gradient, pointRed, pointGreen, pointBlue, pointAlpha, points, previousLength;
let CRSlider, ACSlider, FSSlider, TextBox, ABox;
let linesXAxis = [];
let linesYAxis = [];
let backgroundPoints = [];
let pointColBox = false;
let pointRadius = 1;
let pointColor = "Bright";
let pixelD = 5;
let fontSize = 600;
let textTyped = "A";
let counter = 0;
let pointsLength = 0;

//preloading the gradient image and the font that will be used
function preload() {
  gradient = loadImage("data/gradient.png");
  font = loadFont("data/Roboto-Medium.ttf");
}

//setting up the canvas, text, creating points and the user controls on the html page
function setup() {
  let canvas = createCanvas(730, 600);
  background(45, 52, 54);
  canvas.parent("canvasHolder");
  gradient.loadPixels();
  setupText();
  createPoints();
  angleMode(DEGREES);

  SizeSlider = createSlider(2, 10, pointRadius);
  SizeSlider.parent("CRSlider");
  SizeSlider.input(update);

  DensitySlider = createSlider(5, 15, 18 - pixelD);
  DensitySlider.parent("ACSlider");
  DensitySlider.input(update);

  FontSizeSlider = createSlider(200, 600, fontSize);
  FontSizeSlider.parent("FSSlider");
  FontSizeSlider.input(update);

  PointColorBox = createCheckbox('', false);
  PointColorBox.parent("JCBox");
  PointColorBox.changed(update);

  PointColorDrop = createSelect();
  PointColorDrop.parent("JCDrop");
  PointColorDrop.option("Bright");
  PointColorDrop.option("Dark");
  PointColorDrop.option("Red");
  PointColorDrop.option("Green");
  PointColorDrop.option("Blue");
  PointColorDrop.option("Random");
  PointColorDrop.changed(update);

  TextBox = createInput(textTyped);
  TextBox.parent("TextBox");
  TextBox.input(update);
}

function draw() {
  //draw background that gives the points the trail, by setting the alpha value
  background(45, 52, 54, 75);

  let lineRotation = map(mouseX, 0, width, -5, 5);
  let drawCircles = true;
  let drawXLines = true;
  let drawYLines = false;

  if(drawXLines) {
    //loop to draw the points
    for(var i = 0; i < linesXAxis.length; i++) {
      //set the x and y values
      let x1 = linesXAxis[i].x1Pos;
      let y1 = linesXAxis[i].y1Pos;
      let x2 = linesXAxis[i].x2Pos;
      let y2 = linesXAxis[i].y2Pos;

      let xDiff = (x1 - x2) / 2;
      let yDiff = (y1 - y2) / 2;

      let lineX = x1 - xDiff;
      let lineY = y1 - yDiff;

      //set the colours
      stroke(linesXAxis[i].point1Color);
      strokeWeight(pointRadius);
      noFill();
      push();
      translate(lineX, lineY);
      line(xDiff, yDiff, -xDiff, -yDiff);
      ellipse(xDiff, yDiff, pointRadius/3, pointRadius/3);
      ellipse(-xDiff, -yDiff, pointRadius/3, pointRadius/3);
      pop();
    }
  }

  if(drawYLines) {
    //loop to draw the points
    for(var i = 0; i < linesYAxis.length; i++) {
      //set the x and y values
      let x1 = linesYAxis[i].x1Pos;
      let y1 = linesYAxis[i].y1Pos;
      let x2 = linesYAxis[i].x2Pos;
      let y2 = linesYAxis[i].y2Pos;

      let xDiff = (x1 - x2) / 2;
      let yDiff = (y1 - y2) / 2;

      let lineX = x1 - xDiff;
      let lineY = y1 - yDiff;

      //set the colours
      stroke(linesYAxis[i].point1Color);
      strokeWeight(pointRadius);
      noFill();
      push();
      translate(lineX, lineY);
      line(xDiff, yDiff, -xDiff, -yDiff);
      ellipse(xDiff, yDiff, pointRadius, pointRadius);
      ellipse(-xDiff, -yDiff, pointRadius, pointRadius);
      pop();
    }
  }

  if(drawCircles) {
    for(var i = 0; i < points.length; i ++) {
      let x = points[i].xPos;
      let y = points[i].yPos;

      fill(points[i].pointColor);
      noStroke();
      ellipse(x, y, pointRadius + 5, pointRadius + 5)
    }


  }

}

//setup the text so that we can load the pixels, and find the positions where we want to draw points
function setupText() {
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.fill(0);
  textImg.textSize(fontSize);
  textImg.textAlign(CENTER, CENTER);
  textImg.textFont("Roboto");
  textImg.text(textTyped, width/2 , height/2+50);
  textImg.loadPixels();
}

//create points, function to generate the arrays which hold the points
function createPoints() {
  //reset each array, to empty them
  points = [];
  backgroundPoints = [];
  linesXAxis = [];
  linesYAxis = [];

  //for each pixel on the x and y axes
  for(let x = 0; x < textImg.width; x += pixelD) {

    let lineBegin = false;
    let lineX1, lineY1, lineX2, lineY2;

    for(let y = 0; y < textImg.height; y += pixelD) {

      //check if a point has been picked on the line then if there is a gap and i want more pixels its a new line
      // thats how lines should be stored

      //finding the r value for each pixel of the text drawn
      let index = (y * textImg.width + x) * 4;
      let r = textImg.pixels[index];

      if(pointColBox) {
        //setting up the colour themes by setting different random RGBA values for each circle being drawn
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
      } else {
        //set the RGB = to the imported gradient
        pointRed = gradient.pixels[index];
        pointGreen = gradient.pixels[index+1];
        pointBlue = gradient.pixels[index+2];
      }

      pointColor = color(pointRed, pointGreen, pointBlue, pointAlpha);

      //where text appears we want to add points to the arrays. This will allow us to create arrays full of points which when drawn to the canvas simulate text
      if(r <= 128) {

        points.push({xPos: x, yPos: y, pointColor: pointColor});

        if(!lineBegin) {
          lineX1 = x;
          lineY1 = y;
          lineCol1 = pointColor;
          lineBegin = true;
        }

      } else {

          if(lineBegin) {
            lineBegin = false;
            lineX2 = x;
            lineY2 = y - pixelD;
            lineCol2 = pointColor;

            linesXAxis.push({
              x1Pos: lineX1,
              y1Pos: lineY1,
              point1Color: lineCol1,
              x2Pos: lineX2,
              y2Pos: lineY2,
              point2Color: lineCol2
            });

        }
      }
    }
  }

  //for each pixel on the x and y axes
  for(let y = 0; y < textImg.width; y += pixelD) {

    let lineBegin = false;
    let lineX1, lineY1, lineX2, lineY2;

    for(let x = 0; x < textImg.height; x += pixelD) {

      //check if a point has been picked on the line then if there is a gap and i want more pixels its a new line
      // thats how lines should be stored

      //finding the r value for each pixel of the text drawn
      let index = (y * textImg.width + x) * 4;
      let r = textImg.pixels[index];

      if(pointColBox) {
        //setting up the colour themes by setting different random RGBA values for each circle being drawn
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
      } else {
        //set the RGB = to the imported gradient
        pointRed = gradient.pixels[index];
        pointGreen = gradient.pixels[index+1];
        pointBlue = gradient.pixels[index+2];
      }

      pointColor = color(pointRed, pointGreen, pointBlue, pointAlpha);

      //where text appears we want to add points to the arrays. This will allow us to create arrays full of points which when drawn to the canvas simulate text
      if(r <= 128) {

        if(!lineBegin) {
          lineX1 = x;
          lineY1 = y;
          lineCol1 = pointColor;
          lineBegin = true;
        }

      } else {

          if(lineBegin) {
            lineBegin = false;
            lineX2 = x - pixelD;
            lineY2 = y;
            lineCol2 = pointColor;

            linesYAxis.push({
              x1Pos: lineX1,
              y1Pos: lineY1,
              point1Color: lineCol1,
              x2Pos: lineX2,
              y2Pos: lineY2,
              point2Color: lineCol2
            });

        }
      }
    }
  }
}

//if the user updates any of the control panel we want to update the points
function update() {
  //if the sliders change, we change the value of the variable to equal the slider
  pointRadius = SizeSlider.value();
  pixelD =  20 - DensitySlider.value();
  fontSize = FontSizeSlider.value();
  //the text is equal to the text in the box, this will update on each entry to the box
  textTyped = TextBox.value();
  //this checks the drop down menu, if the user selects a new palette
  pointColorType = PointColorDrop.value();

  if (PointColorBox.checked()) {
    pointColBox = true;
  } else {
    pointColBox = false;
  }

  counter = 0;

  //we need to resetup the text and create the points to conform with the changed variables
  setupText();
  createPoints();
}
